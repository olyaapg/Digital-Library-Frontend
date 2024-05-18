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
                :disabled="typeSearch === 'semantic'" @input="onInput">
              <ul v-if="suggestionsTitle.length" class="suggestions">
                <li v-for="(suggestion, index) in suggestionsTitle" :key="index" @click="selectSuggestion(suggestion)">
                  {{ suggestion }}
                </li>
              </ul>
            </div>
          </div>

          <div v-for="(author, index) in dataAdvanced.authors" :key="index" class="inputBlock">
            <label :for="'author' + index">Author:</label>
            <div class="inputContainer">
              <input :id="'author' + index" type="text" v-model="dataAdvanced.authors[index]"
                :disabled="typeSearch === 'semantic'" @input="(event) => onAuthorInput(event, index)" />
              <ul v-if="suggestionsAuthor[index]?.length" class="suggestions">
                <li v-for="(suggestion, sIndex) in suggestionsAuthor[index]" :key="sIndex"
                  @click="selectAuthorSuggestion(suggestion, index)">
                  {{ suggestion }}
                </li>
              </ul>
            </div>
            <button type="button" class="btn btn-light"
              v-if="dataAdvanced.authors.length < 5 && index === dataAdvanced.authors.length - 1"
              @click="addAuthorField" :disabled="typeSearch === 'semantic'">
              +
            </button>
          </div>

          <div class="inputBlock">
            <label for="publisher">Publisher:</label>
            <div class="inputContainer">
              <input id="publisher" type="text" v-model="dataAdvanced.must.publisher.query"
                :disabled="typeSearch === 'semantic'" @input="clearMessage">
            </div>
          </div>

          <div class="inputBlock">
            <label for="quote">Quote:</label>
            <div class="inputContainer">
              <input id="quote" type="text" v-model="dataAdvanced.must['chapters.content'].query" class="longLine"
                :disabled="typeSearch === 'semantic'" @input="clearMessage">
            </div>
          </div>
        </div>


        <div class="block">
          <h2>Semantic book search</h2>
          <div class="inputBlockSemantic">
            <label for="chaptersContent" style="display: block; margin-bottom: 15px;">What do you want to read
              about?</label>
            <input id="chaptersContent" type="text" class="longLine" v-model="dataSemantic.query"
              :disabled="typeSearch === 'advanced'" @input="clearMessage">
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
import { computed, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { useBooksStore } from '../stores/books.store';
import { fetchWrapper } from '../helpers/fetch-wrapper';

const serverURL = useAuthStore().baseUrl;
const booksStore = useBooksStore();
const router = useRouter()
const errorMessage = ref();
const dataAdvanced = reactive({ must: { 'chapters.content': { query: '' }, title: { query: '' }, publisher: { query: '' } }, authors: [''] });
const dataSemantic = reactive({ query: '' });
const isSubmiting = ref(false)
const typeSearch = computed(() => {
  if (dataAdvanced.must['chapters.content'].query !== '' || dataAdvanced.must.title.query !== '' || dataAdvanced.must.publisher.query !== '' || dataAdvanced.authors.some(author => author.trim() !== '')) {
    return 'advanced';
  } else if (dataSemantic.query !== '') {
    return 'semantic';
  } else {
    return 'None';
  }
});
const clearMessage = () => { errorMessage.value = null; }
const clearForm = () => {
  dataAdvanced.must = {
    'chapters.content': { query: '' },
    title: { query: '' },
    publisher: { query: '' }
  };
  dataAdvanced.authors = [''];
  dataSemantic.query = '';
  errorMessage.value = null;
  suggestionsTitle.value = [];
  suggestionsAuthor.value = {};
}
const suggestionsTitle = ref([]);
const onInput = async (event) => {
  const query = event.target.value;
  if (query.length > 2) {
    try {
      const response = await fetchWrapper.get(`${serverURL}/autocomplete/title/${query}`);
      suggestionsTitle.value = response;
    } catch (error) {
      console.error('Ошибка получения данных автокомплита:', error);
    }
  } else {
    suggestionsTitle.value = [];
  }
};
const selectSuggestion = (suggestion) => {
  dataAdvanced.must.title.query = suggestion;
  suggestionsTitle.value = [];
};
watch(() => dataAdvanced.must.title.query, clearMessage);

const suggestionsAuthor = ref({});

const onAuthorInput = async (event, index) => {
  const query = event.target.value;
  if (query.length > 2) {
    try {
      const response = await fetchWrapper.get(`${serverURL}/autocomplete/authors/${query}`);
      suggestionsAuthor.value[index] = response;
    } catch (error) {
      console.error('Ошибка получения данных автокомплита:', error);
    }
  } else {
    suggestionsAuthor.value[index] = [];
  }
};
const addAuthorField = () => {
  if (dataAdvanced.authors.length < 5) {
    dataAdvanced.authors.push('');
  }
};

const selectAuthorSuggestion = (suggestion, index) => {
  dataAdvanced.authors[index] = suggestion;
  suggestionsAuthor.value[index] = [];
};

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
  display: block;
  align-items: center;
  gap: 5px;
  position: relative;
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

.suggestions {
  position: absolute;
  width: 100%;
  z-index: 1000;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 150px;
  overflow-y: auto;
  background: white;
  list-style: none;
  padding: 0;
  margin: 0;
}


.suggestions li {
  padding: 8px;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: #f0f0f0;
}
</style>