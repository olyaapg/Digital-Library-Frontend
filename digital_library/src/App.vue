<script setup>
</script>

<template>
  <header>
    <router-link to="/">
      <img src="./assets/Digital Library logo.svg">
    </router-link>
    <router-link to="/loadbook" :class="['load-link', 'load-button']">
      <img src="./assets/load icon.svg" class="load-button">
      load
    </router-link>
  </header>
  <RouterView />
</template>

<style scoped>
.load-button {
  margin-right: 5px;
  align-items: center;
  display: flex;
}

.load-link {
  text-decoration: none;
  font-size: large;
  font-weight: bold;
  color: black;
  margin-left: auto;
  margin-right: 50px;
}
</style>
