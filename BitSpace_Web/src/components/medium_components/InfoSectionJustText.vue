<script>
export default {
  name: 'InfoSectionJustText'
}
</script>

<template>
  <div class="container" :style="{ backgroundColor: backgroundColor, textAlign: center ? 'center' : 'left' }">
    <div class="text-content">
      <h2 v-html="title"></h2>
      <p v-if="text" v-html="text"></p>
    </div>
    
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: ''
  },
  backgroundColor: {
    type: String,
    default: '#FFFFFF'
  },
  center: {
    type: Boolean,
    default: false,
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 4rem 2rem;
}

.container.image-below {
  flex-direction: column;
  text-align: center;
}

.text-content {
  width: 90%;
}
.text-content h2 {
  margin-top: 1rem;
  font-size: 2.5rem;
}
.text-content p {
  font-size: 1.4rem;
  line-height: 1.6;
}


@media (max-width: 768px) {
  .container {
    padding: 2rem 1rem;
    flex-direction: column;
  }
  .text-content h2 {
    font-size: 2rem;
  }
}
</style>