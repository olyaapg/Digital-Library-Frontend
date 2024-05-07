<template>
    <div class="form-wrapper">
        <div class="form-content">
            <LoginForm v-if="isLogin" />
            <SignUpForm v-else />
            <div style="margin-top: 30px;">
                <span @click="isLogin = !isLogin">
                    {{ inscription }}
                </span>
            </div>
        </div>
        <div class="image-wrapper">
            <img src="../assets/cat on the bookshelf.svg" alt="Cat on the bookshelf" class="image" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import LoginForm from './LoginForm.vue';
import SignUpForm from './SignUpForm.vue'

const router = useRouter();
const authStore = useAuthStore();
const isLogin = ref(true);
const inscription = computed(() => {
    if (isLogin.value) {
        return "Haven't signed up yet?";
    } else {
        return "Already have an account?";
    }
})

// redirect to home if already logged in
if (authStore.user) {
    router.push('/');
}
</script>


<style scoped>
.form-wrapper {
    margin-left: 100px;
    display: flex;
    justify-content: center;
}

.form-content {
    margin-top: 80px;
}

.image-wrapper {
    margin-left: 150px;
    /* Добавляем отступ слева от формы до картинки */
}

.image {
    max-width: 90%;
    height: auto;
}

span {
    color: blue;
    cursor: pointer;
    width: fit-content;
    font-size: large;
    font-weight: 500;
    text-decoration: underline;
}
</style>
