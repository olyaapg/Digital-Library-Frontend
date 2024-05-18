import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import Searches from '../components/Searches.vue';
import FoundBooks from '../components/FoundBooks.vue';
import DetailedInformation from '../components/DetailedInformation.vue';
import LoadBook from '../components/LoadBook.vue';
import LoginView from '../components/LoginView.vue';
import VerifyEmail from '../components/VerifyEmail.vue';


export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { name: "Searches", path: '/', component: Searches },
        { name: "LoginView", path: '/login', component: LoginView },
        { name: "VerifyEmail", path: '/api/auth/verify', component: VerifyEmail, props: route => ({ token: route.query.token }) },
        { name: "FoundBooks", path: '/foundbooks', component: FoundBooks },
        { name: "LoadBook", path: '/loadbook', component: LoadBook, meta: { requiresAdmin: true } },
        {
            name: "DetailedInformation", path: '/foundbooks/:number', component: DetailedInformation,
            props: true,
            beforeEnter: (to, _from, next) => {
                const number = Number(to.params.number);
                if (!isNaN(number)) {
                    next();
                } else {
                    next('/foundbooks');
                }
            }
        },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});


router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAdmin) {
        // Проверяем роль пользователя
        if (authStore.user.role !== 'ADMIN') {
            // Если у пользователя нет прав администратора, оставляем его на текущей странице
            next(false);
        } else {
            // Если у пользователя есть права администратора, продолжаем нормально
            next();
        }
    } else {
        // Если маршрут не требует административных прав, продолжаем нормально
        next();
    }
    /* redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        return {
            path: '/login',
            query: { returnUrl: to.href }
        };
    }*/
});
