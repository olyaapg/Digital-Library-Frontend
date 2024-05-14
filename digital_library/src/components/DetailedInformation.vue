<template>
    <div v-if="theBook" class="mainBody">
        <div class="bookInfo">
            <div class="details flexAndColumn">
                <img :src="`${serverURL}` + '/book/cover/' + `${bookNumber}`" class="book-cover">
                <h2>Popularity</h2>
                <div class="fieldInfo">
                    <h3>
                        <span>Number of reviews:</span>
                        <span class="fieldValue" v-if="theBook.reviews">{{ theBook.reviews.length }}</span>
                    </h3>
                    <h3>
                        <span>Average rating:</span>
                        <span class="fieldValue">{{ theBook.meanGrade }}</span>
                    </h3>
                </div>
            </div>

            <div class="details flexAndColumn">
                <h1 class="titleBook">{{ theBook.title }}</h1>
                <div v-for="fieldInfo in listFields" :key="fieldInfo[0]" class="fieldInfo">
                    <h3 v-if="theBook[fieldInfo[0]] !== null && theBook[fieldInfo[0]].trim() !== ''">
                        <span>{{ fieldInfo[1] }}:</span>
                        <span class="fieldValue">{{ theBook[fieldInfo[0]] }}</span>
                    </h3>
                </div>
                <div v-if="theBook.size" class="fieldInfo">
                    <h3>
                        <span>Size:</span>
                        <span class="fieldValue">{{ theBook.size }}</span>
                    </h3>
                </div>
                <div v-if="theBook.description" id="descriptionBook">
                    <h3 style="margin-bottom: 30px; margin-top: 30px">About the book:</h3>
                    <p>{{ theBook.description }}</p>
                </div>

                <button @click="downloadBook" class="btn btn-success buttonDownload">Download
                    EPUB</button>
                <div v-if="haveRole">
                    <h2>Create review</h2>
                    <h3 style="margin: 15px;">Your comment:</h3>
                    <div class="flexAndColumn">
                        <textarea v-model="comment" rows="4" cols="50" placeholder="Write your comment here"
                            maxlength="255" style="margin-bottom: 15px;"></textarea>
                        <div class="gradeAndPublish">
                            <div>
                                <p style="margin: 0;">Grade</p>
                                <StarRating v-model:rating="currentRating" :star-size="30" />
                            </div>
                            <button type="button" @click="publishComment"
                                class="btn btn-success buttonPublish">Publish</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="reviews details">
            <h2>Reviews</h2>
            <div class="scrolling-component" ref="scrollComponent">
                <Review v-for="review in theBook.reviews" :review="review" />
            </div>
        </div>
        <div id="endOfPage"></div>
    </div>

    <div v-else class="spinner-container">
        <div class="spinner"></div>
    </div>
</template>


<script setup>
import { computed, onMounted, ref, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { fetchWrapper } from '../helpers/fetch-wrapper';
import { useAuthStore } from '../stores/auth.store';
import StarRating from 'vue-star-rating';
import Review from '../components/Review.vue';

const authStore = useAuthStore();
const route = useRoute();
const serverURL = `${import.meta.env.VITE_API_URL}`;

const currentRating = ref(0);
const page = ref(0);
const loading = ref(false);
const bookNumber = route.params.number;
const theBook = ref();
const comment = ref();
const listFields = ref([
    ["authors", "Authors"],
    ["language", "Language"],
    ["genres", "Related Phrases"],
    ["publisher", "Publisher"]
]);
const haveRole = computed(() => {
    return !!authStore.user;
});

async function downloadBook() {
    try {
        const url = `${serverURL}/book/download/${bookNumber}`;
        const response = await fetchWrapper.get(url, null, { responseType: 'blob' });
        responseProcessing(response);
    } catch (error) {
        console.error('Ошибка запроса:', error);
    }
}

function responseProcessing(blob) {
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${theBook.value.title}` + '.epub';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}

async function publishComment() {
    let body = {
        "grade": currentRating.value,
        "comment": comment.value
    };
    try {
        await fetchWrapper.post(`${serverURL}/review/create/${bookNumber}`, body);
        currentRating.value = 0;
        comment.value = '';
    } catch (error) {
        console.error('Ошибка при публикации комментария:', error);
    }
}

async function fetchReviews() {
    if (loading.value) return;
    loading.value = true;

    try {
        const response = await fetchWrapper.get(`${serverURL}/review/getBook/${bookNumber}?size=5&page=${page.value}`);
        theBook.value.reviews = [...theBook.value.reviews, ...response];
        if (response.length !== 0) {
            page.value += 1;
        }
    } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
    } finally {
        loading.value = false;
    }
}

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        fetchReviews();
    }
});

let scrollComponent;

onMounted(async () => {
    try {
        const responseBook = await fetchWrapper.get(`${serverURL}/book/${bookNumber}`);
        theBook.value = responseBook;
        if (theBook.value.size) {
            let bytes = theBook.value.size;
            if (bytes < 1024) {
                theBook.value.size = bytes + " bytes";
            } else if (bytes < 1048576) {
                theBook.value.size = (bytes / 1024).toFixed(0) + " KB";
            } else {
                theBook.value.size = (bytes / 1048576).toFixed(0) + " MB";
            }
        }

        const responseMeanGrade = await fetchWrapper.get(`${serverURL}/review/getMeanGrade/${bookNumber}`);
        theBook.value.meanGrade = responseMeanGrade === -1 ? "-" : responseMeanGrade.toFixed(2);

        theBook.value.reviews = [];
        fetchReviews();

        // Обработчик для IntersectionObserver для наблюдения за прокруткой страницы
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchReviews();
            }
        });

        // Наблюдение за концом страницы
        observer.observe(document.querySelector('#endOfPage')); // Добавьте элемент с id="endOfPage" в конец вашей страницы
    } catch (error) {
        console.error('Ошибка при загрузке книги:', error);
    }
});


onBeforeUnmount(() => {
    observer.disconnect();
});
</script>


<style scoped>
.flexAndColumn {
    display: flex;
    flex-direction: column;
}

.fieldValue {
    font-weight: normal;
    margin-left: 10px;
}

.book-cover {
    max-width: 100%;
    height: auto;
    max-width: 350px;
    margin-right: 250px;
    margin-bottom: 30px;
}

.fieldInfo h3 {
    margin: 10px 0;
}

.bookInfo {
    display: flex;
    margin-right: 50px;
}

.details {
    margin-left: 50px;
}

.titleBook {
    margin-bottom: 50px;
}

#descriptionBook {
    margin-top: 20px;
}

.buttonDownload {
    align-self: center;
    margin: 30px;
    margin-bottom: 60px;
}

.buttonPublish {
    align-self: center;
}

.gradeAndPublish {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.reviews {
    margin-top: 50px;
}
</style>