<template>
  <div class="mainBody">
    <p>According to your request, there were {{ dataList.length }} books:</p>
  </div>

  <div class="listRes">
    <div v-for="(book, index) in dataList" :key="index" class="book">
      <img :src="book.coverImageUrl" alt="Book Cover" class="book-cover" />
      <span class="author">{{ book.authors }}</span>
      <span class="title">{{ book.title }}</span>
    </div>
  </div>
</template>
  


<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ref, reactive, inject } from 'vue'

const router = useRouter()
const dataList = inject('dataList');
const bookId = reactive({
  must: {
    id: {
      query: ''
    }
  }
})
const book = ref()

function createPost(id) {
  bookId.must.id.query = id
  axios
    .post("https://jsonplaceholder.typicode.com/posts", bookId)
    .then(response => goToResults(response))
}

function goToResults(response) {
  console.log(response)
  book.value = {
    "title": "Harry Potter and the Chamber of Secrets",
    "authors": "J.K. Rowling",
    "language": "en",
    "genres": "null",
    "description": "null",
    "publisher": "Pottermore Publishing",
    "coverImageUrl": "http://localhost:8080/book/cover/2"
  }
  router.push({ name: 'DetailedInformation' })
  console.log(book)
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
  margin-top: 30px;
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