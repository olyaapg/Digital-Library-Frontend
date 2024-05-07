import { defineStore } from 'pinia';
import { fetchWrapper } from '../helpers/fetch-wrapper';
import { router } from '../helpers/router';
import { ref } from 'vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;
const MAXTIMEOUT = 2147483647;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        refreshTokenTimeout: null
    }),
    actions: {
        /*async getRole() {
            const id = this.user.id;
            const userInfo = await fetchWrapper.get(`${baseUrl}/user/getUser?userId=${id}`);
            this.user.role = userInfo.role;
            console.log(userInfo)
        },*/
        async login(login, password) {
            this.user = await fetchWrapper.post(`${baseUrl}/api/auth/login`, { login, password }, { credentials: 'include' });
            this.startRefreshTokenTimer();
        },
        async signup(login, name, password) {
            this.user = await fetchWrapper.post(`${baseUrl}/user/reg`, { login, name, password }, { credentials: 'include' });
            this.startRefreshTokenTimer();
        },
        logout() {
            //fetchWrapper.post(`${baseUrl}/revoke-token`, {}, { credentials: 'include' });
            this.stopRefreshTokenTimer();
            this.user = null;
            router.push('/login');
        },
        async refreshToken() {
            let refreshToken = this.user.refreshToken;
            let newToken = await fetchWrapper.post(`${baseUrl}/api/auth/token`, { refreshToken }, { credentials: 'include' });
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