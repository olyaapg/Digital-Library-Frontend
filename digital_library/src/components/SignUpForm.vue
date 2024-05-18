<template>
    <h2 style="margin-bottom: 50px;">Sign up</h2>
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="mb-3">
            <label class="form-label" for="usernameField">Username</label>
            <Field name="username" type="text" class="form-control small-input" :disabled="success"
                :class="{ 'is-invalid': errors.username }" id="usernameField" />
            <div class="invalid-feedback">{{ errors.username }}</div>
        </div>
        <div class="mb-3">
            <label class="form-label" for="emailField">Email</label>
            <Field name="email" type="email" class="form-control small-input" :class="{ 'is-invalid': errors.email }"
                id="emailField" :disabled="success"/>
            <div class="invalid-feedback">{{ errors.email }}</div>
            <small class="form-text text-muted">We'll never share your email with anyone
                else.</small>
        </div>
        <div class="mb-3">
            <label class="form-label" for="passwordField">Password</label>
            <Field name="password" type="password" class="form-control small-input"
                :class="{ 'is-invalid': errors.password }" id="passwordField" :disabled="success"/>
            <div class="invalid-feedback">{{ errors.password }}</div>
        </div>
        <div class="mb-3 form-check">
            <input v-model="allowNotifications" type="checkbox" class="form-check-input" id="permission" :disabled="success">
            <label class="form-check-label" for="permission">Allow sending notifications by email</label>
        </div>
        <div class="mb-3">
            <button class="btn btn-primary" :disabled="isSubmitting || success">
                <span v-show="isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
                Sign up
            </button>
        </div>
        <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0 small-input">{{ errors.apiError }}</div>
    </Form>
    <div v-if="success" class="alert alert-success small-input" role="alert">
        Registration successful! Please check your email to verify your account.
    </div>
</template>

<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '../stores/auth.store';
import { ref } from 'vue';

const allowNotifications = ref(true);
const authStore = useAuthStore();
const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().required('Mail is required'),
    password: Yup.string().required('Password is required')
});
const success = ref(false);

async function onSubmit(values, { setErrors }) {
    const { username, email, password } = values;
    try {
        await authStore.signup(email, username, password, allowNotifications.value);
        success.value = true;
    } catch (error_1) {
        return setErrors({ apiError: error_1 });
    }
}

</script>


<style scoped>
.small-input {
    width: 350px;
    max-width: 350px;
}
</style>
