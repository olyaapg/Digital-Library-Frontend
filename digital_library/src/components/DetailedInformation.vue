<template>
    <h1>hi</h1>
    <h1>{{ book }}</h1>
</template>

<script setup>
import { inject } from 'vue';


const book = inject('book')
</script>