import { useAuthStore } from '../stores/auth.store';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return async (url, body, { credentials } = {}) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body instanceof FormData) {
            requestOptions.body = body;
        } else if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        if (credentials) {
            requestOptions.credentials = credentials;
        }
        //console.log(requestOptions)
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.accessToken;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.accessToken}` };
    } else {
        return {};
    }
}


async function handleResponse(response) {
    if (!response.ok) {
        const { user, logout } = useAuthStore();
        if ([401, 403].includes(response.status) && user) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            logout();
        }

        let error;
        if (response.headers.get('content-type') && response.headers.get('content-type').includes('application/json')) {
            // Если ошибка возвращается в формате JSON, парсим ее
            const text = await response.text();
            const data = text && JSON.parse(text);
            error = (data && data.message) || response.statusText;
        } else if (response.statusText !== '') {
            // Если ошибка не возвращается в формате JSON, используем статус текст
            error = response.statusText;
        } else {
            error = "Sorry, there's been a mistake.";
        }
        return Promise.reject(error);
    }
    // Если ответ в виде blob, возвращаем его
    if (response.headers.get('content-type') && response.headers.get('content-type').includes('application/epub+zip')) {
        return response.blob();
    }
    // Если ответ в виде JSON, парсим его
    const text = await response.text();
    if (text) {
        return JSON.parse(text);
    } else {
        return '';
    }
}

