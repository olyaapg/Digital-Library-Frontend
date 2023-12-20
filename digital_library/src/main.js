import { createApp, ref } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'



// Захардкодила внизу

const dataList = ref([
  {
    "id": 1,
    "title": "Harry Potter and the Half-Blood Prince",
    "authors": "J.K. Rowling, I.I. Ivanov, P.P. Petrov  ",
    "coverImageUrl": "https://icdn.lenta.ru/images/2022/09/29/14/20220929143518567/owl_pic_620_cc53e92ef001eb0f929eadf24f37f031.jpg"
  },
  {
    "id": 2,
    "title": "elit. Corrupti atque",
    "authors": "I.I. Ivanov",
    "coverImageUrl": "https://icdn.lenta.ru/images/2022/09/29/14/20220929143518567/owl_pic_620_cc53e92ef001eb0f929eadf24f37f031.jpg"
  },
  {
    "id": 3,
    "title": "How to be a genius",
    "authors": "Lorem ipsum dolor",
    "coverImageUrl": "https://icdn.lenta.ru/images/2022/09/29/14/20220929143518567/owl_pic_620_cc53e92ef001eb0f929eadf24f37f031.jpg"
  },
  {
    "id": 4,
    "title": "Adipisicing",
    "authors": "sit amet consectetur",
    "coverImageUrl": "https://icdn.lenta.ru/images/2022/09/29/14/20220929143518567/owl_pic_620_cc53e92ef001eb0f929eadf24f37f031.jpg"
  },
  {
    "id": 5,
    "title": "Good morning",
    "authors": "earum distinctio nemo",
    "coverImageUrl": "https://icdn.lenta.ru/images/2022/09/29/14/20220929143518567/owl_pic_620_cc53e92ef001eb0f929eadf24f37f031.jpg"
  },
  {
    "id": 1,
    "title": "Harry Potter and the Half-Blood Prince",
    "authors": "J.K. Rowling",
    "coverImageUrl": "https://catherineasquithgallery.com/uploads/posts/2021-02/1613449461_39-p-fon-dlya-prezentatsii-pro-vulkani-47.jpg"
  },
  {
    "id": 2,
    "title": "elit. Corrupti atque",
    "authors": "I.I. Ivanov",
    "coverImageUrl": "https://catherineasquithgallery.com/uploads/posts/2021-02/1613449461_39-p-fon-dlya-prezentatsii-pro-vulkani-47.jpg"
  },
  {
    "id": 3,
    "title": "How to be a genius",
    "authors": "Lorem ipsum dolor",
    "coverImageUrl": "https://avatars.mds.yandex.net/get-vertis-journal/4080458/0_zahod.jpg_1691591973343/orig"
  },
  {
    "id": 4,
    "title": "Adipisicing",
    "authors": "sit amet consectetur",
    "coverImageUrl": "https://icdn.lenta.ru/images/2022/09/29/14/20220929143518567/owl_pic_620_cc53e92ef001eb0f929eadf24f37f031.jpg"
  },
  {
    "id": 5,
    "title": "Good morning",
    "authors": "earum distinctio nemo",
    "coverImageUrl": "https://icdn.lenta.ru/images/2022/09/29/14/20220929143518567/owl_pic_620_cc53e92ef001eb0f929eadf24f37f031.jpg"
  },
  {
    "id": 1,
    "title": "Harry Potter and the Half-Blood Prince",
    "authors": "J.K. Rowling",
    "coverImageUrl": "https://catherineasquithgallery.com/uploads/posts/2021-02/1613449461_39-p-fon-dlya-prezentatsii-pro-vulkani-47.jpg"
  },
  {
    "id": 2,
    "title": "elit. Corrupti atque",
    "authors": "I.I. Ivanov",
    "coverImageUrl": "https://catherineasquithgallery.com/uploads/posts/2021-02/1613449461_39-p-fon-dlya-prezentatsii-pro-vulkani-47.jpg"
  },
  {
    "id": 3,
    "title": "How to be a genius",
    "authors": "Lorem ipsum dolor",
    "coverImageUrl": "https://avatars.mds.yandex.net/get-vertis-journal/4080458/0_zahod.jpg_1691591973343/orig"
  },
  {
    "id": 4,
    "title": "Adipisicing",
    "authors": "sit amet consectetur",
    "coverImageUrl": "https://icdn.lenta.ru/images/2022/09/29/14/20220929143518567/owl_pic_620_cc53e92ef001eb0f929eadf24f37f031.jpg"
  },
  {
    "id": 5,
    "title": "Good morning",
    "authors": "earum distinctio nemo",
    "coverImageUrl": "https://icdn.lenta.ru/images/2022/09/29/14/20220929143518567/owl_pic_620_cc53e92ef001eb0f929eadf24f37f031.jpg"
  }
])

const serverURL = "https://jsonplaceholder.typicode.com/posts"

const theBook = ref({
  "title": "Harry Potter and the Chamber of Secrets",
  "authors": "J.K. Rowling",
  "language": "en",
  "genres": "null",
  "description": "aa",
  "publisher": "Pottermore Publishing",
  "coverImageUrl": "https://icdn.lenta.ru/images/2022/09/29/14/20220929143518567/owl_pic_620_cc53e92ef001eb0f929eadf24f37f031.jpg"
})

// конец хардкода

createApp(App)
  .provide('dataList', dataList)
  .provide("serverURL", serverURL)
  .provide("theBook", theBook)
  .use(router)
  .mount('#app')