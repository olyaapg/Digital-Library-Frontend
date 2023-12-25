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
      <div class="container">
        <div class="block">
          <h2>Advanced book search</h2>

          <div class="inputBlock">
            <label for="title">Title:</label>
            <input id="title" type="text" v-model="dataAdvanced.must.title.query" :disabled="typeSearch === 'semantic'">
          </div>

          <div class="inputBlock">
            <label for="author">Author:</label>
            <input id="author" type="text" v-model="dataAdvanced.must.authors.query"
              :disabled="typeSearch === 'semantic'">
          </div>

          <div class="inputBlock">
            <label for="quote">Quote:</label>
            <input id="quote" type="text" v-model="dataAdvanced.must['chapters.content'].query" class="longLine"
              :disabled="typeSearch === 'semantic'">
          </div>

          <div class="inputBlock">
            <label for="publisher">Publisher:</label>
            <input id="publisher" type="text" v-model="dataAdvanced.must.publisher.query"
              :disabled="typeSearch === 'semantic'">
          </div>
        </div>

        <div class="block">
          <h2>Semantic book search</h2>
          <div class="inputBlock">
            <label for="chaptersContent" style="display: block; margin-bottom: 15px;">What do you want to read
              about?</label>
            <input id="chaptersContent" type="text" class="longLine" v-model="dataSemantic.query"
              :disabled="typeSearch === 'advanced'">
          </div>
          <div class="buttonContainer">
            <button id="buttonFind" type="submit" :disabled="typeSearch === 'None'">FIND</button>
            <p id="labelAboveButton" v-if="typeSearch === 'None'">Fill in at least one field</p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>




<script setup>
import axios from 'axios'
import { reactive, inject, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dataList = inject('dataList')
const serverURL = inject('serverURL')
const typeSearch = computed(() => {
  if (dataAdvanced.must.title.query || dataAdvanced.must.authors.query || dataAdvanced.must['chapters.content'].query || dataAdvanced.must.publisher.query) {
    return 'advanced'
  } else if (dataSemantic.query) {
    return 'semantic'
  } else {
    return 'None'
  }
})
const dataAdvanced = reactive({
  must: {
    'chapters.content': {
      query: ''
    },
    title: {
      query: ''
    },
    authors: {
      query: ''
    },
    publisher: {
      query: ''
    }
  }
})
const dataSemantic = reactive({ query: '' })

function createPost() {
  if (typeSearch === 'advanced') {
    /*axios
    .post(serverURL + '/book/search/advanced', dataAdvanced)
    .then(response => goToResults(response))
    .catch(error => {
      console.error('Ошибка запроса:', error);
    })*/
  } else {
    /*axios
    .post(serverURL + '/book/search/semantic', dataSemantic)
    .then(response => goToResults(response))
    .catch(error => {
      console.error('Ошибка запроса:', error);
    })*/
  }
  axios
    .post(serverURL, dataAdvanced)
    .then(response => goToResults(response))
}

function goToResults(response) {
  console.log(response)
  console.log(dataAdvanced.must)
  router.push({ name: 'Books' })
}
</script>




<style scoped>
.block {
  line-height: 0.5;
  margin-top: 30px;
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

.buttonContainer {
  margin-top: 100px;
}

#labelAboveButton {
  color: red;
}

#buttonFind {
  padding: 10px 20px;
}
</style>