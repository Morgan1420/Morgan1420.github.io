<script>
export default {
  name: 'InfoSectionLeft'
}
</script>

<template>
  <div class="container" :style="{ backgroundColor: backgroundColor }">
    <div class="image-content">
      <img :src="imageSrc" :alt="title" class="info-image" v-if="imageSrc" />
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

  display: flex;
  justify-content: center;
  align-items: center;

}

.image-content img {

  position: relative;
  max-height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .container {
    padding: 2rem 1rem;
    flex-direction: column;
  }

  .text-content {
    width: 100%;
  }

  .text-content h2 {
    font-size: 1.2rem;
  }

  .text-content p {
    font-size: 0.8rem;
  }

  /* Hide large decorative images on small screens to save bandwidth and space */
  .image-content,
  .info-image {
    display: none;
    visibility: hidden;
    height: 0;
    overflow: hidden;
  }
}
</style>