import { defineStore } from 'pinia';
import { fetchWrapper } from '../helpers/fetch-wrapper';
import { router } from '../helpers/router';
import { ref } from 'vue';

const MAXTIMEOUT = 2147483647;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        refreshTokenTimeout: null,
        baseUrl: `${import.meta.env.VITE_API_URL}`
    }),
    actions: {
        async login(login, password) {
            this.user = await fetchWrapper.post(`${this.baseUrl}/api/auth/login`, { login, password }, { credentials: 'include' });
            this.startRefreshTokenTimer();
        },
        async signup(login, name, password, isSendNotification) {
            await fetchWrapper.post(`${this.baseUrl}/user/reg`, { login, name, password, isSendNotification }, { credentials: 'include' });
        },
        async verify(token) {
            this.user = await fetchWrapper.get(`${this.baseUrl}/api/auth/verify?token=${token}`);
            this.startRefreshTokenTimer();
        },
        logout() {
            //fetchWrapper.post(`${this.baseUrl}/revoke-token`, {}, { credentials: 'include' });
            this.stopRefreshTokenTimer();
            this.user = null;
            router.push('/login');
        },
        async refreshToken() {
            let refreshToken = this.user.refreshToken;
            let newToken = await fetchWrapper.post(`${this.baseUrl}/api/auth/token`, { refreshToken }, { credentials: 'include' });
            this.user.accessToken = newToken.accessToken;
            this.startRefreshTokenTimer();
            console.log("refreshToken")
        },
        startRefreshTokenTimer() {
            // parse json object from base64 encoded jwt token
            const jwtBase64 = this.user.accessToken.split('.')[1];
            const jwtToken = JSON.parse(atob(jwtBase64));

            // set a timeout to refresh the token a minute before it expires
            const expires = new Date(jwtToken.exp * 1000);
            const timeout = ref(expires.getTime() - Date.now() - (60 * 1000));
            if (timeout.value > MAXTIMEOUT) {
                timeout.value = MAXTIMEOUT;
            }
            this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout.value);
        },
        stopRefreshTokenTimer() {
            clearTimeout(this.refreshTokenTimeout);
        }
    }
});