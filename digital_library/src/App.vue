<template>
  <header>
    <div class="navigation">
      <router-link to="/">
        <img src="./assets/Digital Library logo.svg" class="logo">
      </router-link>
      <div>
        <router-link to="/loadbook" class="link button">
          <img src="./assets/load icon.svg" class="button">
          load
        </router-link>
        <router-link v-if="!authStore.user" to="/login" class="link button">
          <img src="./assets/log in icon.svg" class="button">
          log in/Sign up
        </router-link>
        <span v-else="authStore.user" to="/login" class="link button" @click="authStore.logout">
          <img src="./assets/logout icon.svg" class="button">
          log out
        </span>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<script setup>
import { useAuthStore } from './stores/auth.store';

const authStore = useAuthStore();
</script>

<style scoped>
header {
  background-color: #A170EE;
  color: #010101;
  padding: 20px;
}

.logo {
  margin-right: 50px; /* Отступ справа для логотипа */
}

.link {
  text-decoration: none;
  font-size: large;
  font-weight: 500;
  color: black;
}

.active {
  text-decoration: underline;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Центрирование элементов по вертикали */
}

.link.button {
  margin-left: 100px; /* Дополнительный отступ между кнопками */
  margin-right: 20px;
  max-width: 20px;
  cursor: pointer;
}
</style>
