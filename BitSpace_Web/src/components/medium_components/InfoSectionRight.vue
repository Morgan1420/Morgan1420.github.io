<script>
export default {
  name: 'InfoSectionRight'
}
</script>

<template>
  <div class="container" :style="{ backgroundColor: backgroundColor }">
    <div class="image-content">
      <img :src="imageSrc" alt="Info image" v-if="imageSrc" />
    </div>
    <div class="text-content">
      <h2>{{ title }}</h2>
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
  imageSrc: {
    type: String,
    required: true
  },
  backgroundColor: {
    type: String,
    default: '#FFFFFF'
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
  width: 50%;
}
.text-content h2 {
  margin-top: 1rem;
  font-size: 2.5rem;
}
.text-content p {
  font-size: 1.4rem;
  line-height: 1.6;
}

.image-content {
  width: 35%;
  position: relative;
}

.info-image {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
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