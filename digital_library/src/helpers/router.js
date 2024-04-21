import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import Searches from '../components/Searches.vue';
import FoundBooks from '../components/FoundBooks.vue';
import DetailedInformation from '../components/DetailedInformation.vue';
import LoadBook from '../components/LoadBook.vue';
import LoginView from '../components/LoginView.vue';


export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { name: "Searches", path: '/', component: Searches },
        { name: "LoginView", path: '/login', component: LoginView },
        { name: "FoundBooks", path: '/foundbooks', component: FoundBooks },
        { name: "LoadBook", path: '/loadbook', component: LoadBook },
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

/*
router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        return {
            path: '/login',
            query: { returnUrl: to.href }
        };
    }
});*/
