<template>
  <div class="centered-container">
    <h4>To upload a book in EPUB format to our Digital library:</h4>
    <input id="loadButton" type="file" ref="fileInput" @change="handleFileChange" class="custom-file-upload">
    <label for="loadButton">Choose file</label>
    <div v-if="fileLabel" style="display: flex; flex-direction: column; align-items: center;">
      <p>{{ fileLabel }}</p>
      <button type="button" class="btn btn-outline-info" @click="uploadFile" :disabled="sendingStatus === statuses[1]">Upload</button>
    </div>
    <span v-if="sendingStatus">
      <p>{{ sendingStatus }}</p>
    </span>
    <img v-if="sendingStatus === statuses[1]" :src="Kitty">
  </div>
</template>



<script setup>
import { ref } from 'vue';
import { fetchWrapper } from '../helpers/fetch-wrapper';
import { useAuthStore } from '../stores/auth.store';
import Kitty from '../assets/Kitty.svg'

const serverURL = useAuthStore().baseUrl;
const fileInput = ref(null);
const fileLabel = ref(null)
const statuses = ref(["Wait a moment, please...", "Successfully! Thank you ^_^", "Something went wrong :(", null])
const sendingStatus = ref(statuses.value[3])

const handleFileChange = (event) => {
  const fileInput = event.target;
  if (fileInput.files.length > 0) {
    fileLabel.value = fileInput.files[0].name;
  } else {
    fileLabel.value = null;
  }
  sendingStatus.value = statuses.value[3];
}

const uploadFile = async () => {
  if (fileInput.value.files.length > 0) {
    const file = fileInput.value.files[0];

    const formData = new FormData();
    formData.append('book', file, file.name);

    sendingStatus.value = statuses.value[0]

    await fetchWrapper.post(serverURL + '/book/load', formData)
      .then(_response => {
        sendingStatus.value = statuses.value[1]
      })
      .catch(_error => {
        sendingStatus.value = statuses.value[2]
      });
  } else {
    console.warn('No file selected');
  }
};
</script>



<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;
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