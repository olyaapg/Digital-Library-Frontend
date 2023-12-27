import { createRouter, createWebHistory } from 'vue-router'
import Searches from './components/Searches.vue'
import Books from './components/Books.vue'
import DetailedInformation from './components/DetailedInformation.vue'
import LoadBook from './components/LoadBook.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [{
        name: 'Searches',
        path: '/',
        component: Searches
    }, {
        name: 'Books',
        path: '/books',
        component: Books
    }, {
        name: 'DetailedInformation',
        path: '/books/:number',
        component: DetailedInformation,
        props: true,
        beforeEnter: (to, _from, next) => {
            const number = Number(to.params.number);
            if (!isNaN(number)) {
                next();
            } else {
                next('/books');
            }
        }
    }, {
        name: 'LoadBook',
        path: '/loadbook',
        component: LoadBook
    }]
})


export default router