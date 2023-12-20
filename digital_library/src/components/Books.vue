<template>
  <div class="mainBody">
    <p>According to your request, there were {{ dataList.length }} books:</p>
  </div>

  <div class="listRes">
    <div v-for="(book, index) in dataList" :key="index" class="book">
      <img :src="book.coverImageUrl" alt="Book Cover" class="book-cover" />
      <span @click="getDetails(book.id)">
        <span class="author">{{ book.authors }}</span>
        <span class="title">{{ book.title }}</span>
      </span>
    </div>
  </div>
</template>
  


<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const router = useRouter()
const dataList = inject('dataList')
const serverURL = inject('serverURL')
const theBook = inject("theBook")

function getDetails(id) {
  console.log(id)
  /*axios
    .get(serverURL + `/book/${id}`)
    .then(response => goToResults(response))
    .catch(error => {
      console.error('Ошибка запроса:', error);
    })*/
  axios
    .get(serverURL)
    .then(response => goToResults(response, id))
    .catch(error => {
      console.error('Ошибка запроса:', error);
    })
}

function goToResults(response, id) {
  console.log(response)
  //theBook.value = response
  router.push(`/books/${id}`)
}
</script>
  


<style scoped>
.listRes {
  margin-left: 50px;
  margin-right: 50px;
}

.book {
  display: inline-block;
  width: 20%;
  text-align: center;
  box-sizing: border-box;
  margin-bottom: 30px;
}

.book-cover {
  max-width: 100%;
  height: auto;
  max-width: 200px;
}

.author {
  display: block;
  margin-top: 5px;
  font-weight: bold;
}

.title {
  display: block;
  margin-top: 5px;
}
</style>