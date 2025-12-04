<template>
  <div id="main-app-container">
    <nav class="language-switcher">
      <router-link to="/ca"><img class="flag" src="./assets/images/Web_icons/cat_flag.png" alt="Cat" /></router-link> |
      <router-link to="/en"><img class="flag" src="./assets/images/Web_icons/uk_flag.png" alt="Eng" /></router-link> |
      <router-link to="/es"><img class="flag" src="./assets/images/Web_icons/es_flag.png" alt="Esp" /></router-link>       
    </nav>
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

.flag {
  width: 20px;
  height: auto;
  vertical-align: middle;
  margin-right: 5px;
}

.language-switcher {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  align-items: center;
  justify-content: center;
}

.language-switcher a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
  padding: 0.25rem;
  transition: color 0.3s;
}

.language-switcher a:hover {
  color: #d85a5a;
}

.language-switcher a.router-link-exact-active {
  color: #fff;
  background: #E57373;
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(229,115,115,0.18);
}

.language-switcher a[aria-current="page"] {
  /* fallback selector for exact active link if router sets aria-current */
  color: #fff;
  background: #E57373;
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(229,115,115,0.18);
}
</style>
