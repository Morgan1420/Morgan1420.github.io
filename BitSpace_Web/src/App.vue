<template>
  <div id="main-app-container">
    <router-view />
    <CookieBanner />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CookieBanner from './components/views/CookieBanner.vue'

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
  { immediate: true },
)
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  background: var(--bg-gradient);
}

#main-app-container {
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
}
</style>
