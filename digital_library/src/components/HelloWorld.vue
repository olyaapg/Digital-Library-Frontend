<template>
  <div>
    <header>
    <h1>Digital Library</h1>
    </header>
    <div>
      <p>On this page you can find the book you need.</p>
      <p>There are two kinds of searches:</p>
      <p>1. Advanced book search - for those who know exactly what they want;</p>
      <p>2. And semantic book search - for those who have not yet decided.</p>
      <p>Choose the one you like!</p>
    </div>
    <div>
      <h2>Advanced book search</h2>
      <div>
        <label>Title:</label>
        <input type="text" v-model="input_title"><br>
      </div>
      <br>
      <div>
        <label>Author:</label>
        <input type="text" v-model="input_author"><br>
      </div>
      <br>
      <div>
        <label>Publisher:</label>
        <input type="text" v-model="input_publisher"><br>
      </div>
      <br>
      <div>
        <label>Quote:</label>
        <input type="text" v-model="input_quote"><br>
      </div>
    </div>
    <div>
      <h2>Semantic book search</h2>
      <div>
        <label>What do you want to read about?</label>
        <input type="text"><br>
      </div>
      <button type="button">FIND</button>
    </div>
    <p>{{ input_title }}, {{ input_author }}, {{ input_publisher }}, {{ input_quote }}</p>
  </div>
</template>


<script setup>
import { ref } from 'vue'
const input_title = ref()
const input_author = ref()
const input_publisher = ref()
const input_quote = ref()
</script>


<style>
body, html {
  margin: 0;
}

header {
  background-color: #A170EE;
  color: #010101;
  padding: 10px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

body {
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>