import { defineStore } from 'pinia';
import { fetchWrapper } from '../helpers/fetch-wrapper';
import { router } from '../helpers/router';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        refreshTokenTimeout: null
    }),
    actions: {
        async login(login, password) {
            this.user = await fetchWrapper.post(`${baseUrl}/api/auth/login`, { login, password }, { credentials: 'include' });
            //this.startRefreshTokenTimer();
        },
        async signup(login, name, password) {
            this.user = await fetchWrapper.post(`${baseUrl}/user/reg`, { login, name, password });
            //this.startRefreshTokenTimer();
        },
        logout() {
            //fetchWrapper.post(`${baseUrl}/revoke-token`, {}, { credentials: 'include' });
            //this.stopRefreshTokenTimer();
            this.user = null;
            router.push('/login');
        },
        async refreshToken() {
            let refreshToken = this.user.refreshToken;
            let newToken = await fetchWrapper.post(`${baseUrl}/api/auth/token`, { refreshToken }, { credentials: 'include' });
            this.user.accessToken = newToken.accessToken;
            this.startRefreshTokenTimer();
        },
        startRefreshTokenTimer() {
            // parse json object from base64 encoded jwt token
            const jwtBase64 = this.user.accessToken.split('.')[1];
            const jwtToken = JSON.parse(atob(jwtBase64));

            // set a timeout to refresh the token a minute before it expires
            const expires = new Date(jwtToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);
            this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
        },
        stopRefreshTokenTimer() {
            clearTimeout(this.refreshTokenTimeout);
        }
    }
});