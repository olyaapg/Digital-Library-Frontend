<template>
    <h2 style="margin-bottom: 50px;">Login</h2>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="mb-3">
            <label class="form-label" for="emailField">Email</label>
            <Field name="email" type="email" class="form-control small-input" :class="{ 'is-invalid': errors.email }"
                id="emailField" />
            <div class="invalid-feedback">{{ errors.email }}</div>
        </div>
        <div class="mb-3">
            <label class="form-label" for="passwordField">Password</label>
            <Field name="password" type="password" class="form-control small-input"
                :class="{ 'is-invalid': errors.password }" id="passwordField" />
            <div class="invalid-feedback">{{ errors.password }}</div>
        </div>
        <div class="mb-3">
            <button class="btn btn-primary" :disabled="isSubmitting">
                <span v-show="isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
                Log in
            </button>
        </div>
        <div v-show="errors.apiError" class="alert alert-danger mt-3 mb-0 errors-block">
            {{ errors.apiError }}
        </div>
    </Form>
</template>

<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const schema = Yup.object().shape({
    email: Yup.string().required('Mail is required'),
    password: Yup.string().required('Password is required')
});


async function onSubmit(values, { setErrors }) {
    const { email, password } = values;
    try {
        await authStore.login(email, password);
        router.push('/');
    } catch (error) {
        return setErrors({ apiError: error });
    }
}
</script>


<style scoped>
.small-input {
    width: 350px;
}

.errors-block {
    max-width: 350px;
}
</style>
