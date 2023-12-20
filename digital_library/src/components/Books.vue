<template>
  <div class="innerBody">
    <div>
      <p>According to your request, there were {{ dataList.length }} books:</p>
    </div>

    <div class="listRes">
      <table class="bookTable">
        <tbody>
          <tr v-for="(book, index) in dataList" :key="index" @click="getDetails(book.id)">
            <td>{{ index + 1 }}</td>
            <td><img :src="book.coverImageUrl" alt="Book Cover" class="book-cover" /></td>
            <td>
              <h3>{{ book.title }}</h3>
              <p>{{ book.authors }}</p>
            </td>
            </tr>
        </tbody>
      </table>
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
.innerBody {
  margin-left: 200px;
  margin-top: 40px;
}

.bookTable {
  border-spacing: 10px;
  /* Установите желаемое расстояние между колонками в пикселях */
}

.bookTable td,
.bookTable th {
  padding: 10px;
  /* Установите желаемый отступ внутри ячеек */
}

.bookTable tr {
  line-height: 1;
  /* Установите желаемую высоту строки */
  cursor: pointer;
}

.authors-list {
  line-height: 1.5;
  /* Выберите желаемое расстояние между строками */
}

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
  max-width: 80px;
}</style>