<script>
export default {
  name: 'InfoSectionLeft'
}
</script>

<template>
  <div class="info-container" :class="{ 'image-below': text === '' }" :style="{ backgroundColor: backgroundColor }">
    <div class="image-content">
      <img :src="imageSrc" :alt="title" class="info-image" v-if="imageSrc"/>
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
.info-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 4rem 2rem;
}

.info-container.image-below {
  flex-direction: column;
  text-align: center;
}

.text-content {
  flex: 1 1 400px;
  max-width: 600px;
}

.text-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.text-content p {
  font-size: 1.1rem;
  line-height: 1.6;
}

.image-content {
  flex: 1 1 500px;
  max-width: 700px;
  position: relative;
}

.info-image {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

@media (max-width: 768px) {
  .info-container {
    padding: 2rem 1rem;
    flex-direction: column;
  }
  .text-content h2 {
    font-size: 2rem;
  }
}
</style>