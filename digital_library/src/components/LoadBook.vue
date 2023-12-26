<template>
  <div class="centered-container">
    <h3>To upload a book in EPUB format to our Digital library:</h3>
    <input id="loadButton" type="file" ref="fileInput" @change="handleFileChange" class="custom-file-upload">
    <label for="loadButton">Choose file</label>
    <div v-if="fileLabel" style="display: flex; flex-direction: column; align-items: center;">
      <p>{{ fileLabel }}</p>
      <button @click="uploadFile">Upload</button>
    </div>
    <span v-if="sendingStatus">
      <p>{{ sendingStatus }}</p>
    </span>
  </div>
</template>



<script setup>
import { inject, ref } from 'vue';
import axios from 'axios';

const fileInput = ref(null);
const serverURL = inject("serverURL")
const fileLabel = ref(null)
const statuses = ref(["Wait a moment, please...", "Successfully! Thank you ^_^", "Something went wrong :(", null])
const sendingStatus = ref(statuses[3])

const handleFileChange = (event) => {
  const fileInput = event.target;
  if (fileInput.files.length > 0) {
    fileLabel.value = fileInput.files[0].name;
  } else {
    fileLabel.value = null;
  }
}

const uploadFile = () => {
  if (fileInput.value.files.length > 0) {
    const file = fileInput.value.files[0];

    const formData = new FormData();
    formData.append('book', file, file.name);

    sendingStatus.value = statuses[0]

    axios.post(serverURL + '/book/load', formData)
      .then(_response => {
        sendingStatus = statuses[1]
      })
      .catch(_error => {
        sendingStatus = statuses[2]
      });
  } else {
    console.warn('No file selected');
  }
};
</script>



<style scoped>
.success {
  color: greenyellow;
}

.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
}

.custom-file-upload {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.custom-file-upload+label {
  font-size: medium;
  font-weight: 500;
  font-family: 'Fira Sans', sans-serif;
  color: white;
  background-color: #EEA170;
  display: inline-block;
  padding: 5px;
}

.custom-file-upload:focus+label,
.custom-file-upload+label:hover {
  background-color: #af693e;
}

.custom-file-upload+label {
  cursor: pointer;
}
</style>  