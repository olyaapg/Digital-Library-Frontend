import { createRouter, createWebHistory } from 'vue-router'
import { createApp, ref } from 'vue'
import './style.css'
import App from './App.vue'
import Searches from './components/Searches.vue'
import Books from './components/Books.vue'
import DetailedInformation from './components/DetailedInformation.vue'



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
        path: '/info',
        component: DetailedInformation
    }]
})

const dataList = ref([])

createApp(App).provide('dataList', dataList).use(router).mount('#app')