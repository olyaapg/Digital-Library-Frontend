<template>
  <div v-if="!isDeleted" class="review">
    <div class="nameAndGrade">
      <span class="name">{{ props.review.user.name }}</span>
      <StarRating v-model:rating="props.review.grade" :star-size="20" :read-only="true" :show-rating="false" />
    </div>
    <div class="comment">
      <p>{{ props.review.comment }}</p>
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
import { computed, ref } from 'vue';
import StarRating from 'vue-star-rating';
import { useAuthStore } from '../stores/auth.store';
import { fetchWrapper } from '../helpers/fetch-wrapper';

const isDeleted = ref(false);
const authStore = useAuthStore();
const serverUrl = authStore.baseUrl;
const isAdmin = computed(() => authStore.user && authStore.user.role === 'ADMIN');
const props = defineProps({
  review: {
    type: Object,
    required: true
  }
});

function removeReview() {
  Swal.fire({
    title: "Remove review",
    text: 'Are you sure you want to continue?',
    icon: 'question',
    showDenyButton: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await fetchWrapper.delete(`${serverUrl}/review/delete/${props.review.id}`);
        isDeleted.value = true;
      } catch (error) {
        console.log(error);
      }
    };
  });
}

function banUser() {
  Swal.fire({
    title: "Ban user",
    html: `
      <span>Are you sure you want to continue?</span>
      <div style="display: flex; align-items: center; white-space: nowrap; max-width: 300px; margin-left: 60px; margin-top: 30px;">
        <input type="checkbox" id="removeReviews" style="cursor: pointer" />
        <label style="cursor: pointer;" for="removeReviews">Remove all reviews of this user</label>
      </div>
    `,
    showDenyButton: true,
    confirmButtonText: 'OK',
    denyButtonText: 'No',
    preConfirm: () => {
      return {
        removeReviews: document.getElementById('removeReviews').checked
      };
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const { removeReviews } = result.value;
        await fetchWrapper.post(`${serverUrl}/user/ban?userId=${props.review.user.id}&isPermanent=${removeReviews}`);
      } catch (error) {
        console.log(error);
      }
    }
  });
}

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