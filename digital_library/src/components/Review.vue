<template>
    <div class="review">
      <div class="nameAndGrade">
        <span class="name">{{ review.user.name }}</span>
        <StarRating v-model:rating="review.grade" :star-size="20" :read-only="true" :show-rating="false" />
      </div>
      <div class="comment">
        <p>{{ review.comment }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import StarRating from 'vue-star-rating';
  
  export default {
    props: {
      review: {
        type: Object,
        required: true
      }
    },
    components: {
      StarRating
    }
  }
  </script>
  
  <style scoped>
  .review {
    margin-top: 40px;
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
  </style>
  