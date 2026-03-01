<template>
  <div class="home-container">
    <div ref="carouselWrapper">
      <Carousel @go-to-collaborate="scrollToCollaborate" @go-to-waitlist="scrollToWaitlist" />
    </div>

    <NavBar :is-over-carousel="isOverCarousel" />

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

        <CreaTuBit></CreaTuBit>
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
import NavBar from './medium_components/navBar.vue';
import VideoSection from './medium_components/VideoSection.vue'
import Formulario from './complex_components/Formulario.vue';
import InfoSectionLeft from './medium_components/InfoSectionLeft.vue';
import InfoSectionRight from './medium_components/InfoSectionRight.vue';
import Collaborate from './medium_components/Collaborate.vue';
import EquipPetit from './medium_components/EquipPetit.vue';
import SiteFooter from './medium_components/Footer.vue';
import bitLeyendoGif from '@/assets/images/bit-leyendo.gif'
import gerardLlorandoGif from '@/assets/images/Gerard_llorando_project_def.gif'
import casa from '@/assets/images/casa.png'
import CreaTuBit from './complex_components/CreaTuBit.vue';


const { t, locale } = useI18n()

const isOverCarousel = ref(true)
const carouselWrapper = ref(null)
let observer

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
</style>
