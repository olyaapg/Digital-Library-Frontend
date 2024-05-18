<template>
  <div class="review">
    <div class="nameAndGrade">
      <span class="name">{{ review.user.name }}</span>
      <StarRating v-model:rating="review.grade" :star-size="20" :read-only="true" :show-rating="false" />
    </div>
    <div class="comment">
      <p>{{ review.comment }}</p>
    </div>
    <div v-if="isAdmin" class="dangerButtons">
      <button type="button" class="btn btn-warning" @click="removeReview">Remove review</button>
      <button type="button" class="btn btn-warning" @click="banUser">Ban user</button>
    </div>
    <hr class="divider" />
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { computed } from 'vue';
import StarRating from 'vue-star-rating';
import { useAuthStore } from '../stores/auth.store';
import { fetchWrapper } from '../helpers/fetch-wrapper';

const authStore = useAuthStore();
const serverUrl = authStore.baseUrl;
const isAdmin = computed(() => authStore.user && authStore.user.role === 'ADMIN');

function createSwal(title) {
  return Swal.fire({
    title: title,
    text: 'Are you sure you want to continue?',
    icon: 'question',
    showDenyButton: "true"
  });
}

function removeReview() {
  createSwal("Remove review").then(async (result) => {
    if (result.isConfirmed) {
      console.log("remove")
      //await fetchWrapper.post(`${serverUrl}/user/ban?userId=${review.user.id}`)
    };
  });
}

function banUser() {
  createSwal("Ban user").then(async (result) => {
    if (result.isConfirmed) {
      await fetchWrapper.post(`${serverUrl}/user/ban?userId=${review.user.id}`)
    };
  });
}

defineProps({
  review: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.review {
  margin-top: 50px;
  margin-left: 20px;
  max-width: 1000px;

}

.nameAndGrade {
  display: flex;
  align-items: center;
  gap: 30px;
}

.name {
  margin: 0;
  font-size: large;
  font-weight: 500;
}

.comment {
  margin-top: 20px
}

.dangerButtons {
  margin-top: 20px;
  display: flex;
  justify-content: end;
  gap: 25px;
}

.divider {
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  border-top: 2px solid #c1c1c1;
}
</style>