<template>
  <header>
    <div class="navigation">
      <router-link to="/">
        <img src="./assets/Digital Library logo.svg" class="logo">
      </router-link>
      <div>
        <router-link v-if="isAdmin" to="/loadbook" class="link button" style="margin-right: 100px;">
          <img src="./assets/load icon.svg" class="button">
          load
        </router-link>
        <router-link v-if="!authStore.user" to="/login" class="link button">
          <img src="./assets/log in icon.svg" class="button">
          log in/Sign up
        </router-link>
        <span v-else="authStore.user" class="link button" @click="toggleSettings" style="position: relative;">
          <img src="./assets/settings_icon.svg" class="button">
          <span style="cursor: pointer; padding: 5px;">Settings</span>
          <ul v-if="showSettings" class="settings-dropdown">
            <li>{{ authStore.user.role }} - {{ authStore.user.name }}</li>
            <li>
              <div class="notification-checkbox" style="cursor: pointer;">
                <input type="checkbox" id="notifications" v-model="authStore.user.isSendNotification"
                  style="cursor: pointer;">
                <label for="notifications" style="cursor: pointer;" @click="switchNotifications">Receive
                  notifications</label>
              </div>
            </li>
            <li @click="authStore.logout" style="cursor: pointer;">Log out</li>
          </ul>
        </span>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<script setup>
import { computed, ref } from 'vue';
import { useAuthStore } from './stores/auth.store';
import { fetchWrapper } from './helpers/fetch-wrapper';

const authStore = useAuthStore();
const isAdmin = computed(() => {
  if (authStore.user && authStore.user.role === 'ADMIN') {
    return true;
  } else {
    return false;
  }
});

const showSettings = ref(false);
function toggleSettings() {
  showSettings.value = !showSettings.value;
}

const switchNotifications = async () => {
  console.log("mya")
  try {
    authStore.user.isSendNotification = !authStore.user.isSendNotification;
    await fetchWrapper.post(`${authStore.baseUrl}/user/notification`, { "isSendNotification": authStore.user.isSendNotification });
  } catch (error) {
    authStore.user.isSendNotification = !authStore.user.isSendNotification;
    console.log(error);
  }
}
</script>

<style scoped>
header {
  background-color: #A170EE;
  color: #010101;
  padding: 20px;
}

.logo {
  margin-right: 50px;
  /* Отступ справа для логотипа */
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
  align-items: center;
}

.link.button {
  max-width: 20px;
}

.settings-dropdown {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  list-style: none;
  margin: 0;
  width: 220px;
  /* Ширина списка */
  top: calc(100% + 10px);
  /* Отступ от верхней границы кнопки Settings */
  right: 0;
}

.settings-dropdown li:hover {
  background-color: #f0f0f0;
}

.notification-checkbox {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.notification-checkbox input[type="checkbox"] {
  margin-right: 10px;
  /* Расстояние между чекбоксом и текстом */
}
</style>
