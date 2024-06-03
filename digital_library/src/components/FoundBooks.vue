<template>
  <div class="innerBody">
    <div>
      <p>According to your request, there were {{ booksStore.listFoundBooks.length }} books:</p>
    </div>

    <div class="listRes">
      <table class="bookTable">
        <tbody>
          <tr v-for="(book, index) in booksStore.listFoundBooks" :key="index" @click="getDetails(book.id)">
            <td>{{ index + 1 }}</td>
            <td><img :src="`${serverURL}` + '/book/cover/' + `${book.id}`" alt="Book Cover" class="book-cover" /></td>
            <td>
              <h3>{{ book.title }}</h3>
              <p>{{ book.authors }}</p>
            </td>
            <td>
              <StarRating v-model:rating="book.averageGrade" :star-size="20" :read-only="true" :show-rating="false" />
              <p style="margin-top: 10px;">{{ book.countReviews }} reviews</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>



<script setup>
import { useRouter } from 'vue-router'
import { useBooksStore } from '../stores/books.store';
import { useAuthStore } from '../stores/auth.store';
import StarRating from 'vue-star-rating';

const booksStore = useBooksStore();
const router = useRouter()
const serverURL = useAuthStore().baseUrl;

function getDetails(id) {
  router.push({ name: 'DetailedInformation', params: { number: `${id}` } });
}

const formatNumber = (value, decimals) => {
  return value.toFixed(decimals);
};
</script>



<style scoped>
.innerBody {
  margin-left: 200px;
  margin-top: 40px;
}

.bookTable {
  border-spacing: 10px;
}

.bookTable td,
.bookTable th {
  padding-right: 60px;
  padding-bottom: 40px;
}

.bookTable tr {
  line-height: 1;
  cursor: pointer;
}

.authors-list {
  line-height: 1.5;
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
}
</style>