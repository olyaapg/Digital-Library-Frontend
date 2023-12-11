<template>
  <div class="mainBody">
    <p>According to your request, there were 100 books:</p>
    <ul v-for="item in dataList" :key="item.id">
      <li>
        <button @click="createPost(item.id)">{{ item.title }}</button>
        <img :src="item.coverImageUrl" :class="['scaled-image', 'block']" />
      </li>
    </ul>

  </div>
</template>
  
<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ref, reactive, inject, provide } from 'vue'

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
provide('book', book)


provide('bookId', bookId)



console.log("Started")
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
.scaled-image {
  height: 200px;
  width: auto;
  max-width: 100%;
}

.block {
  margin-bottom: 70px;
}
</style>