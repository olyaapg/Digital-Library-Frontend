<template>
    <div class="form-wrapper">
        <div class="form-content">
            <h2>Login</h2>
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="mb-3">
                    <label class="form-label">Username</label>
                    <Field name="username" type="text" class="form-control"
                        :class="{ 'is-invalid': errors.username }" />
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <Field name="password" type="password" class="form-control"
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
        </div>
        <div class="image-wrapper">
            <img src="../assets/cat on the bookshelf.svg" alt="Cat on the bookshelf" class="image" />
        </div>
    </div>
</template>

<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth.store';

const route = useRoute();
const authStore = useAuthStore();

// redirect to home if already logged in
if (authStore.user) {
    router.push('/');
}

const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});

function onSubmit(values, { setErrors }) {
    const { username, password } = values;

    return authStore.login(username, password)
        .then(() => {
            // redirect to previous url or default to home page
            route.push(route.query.returnUrl || '/');
        })
        .catch(error => setErrors({ apiError: error }));
}
</script>


<style scoped>
.form-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* Выравниваем элементы по вертикали */
}

.form-content {
    flex: 1;
    /* Делаем форму растягиваемой, чтобы она занимала всю доступную ширину */
    padding-right: 20px;
    /* Добавляем отступ справа между формой и картинкой */
}

.image-wrapper {
    flex: 0 0 auto;
    /* Картинка не должна растягиваться, она остается фиксированной ширины */
}

.image {
    max-width: 100%;
    /* Задаем максимальную ширину для картинки */
    height: auto;
    /* Сохраняем пропорции картинки */
}
</style>