<template>
    <div class="toggle-container">
        <div class="toggle-switch">
            <input type="checkbox" id="switch" :checked="isChecked" @change="handleChange" />
            <label for="switch" class="switch-label">
                <span class="switch-inner"></span>
                <span class="switch-switch"></span>
            </label>
        </div>
        <span class="toggle-text">Take into account the popularity of the book</span>
    </div>
</template>

<script setup>
const props = defineProps({
    isChecked: Boolean
});

const emit = defineEmits(['update:isChecked']);

const handleChange = (event) => {
    emit('update:isChecked', event.target.checked);
};
</script>

<style scoped>
.toggle-container {
    display: flex;
    align-items: center;
}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
    margin-right: 10px;
}

input {
    opacity: 0;
    width: 0;
    height: 0;
}

.switch-label {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 24px;
}

.switch-label:before {
    position: absolute;
    content: "";
    height: 19px;
    width: 19px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked+.switch-label {
    background-color: #2196F3;
}

input:checked+.switch-label:before {
    transform: translateX(24px);
}
</style>