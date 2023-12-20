<template>
    <div :class="['innerBody', 'mainBody']">
        <div class="coverDiv">
            <img :src="theBook.coverImageUrl" class="book-cover">
        </div>
        <div class="details">
            <h2 class="titleBook">{{ theBook.title }}</h2>
            <div v-for="fieldInfo in listFields" :key="fieldInfo[0]">
                <h3 v-if="theBook[fieldInfo[0]] !== 'null'" class="field">{{ fieldInfo[1] }}: {{ theBook[fieldInfo[0]] }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';

const theBook = inject("theBook")
const listFields = ref([
    ["authors", "Author"],
    ["language", "Language"],
    ["genres", "Related Phrases"],
    ["publisher", "Publisher"],
    ["description", "About the book"]
])

</script>


<style scoped>
.book-cover {
    max-width: 100%;
    height: auto;
    max-width: 500px;
    margin-right: 250px;
    margin-left: 50px;
}

.innerBody {
    display: flex;
}

.details {
    display: flex;
    flex-direction: column;
}

.titleBook {
    margin-bottom: 50px;
}
</style>