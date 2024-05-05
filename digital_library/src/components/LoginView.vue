<template>
    <div class="form-wrapper">
        <div class="form-content">
            <h2 v-show="!isRegister">Login</h2>
            <h2 v-show="isRegister">Sign up</h2>
            <br>
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="mb-3" v-if="isRegister">
                    <label class="form-label">Username</label>
                    <Field name="username" type="text" class="form-control small-input"
                        :class="{ 'is-invalid': errors.username }" />
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Login</label>
                    <Field name="login" type="text" class="form-control small-input"
                        :class="{ 'is-invalid': errors.login }" />
                    <div class="invalid-feedback">{{ errors.login }}</div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <Field name="password" type="password" class="form-control small-input"
                        :class="{ 'is-invalid': errors.password }" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
                        Login
                    </button>
                </div>
                <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
            </Form>
            <div style="color: blue; cursor: pointer; width: fit-content;" @click="isRegister = !isRegister">
                <div v-show="!isRegister">
                    Haven't signed up yet?
                </div>
                <div v-show="isRegister">
                    Already have an account?
                </div>
            </div>
        </div>
        <div class="image-wrapper">
            <img src="../assets/cat on the bookshelf.svg" alt="Cat on the bookshelf" class="image" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store';

const router = useRouter();
const authStore = useAuthStore();

const isRegister = ref(false);

// redirect to home if already logged in
if (authStore.user) {
    router.push('/');
}

const schema = Yup.object().shape({
    login: Yup.string().required('Login is required'),
    password: Yup.string().required('Password is required'),
    username: Yup.string().when('isRegister', {
        is: true,
        then: Yup.string().notRequired(),
    }),
});

async function onSubmit(values, { setErrors }) {
    const { username, login, password } = values;

    if (isRegister.value == false) {
        try {
            await authStore.login(login, password);
            router.back();
        } catch (error) {
            return setErrors({ apiError: error });
        }
    } else {
        try {
            await authStore.signup(login, username, password);
            router.back();
        } catch (error_1) {
            return setErrors({ apiError: error_1 });
        }
    }
}

</script>


<style scoped>
.form-wrapper {
    margin-left: 100px;
    display: flex;
    justify-content: center;
}

.form-content {
    margin-top: 100px;
}

.image-wrapper {
    margin-left: 150px;
    /* Добавляем отступ слева от формы до картинки */
}

.image {
    max-width: 90%;
    height: auto;
}

.small-input {
    width: 350px;
}
</style>
