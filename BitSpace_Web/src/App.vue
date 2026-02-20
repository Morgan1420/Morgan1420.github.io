<template>
  <div id="main-app-container">
    <router-view />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { locale } = useI18n()

// Observa los cambios en el parámetro de idioma y actualiza i18n automáticamente
watch(
  () => route.params.lang,
  (newLang) => {
    if (newLang && ['es', 'en', 'ca'].includes(newLang)) {
      locale.value = newLang
    }
  },
  { immediate: true }
)
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #FFD8CF; /* matches your .home-container */
}

#main-app-container {
  position: relative;
}
</style>
