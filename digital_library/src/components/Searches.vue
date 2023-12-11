<template>
  <div class="mainBody">


    <div class="block">
      <p>On this page you can find the book you need.</p>
      <p>There are two kinds of searches:</p>
      <p>1. <span class="searches">Advanced book search</span> - for those who know exactly what they want;</p>
      <p>2. And <span class="searches">semantic book search</span> - for those who have not yet decided.</p>
      <p>Choose the one you like!</p>
    </div>


    <form @submit.prevent="createPost">
      <div class="block">
        <h2>Advanced book search</h2>

        <div class="inputBlock">
          <label for="title">Title:</label>
          <input id="title" type="text" v-model="inputData.must.title.query">
        </div>

        <div class="container">
          <div class="inputBlock">
            <label for="author">Author:</label>
            <input id="author" type="text" v-model="inputData.must.authors.query">
          </div>

          <div class="inputBlock">
            <label for="quote">Quote:</label>
            <input id="quote" type="text" v-model="inputData.must['chapters.content'].query" class="longLine">
          </div>
        </div>

        <div class="inputBlock">
          <label for="publisher">Publisher:</label>
          <input id="publisher" type="text">
        </div>
      </div>


      <div class="block">
        <h2>Semantic book search</h2>

        <div :class="['container', 'inputBlock']">
          <div>
            <label for="chaptersContent" style="display: block; margin-bottom: 15px;">What do you want to read
              about?</label>
            <input id="chaptersContent" type="text" class="longLine">
          </div>

          <button type="submit">FIND</button>
          <p>odio ea commodi eligendi cumque dolores. Ipsum ipsa fuga impedit delectus, repudiandae natus magnam excepturi beatae blanditiis.</p>
        </div>
      </div>
    </form>
  </div>
</template>




<script setup>
import axios from 'axios'
import { reactive, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dataList = inject('dataList')
const inputData = reactive({
  must: {
    'chapters.content': {
      query: ''
    },
    title: {
      query: ''
    },
    authors: {
      query: ''
    }
  }
})

console.log("Started")
function createPost() {
  axios
    .post("https://jsonplaceholder.typicode.com/posts", inputData)
    .then(response => goToResults(response))
}

function goToResults(response) {
  console.log(response)
  dataList.value = [
  {
    "id": 1,
    "title": "Harry Potter and the Half-Blood Prince",
    "authors": "J.K. Rowling",
    "coverImageUrl": "http://localhost:8080/book/cover/1"
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
    "coverImageUrl": "http://localhost:8080/book/cover/1"
  }
]
  router.push({ name: 'Books' })
  console.log(inputData.must)
}
</script>




<style scoped>
.block {
  margin-bottom: 70px;
  line-height: 0.5;
}

.inputBlock {
  margin-top: 40px;
}

.container {
  display: flex;
  gap: 300px;
}

.longLine {
  width: 400px;
}
</style>