<template>
    <div class="mainBody">
        <h2>Verify Email</h2>
        <p v-if="loading">Verifying your email...</p>
        <p v-if="message">{{ message }}</p>
        <img v-if="success" :src="successIcon">
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import successIcon from '../assets/success icon.svg';

const loading = ref(true);
const message = ref('');
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const success = ref(false);

onMounted(async () => {
    const token = route.query.token;

    if (!token) {
        message.value = 'Invalid verification link.';
        loading.value = false;
        return;
    }

    try {
        await authStore.verify(token);
        message.value = 'Email verified successfully!';
        success.value = true;
    } catch (error) {
        message.value = 'Email verification failed.';
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
.mainBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
}
</style>