<template>
    <form @submit.prevent="createPost">
        <div class="form-group">
            <label for="username">Your name:</label>
            <input type="text" id="username" v-model="inputData.userName" placeholder="Name">
        </div>
        <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" id="title" v-model="inputData.title" placeholder="Title">
        </div>
        <div class="form-group">
            <label for="text">Text:</label>
            <textarea id="text" v-model="inputData.body" placeholder="Text" rows="6" cols="20"></textarea>
        </div>
        <button type="submit">Submit</button>
    </form>
</template>

<script setup>
import axios from 'axios'
import { reactive } from 'vue'
const inputData = reactive({
    userName: '',
    title: '',
    body: ''
})

const test = {
      "must": {
        "chapters.content": {
          "query": "User string here"
        },
        "title": '',
        "authors": ''
      }
    }

console.log("Started")
function createPost() {
    axios
        .post("https://jsonplaceholder.typicode.com/posts", inputData)
        .then(response => console.log(response))
    console.log("Отправлено")
}
</script>

<style scoped>
label {
    display: block;
}

.form-group {
    margin-bottom: 15px;
}
</style>

