<template>
    <div class="mainBody">
      <img :src="theBook.coverImageUrl" class="book-cover">
      <div class="details">
        <h3 v-for="(val, field) in theBook" :key="field">
          <template v-if="field !== 'coverImageUrl'">
            {{ field }}: {{ val }}
          </template>
        </h3>
      </div>
    </div>
  </template>

<script setup>
import { inject } from 'vue';

const theBook = inject("theBook")

</script>


<style scoped>

.book-cover {
    max-width: 100%;
    height: auto;
    max-width: 500px;
    margin-right: 300px;
    margin-left: 50px;
}

.mainBody {
    display: flex;
    align-items: center;
}


.details {
    display: flex;
    flex-direction: column;
}
</style>