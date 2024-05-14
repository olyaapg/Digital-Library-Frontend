<template>
  <div class="mainBody">

    <div class="block">
      <p>On this page you can find the book you need.</p>
      <p>There are two kinds of searches:</p>
      <p>1. <span class="searches">Advanced book search</span> - for those who know exactly what they want;</p>
      <p>2. And <span class="searches">semantic book search</span> - for those who have not yet decided.</p>
      <p>Choose the one you like!</p>
      <button type="button" class="btn btn-light" @click="clearForm" :disabled="isSubmiting">Clear</button>
    </div>

    <form @submit.prevent="createPost">
      <div class="container">
        <div class="block">
          <h2>Advanced book search</h2>

          <div class="inputBlock">
            <label for="title">Title:</label>
            <div class="inputContainer">
              <input id="title" type="text" v-model="dataAdvanced.must.title.query"
                :disabled="typeSearch === 'semantic'" @input="changeOnAdvanced">
            </div>
          </div>

          <div v-for="(author, index) in authors" :key="index" class="inputBlock">
            <label :for="'author' + index">Author:</label>
            <div class="inputContainer">
              <input :id="'author' + index" type="text" v-model="authors[index]" :disabled="typeSearch === 'semantic'"
                @input="changeOnAdvanced">
              <button type="button" class="btn btn-light" v-if="authors.length < 5 && index === authors.length - 1"
                @click="addAuthorField" :disabled="typeSearch === 'semantic'">+</button>
            </div>
          </div>

          <div class="inputBlock">
            <label for="publisher">Publisher:</label>
            <div class="inputContainer">
              <input id="publisher" type="text" v-model="dataAdvanced.must.publisher.query"
                :disabled="typeSearch === 'semantic'" @input="changeOnAdvanced">
            </div>
          </div>

          <div class="inputBlock">
            <label for="quote">Quote:</label>
            <div class="inputContainer">
              <input id="quote" type="text" v-model="dataAdvanced.must['chapters.content'].query" class="longLine"
                :disabled="typeSearch === 'semantic'" @input="changeOnAdvanced">
            </div>
          </div>
        </div>


        <div class="block">
          <h2>Semantic book search</h2>
          <div class="inputBlockSemantic">
            <label for="chaptersContent" style="display: block; margin-bottom: 15px;">What do you want to read
              about?</label>
            <input id="chaptersContent" type="text" class="longLine" v-model="dataSemantic.query"
              :disabled="typeSearch === 'advanced'" @input="changeOnSemantic">
          </div>
          <div class="buttonContainer">
            <button type="submit" :disabled="typeSearch === 'None'" class="btn btn-outline-primary"
              style="margin-bottom: 20px;">
              <span v-show="isSubmiting" class="spinner-border spinner-border-sm me-1"></span>
              FIND
            </button>
            <div v-show="typeSearch === 'None'" class="alert alert-secondary" role="alert">
              Fill in at least one field
            </div>
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>




<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBooksStore } from '../stores/books.store';
import { fetchWrapper } from '../helpers/fetch-wrapper';

const serverURL = `${import.meta.env.VITE_API_URL}`;
const booksStore = useBooksStore();
const router = useRouter()
const errorMessage = ref();
const dataAdvanced = reactive({});
const dataSemantic = reactive({});
const authors = ref();
const typeSearch = ref('None')
const isSubmiting = ref(false)
const addAuthorField = () => {
  if (authors.value.length < 5) {
    authors.value.push('');
  }
};

function clearForm() {
  dataAdvanced.must = {
    'chapters.content': { query: '' },
    title: { query: '' },
    publisher: { query: '' }
  };
  dataAdvanced.authors = { query: [''] };
  authors.value = dataAdvanced.authors.query;
  dataSemantic.query = '';
  typeSearch.value = 'None';
  errorMessage.value = null;
}

clearForm();

function changeOnSemantic(event) {
  typeSearch.value = event.target.value === '' ? 'None' : 'semantic';
}

function changeOnAdvanced(event) {
  typeSearch.value = event.target.value === '' ? 'None' : 'advanced';
}

async function createPost() {
  isSubmiting.value = true;
  const url = `${serverURL}/book/search/${typeSearch.value}`;
  const data = typeSearch.value === 'advanced' ? dataAdvanced : dataSemantic;
  try {
    const response = await fetchWrapper.post(url, data);
    goToResults(response);
  } catch (error) {
    console.error('Ошибка запроса:', error);
    errorMessage.value = 'An error occurred while submitting the form. Please try again.';
  } finally {
    isSubmiting.value = false;
  }
}


function goToResults(response) {
  booksStore.setListFoundBooks(response);
  router.push({ name: 'FoundBooks' })
}
</script>




<style scoped>
.block {
  line-height: 0.5;
  margin-top: 30px;
}

.inputBlock {
  margin-top: 40px;
  display: flex;
  align-items: baseline;
}

.inputBlockSemantic {
  margin-top: 40px;
}

.inputContainer {
  margin-left: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
}

label {
  min-width: 80px;
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
</style>