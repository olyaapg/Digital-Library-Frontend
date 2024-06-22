import { defineStore } from 'pinia';

export const useBooksStore = defineStore('books', {
    state: () => ({
        listFoundBooks: null
    }),
    actions: {
        setListFoundBooks(list) {
            this.listFoundBooks = list;
        }
    }
})