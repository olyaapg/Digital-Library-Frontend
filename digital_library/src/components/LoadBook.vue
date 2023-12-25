<template>
    <div>
      <input type="file" ref="fileInput" @change="handleFileChange">
      <button @click="uploadFile">Upload</button>
    </div>
  </template>
  
  <script setup>
  import { inject, ref } from 'vue';
  import axios from 'axios';
  
  const fileInput = ref(null);
  const serverURL = inject("serverURL")
  
  const handleFileChange = () => {
    // Здесь можно добавить дополнительные проверки и обработку изменения файла, если нужно
  };

  const uploadFile = () => {
    if (fileInput.value.files.length > 0) {
      const file = fileInput.value.files[0];
  
      // Создаем объект FormData и добавляем файл в него
      const formData = new FormData();
      formData.append('book', file, file.name);
  
      // Отправляем файл на сервер
      axios.post(serverURL + '/book/load', formData)
        .then(response => {
          // Обработка успешного ответа от сервера
          console.log('File uploaded successfully:', response.data);
        })
        .catch(error => {
          // Обработка ошибок при отправке файла
          console.error('Error uploading file:', error);
        });
    } else {
      console.warn('No file selected');
    }
  };
  </script>
  