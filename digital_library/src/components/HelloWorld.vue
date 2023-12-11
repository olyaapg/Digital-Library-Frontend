<template>
  <div class="mainBody">
    <div class="block">
      <p>On this page you can find the book you need.</p>
      <p>There are two kinds of searches:</p>
      <p>1. <span class="searches">Advanced book search</span> - for those who know exactly what they want;</p>
      <p>2. And <span class="searches">semantic book search</span> - for those who have not yet decided.</p>
      <p>Choose the one you like!</p>
    </div>
    <div class="block">
      <h2>Advanced book search</h2>
      <div class="inputBlock">
        <label>Title:</label>
        <input type="text" v-model="input_title">
      </div>
      <div class="container">
        <div class="inputBlock">
          <label>Author:</label>
          <input type="text" v-model="input_author">
        </div>
        <div class="inputBlock">
          <label>Quote:</label>
          <input type="text" v-model="input_quote" class="longLine">
        </div>
      </div>
      <div class="inputBlock">
        <label>Publisher:</label>
        <input type="text" v-model="input_publisher">
      </div>
    </div>
    <div class="block">
      <h2>Semantic book search</h2>
      <div :class="['container', 'inputBlock']">
        <div>
          <label style="display: block; margin-bottom: 15px;">What do you want to read about?</label>
          <input type="text" class="longLine">
        </div>
        <button type="button">FIND</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
const input_title = ref()
const input_author = ref()
const input_publisher = ref()
const input_quote = ref()
</script>


<style scoped>
.mainBody {
  margin-left: 50px;
  margin-top: 40px;
}

.block {
  margin-bottom: 70px;
  line-height: 0.5;
}

.inputBlock {
  margin-top: 40px;
}

.container {
  display: flex;
  gap: 300px;
}

.longLine {
  width: 400px;
}
</style>