<template>
    <div :class="['innerBody', 'mainBody']">
        <div>
            <img :src="`${serverURL}` + '/book/cover/' + `${route.params.number}`" class="book-cover">
        </div>
        <div class="details">
            <h2 class="titleBook">{{ theBook.title }}</h2>
            <div v-for="fieldInfo in listFields" :key="fieldInfo[0]" class="fieldInfo">
                <h3 v-if="theBook[fieldInfo[0]] !== null && theBook[fieldInfo[0]].trim() !== ''">
                    <span>{{ fieldInfo[1] }}:</span>
                    <span class="fieldValue">{{ theBook[fieldInfo[0]] }}</span>
                </h3>
            </div>
            <div v-if="theBook.description" id="descriptionBook">
                <h3>About the book:</h3>
                <p>{{ theBook.description }}</p>
            </div>
            <button id="buttonDownload" @click="downloadBook">Download EPUB</button>
        </div>
    </div>
</template>


<script setup>
import { inject, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const theBook = inject("theBook")
const serverURL = inject("serverURL")
const listFields = ref([
    ["authors", "Author"],
    ["language", "Language"],
    ["genres", "Related Phrases"],
    ["publisher", "Publisher"]
])

function downloadBook() {
    axios
        .get(serverURL + '/book/download/' + route.params.number, {
            responseType: 'blob',
        })
        .then(response => responseProcessing(response))
        .catch(error => {
            console.error('Ошибка запроса:', error);
        })
}

function responseProcessing(response) {
    const blob = new Blob([response.data], { type: 'application/epub+zip' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    console.log(theBook.value.title)
    link.download = `${theBook.value.title}` + '.epub';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}
</script>


<style scoped>
.fieldValue {
    font-weight: normal;
    margin-left: 10px;
}

.book-cover {
    max-width: 100%;
    height: auto;
    max-width: 350px;
    margin-right: 250px;
    margin-left: 50px;
}

.fieldInfo h3 {
    margin: 10px 0;
}

.innerBody {
    display: flex;
    margin-right: 50px;
}

.details {
    display: flex;
    flex-direction: column;
}

.titleBook {
    margin-bottom: 50px;
}

#descriptionBook {
    margin-top: 20px;
}

#buttonDownload {
    padding: 10px 20px;
    margin-bottom: 40px;
}
</style>