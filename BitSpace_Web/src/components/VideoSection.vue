<template>
  <div class="video-container" :class="{ 'video-below': text === '' }">
    <div class="text-content">
      <h2>{{ title }}</h2>
      <p v-if="text">{{ text }}</p>
    </div>
    <div class="video-content">
      <iframe
        :src="embedUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="video-iframe"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: ''
  },
  videoSrc: {
    type: String,
    required: true
  }
})

const embedUrl = computed(() => {
  try {
    const url = new URL(props.videoSrc)
    let videoId
    if (url.hostname === 'youtu.be') {
      videoId = url.pathname.substring(1)
    } else if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
      videoId = url.searchParams.get('v')
    }
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }
  } catch (error) {
    console.error('URL de YouTube inválida:', error)
  }
  // Devuelve la URL original si no se puede procesar
  return props.videoSrc
})
</script>

<style scoped>
.video-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 4rem 2rem;
}

.video-container.video-below {
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

.video-content {
  flex: 1 1 500px;
  max-width: 700px;
  width: 100%;
  position: relative;
  /* Proporción 16:9 para el video */
  padding-top: 19.5%; /* 9 / 16 = 0.5625 */
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

@media (max-width: 768px) {
  .video-container {
    padding: 2rem 1rem;
    flex-direction: column;
  }
  .text-content h2 {
    font-size: 2rem;
  }
  .video-content {
    width: 100%;
    padding-top: 56.25%;
  }
}
</style>
