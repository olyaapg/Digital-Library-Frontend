import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './style.css';
import App from './App.vue';
import { router } from './helpers/router';
import { useAuthStore } from './stores/auth.store';

startApp();

// async start function to enable waiting for refresh token call
async function startApp () {
  const app = createApp(App);

  app.use(createPinia());
  app.use(router);

  // attempt to auto refresh token before startup
  try {
      const authStore = useAuthStore();
      await authStore.refreshToken();
  } catch {
      // catch error to start app on success or failure
  }

  app.mount('#app');
}