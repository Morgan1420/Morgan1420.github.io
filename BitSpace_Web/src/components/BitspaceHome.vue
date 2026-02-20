<template>
  <div class="home-container">
    <div ref="carouselWrapper">
      <Carousel @go-to-collaborate="scrollToCollaborate" @go-to-waitlist="scrollToWaitlist" />
    </div>

    <div id="nav-bar" :class="{ 'nav-over-carousel': isOverCarousel, 'nav-after-carousel': !isOverCarousel }">
      <router-link id="nb-BitSpace-logo" :to="'/' + locale" aria-label="Tornar a la pàgina inicial de BitSpace">
        <img class="bitspace-logo" src="../assets/images/Web_icons/BS-logo.png" alt="Logotip de BitSpace" />
      </router-link>
      <div id="nb-web-menus">
        <div class="nav-item nav-item-games">
          <button type="button" class="nav-button">Games</button>
          <div class="nav-submenu">
            <button type="button" class="nav-submenu-item">Prototype</button>
            <button type="button" class="nav-submenu-item">Create your bit</button>
          </div>
        </div>

        <div class="nav-item nav-item-team">
          <button type="button" class="nav-button">Team</button>
          <div class="nav-submenu">
            <button type="button" class="nav-submenu-item">Team</button>
            <button type="button" class="nav-submenu-item">History</button>
          </div>
        </div>

        <div class="nav-item nav-item-collaborate">
          <button type="button" class="nav-button">Collaborate</button>
          <div class="nav-submenu">
            <button type="button" class="nav-submenu-item">Surveys</button>
            <button type="button" class="nav-submenu-item">Waiting list</button>
            <button type="button" class="nav-submenu-item">Contact us</button>
          </div>
        </div>

        <div class="nav-language" @keyup.esc.stop="isLangMenuOpen = false">
          <button type="button" class="nav-lang-toggle" @click="isLangMenuOpen = !isLangMenuOpen"
            :aria-expanded="isLangMenuOpen ? 'true' : 'false'" aria-haspopup="true" aria-label="Canviar idioma">
            <img class="flag" :src="currentLangFlag.src" :alt="currentLangFlag.alt" />
          </button>
          <div v-if="isLangMenuOpen" class="nav-lang-menu" role="menu">
            <router-link to="/ca" role="menuitem" aria-label="Cambiar a Català" @click="isLangMenuOpen = false">
              <img class="flag" src="../assets/images/Web_icons/cat_flag.png"
                alt="Bandera de Catalunya - Canviar idioma a Català" />
              <span>CAT</span>
            </router-link>
            <router-link to="/en" role="menuitem" aria-label="Switch to English" @click="isLangMenuOpen = false">
              <img class="flag" src="../assets/images/Web_icons/uk_flag.png"
                alt="UK Flag - Switch language to English" />
              <span>ENG</span>
            </router-link>
            <router-link to="/es" role="menuitem" aria-label="Cambiar a Español" @click="isLangMenuOpen = false">
              <img class="flag" src="../assets/images/Web_icons/es_flag.png"
                alt="Bandera de España - Cambiar idioma a Español" />
              <span>ESP</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <main role="main">
      <article itemscope itemtype="https://schema.org/WebApplication">
        <section aria-labelledby="what-is-bitspace">
          <VideoSection :title="t('what_is_bitspace')" :text="t('what_is_bitspace_text')"
            videoSrc="https://www.youtube.com/watch?v=Qwq4Hw9aljQ" backgroundColor="#FFD8CF" />
        </section>

        <section aria-labelledby="how-it-works">
          <InfoSectionLeft :title="t('how_it_works')" :text="t('how_it_works_text')" :imageSrc="bitLeyendoGif"
            backgroundColor="#FFE4DD" />
        </section>

        <section aria-labelledby="what-about-bits">
          <InfoSectionRight :title="t('what_about_bits')" :text="t('what_about_bits_text')" imageSrc=""
            :image-src="gerardLlorandoGif" backgroundColor="#FFD8CF" />
        </section>

        <section aria-labelledby="what-about-space">
          <InfoSectionLeft :title="t('what_about_space')" :text="t('what_about_space_text')" :imageSrc="casa"
            backgroundColor="#FFE4DD" />
        </section>

        <section aria-labelledby="team">
          <EquipPetit :title="t('team_title')" backgroundColor="#FFD8CF" />
        </section>

        <CreaTuBit />

        <section aria-labelledby="collaborate">
          <Collaborate id="collaborate" :title="t('collaborate_title')" backgroundColor="#FFE4DD" />
        </section>

        <hr aria-hidden="true">
        <section aria-labelledby="waitlist">
          <Formulario id="waitlist" style="background-color: aliceblue;" />
        </section>
      </article>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import Carousel from './medium_components/Carousel.vue';
import VideoSection from './medium_components/VideoSection.vue'
import Formulario from './Formulario.vue';
import InfoSectionLeft from './medium_components/InfoSectionLeft.vue';
import InfoSectionRight from './medium_components/InfoSectionRight.vue';
import Collaborate from './medium_components/Collaborate.vue';
import EquipPetit from './medium_components/EquipPetit.vue';
import SiteFooter from './medium_components/Footer.vue';
import bitLeyendoGif from '@/assets/images/bit-leyendo.gif'
import gerardLlorandoGif from '@/assets/images/Gerard_llorando_project_def.gif'
import casa from '@/assets/images/casa.png'
import CreaTuBit from './CreaTuBit.vue';


const { t, locale } = useI18n()

const isOverCarousel = ref(true)
const carouselWrapper = ref(null)
const isLangMenuOpen = ref(false)
let observer

const currentLangFlag = computed(() => {
  const lang = locale.value
  if (lang === 'ca') {
    return {
      src: './src/assets/images/Web_icons/cat_flag.png',
      alt: 'Bandera de Catalunya - Idioma actual Català',
      label: 'CAT'
    }
  }
  if (lang === 'en') {
    return {
      src: './src/assets/images/Web_icons/uk_flag.png',
      alt: 'UK Flag - Current language English',
      label: 'ENG'
    }
  }
  // default to Spanish
  return {
    src: './src/assets/images/Web_icons/es_flag.png',
    alt: 'Bandera de España - Idioma actual Español',
    label: 'ESP'
  }
})

function scrollToCollaborate() {
  const el = document.getElementById('collaborate')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el.focus({ preventScroll: true })
  }
}

function scrollToWaitlist() {
  const el = document.getElementById('waitlist')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el.focus({ preventScroll: true })
  }
}

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      // If carousel is at least partially visible, keep navbar blue
      isOverCarousel.value = entry.isIntersecting
    },
    {
      root: null,
      threshold: 0.1
    }
  )

  if (carouselWrapper.value) {
    observer.observe(carouselWrapper.value)
  }
})

onBeforeUnmount(() => {
  if (observer && carouselWrapper.value) {
    observer.unobserve(carouselWrapper.value)
  }
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.home-container {
  background-color: #FFE4DD;
  min-height: 100vh;
  font-family: sans-serif;
  color: #333;
}

#nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  padding-bottom: 10px;
  padding-top: 5px;
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.nav-over-carousel {
  /* fully transparent over the carousel */
  background-color: transparent;

}

.nav-after-carousel {
  background-color: #fcdcd4;
  /* solid pink after carousel */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

#nb-BitSpace-logo {
  display: inline-flex;
  align-items: center;
  padding: 0;
  background-color: transparent;
}

#nb-BitSpace-logo:hover {
  background-color: transparent;
}

.bitspace-logo {
  max-height: 60px;
  width: auto;
  display: block;
}

#nb-web-menus {
  display: flex;
  gap: 2rem;
}

.nav-item {
  position: relative;
}

.nav-submenu {
  position: absolute;
  top: 100%;
  left: 0;

  width: fit-content;
  min-width: 150px;
  padding: 1rem 1rem;

  background-color: #ffffff;

  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  font-size: 10px;
  display: none;
  gap: 0.5rem;
  z-index: 1100;
}

.nav-item-games:hover .nav-submenu,
.nav-item-team:hover .nav-submenu,
.nav-item-collaborate:hover .nav-submenu {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}

.nav-submenu-item {
  border: none;
  background: transparent;
  text-align: left;
  padding: 0.35rem 0.6rem;
  font-size: 1.1rem;
  cursor: pointer;
  color: #333;
}

.nav-submenu-item:hover {
  background-color: #ffe4dd;
}

.nav-button {
  min-width: 90px;
  border: none;
  background: transparent;
  color: #333;
  margin-top: 5px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
}

.nav-button:focus-visible {
  outline: 2px solid #333;
  outline-offset: 2px;
}

.nav-language {
  margin-top: 5px;
  position: relative;
}

.nav-lang-toggle {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.25rem 0.4rem;
}

.nav-lang-toggle:focus-visible {
  outline: 2px solid #333;
  outline-offset: 2px;
}

.nav-lang-menu {
  position: absolute;
  right: 0;
  top: 115%;
  min-width: 140px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.35rem 0.25rem;
  display: flex;
  flex-direction: column;
  z-index: 1100;
}

.nav-lang-menu a {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.5rem;
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
}

.nav-lang-menu a:hover {
  background-color: #ffe4dd;
}

.flag {
  width: 18px;
  height: auto;
}
</style>
