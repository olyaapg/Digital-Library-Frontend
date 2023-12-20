<template>
    <div :class="['innerBody', 'mainBody']">
        <div>
            <img :src="theBook.coverImageUrl" class="book-cover">
        </div>
        <div class="details">
            <h2 class="titleBook">{{ theBook.title }}</h2>
            <div v-for="fieldInfo in listFields" :key="fieldInfo[0]" class="fieldInfo">
                <h3 v-if="theBook[fieldInfo[0]] !== 'null'">
                    <span>{{ fieldInfo[1] }}:</span>
                    <span class="fieldValue">{{ theBook[fieldInfo[0]] }}</span>
                </h3>
            </div>
            <div v-if="theBook.description" id="descriptionBook">
                <h3>About the book:</h3>
                <p>{{ theBook.description }}</p>
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
    ["publisher", "Publisher"]
])

</script>


<style scoped>
.fieldValue {
  font-weight: normal; 
  margin-left: 10px;
}
.book-cover {
    max-width: 100%;
    height: auto;
    max-width: 500px;
    margin-right: 250px;
    margin-left: 50px;
}

.fieldInfo h3 {
    margin: 10px 0;
}

.innerBody {
    display: flex;
    margin-right: 50px;
}

.details {
    display: flex;
    flex-direction: column;
}

.titleBook {
    margin-bottom: 50px;
}

#descriptionBook {
    margin-top: 20px;
}
</style>