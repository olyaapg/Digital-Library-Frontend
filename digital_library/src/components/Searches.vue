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
const serverURL = inject('serverURL')
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

function createPost() {
  /*axios
    .post(serverURL + '/book/search/advanced', inputData)
    .then(response => goToResults(response))
    .catch(error => {
      console.error('Ошибка запроса:', error);
    })*/
  axios
    .post(serverURL, inputData)
    .then(response => goToResults(response))
}

function goToResults(response) {
  console.log(response)
  console.log(inputData.must)
  router.push({ name: 'Books' })
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