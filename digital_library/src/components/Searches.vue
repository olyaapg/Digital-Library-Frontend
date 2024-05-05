<template>
  <div class="mainBody">

    <div class="block">
      <p>On this page you can find the book you need.</p>
      <p>There are two kinds of searches:</p>
      <p>1. <span class="searches">Advanced book search</span> - for those who know exactly what they want;</p>
      <p>2. And <span class="searches">semantic book search</span> - for those who have not yet decided.</p>
      <p>Choose the one you like!</p>
      <button type="button" class="btn btn-light" @click="clearForm">Clear</button>
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

          <div class="inputBlock">
            <label for="author">Author:</label>
            <div class="inputContainer">
              <input id="author" type="text" v-model="dataAdvanced.must.authors.query"
                :disabled="typeSearch === 'semantic'" @input="changeOnAdvanced">
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
            <p style="color: gray;" v-show="typeSearch === 'None'">Fill in at least one field</p>
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
const dataAdvanced = reactive({});
const dataSemantic = reactive({});
const typeSearch = ref('')
const isSubmiting = ref(false)

function clearForm() {
  dataAdvanced.must = {
    'chapters.content': { query: '' },
    title: { query: '' },
    authors: { query: '' },
    publisher: { query: '' }
  };
  dataSemantic.query = '';
  typeSearch.value = 'None';
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
  if (typeSearch.value === 'advanced') {
    await fetchWrapper.post(serverURL + '/book/search/advanced', dataAdvanced)
      .then(response => goToResults(response))
      .catch(error => {
        console.error('Ошибка запроса:', error);
      });
  } else {
    await fetchWrapper.post(serverURL + '/book/search/semantic', dataSemantic)
      .then(response => goToResults(response))
      .catch(error => {
        console.error('Ошибка запроса:', error);
      });
  }
}

function goToResults(response) {
  booksStore.setListFoundBooks(response);
  /*
  dataAdvanced.must = {
    'chapters.content': {
      query: '',
      operator: 'And'
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
  dataSemantic.query = ''*/
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