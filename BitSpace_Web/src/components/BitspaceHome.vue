<template>
  <div class="home-container">
    <div ref="carouselWrapper">
      <Carousel @go-to-collaborate="scrollToCollaborate" @go-to-waitlist="scrollToWaitlist" />
    </div>

    <NavBar :is-over-carousel="isOverCarousel" />

    <main role="main">
      <article itemscope itemtype="https://schema.org/WebApplication">

        <section class="MWC-section" aria-labelledby="MWC">
          <h1>Visita'ns MWC Barcelona</h1>

          <div class="MWC-container-section">

            <div class="MWC-container">
              <h2>Dimarts 3</h2>
              <h3>Dia de pitch</h3>
              <div class="MWC-hotirzontal-box">
                <div><img src="@/assets/images/Web_icons/ubi_icon.png" alt="Ubicació"></div>
                <p>CATALONIA - Hall 8.1</p>
              </div>
              <div class="MWC-hotirzontal-box">
                <div><img src="@/assets/images/Web_icons/clock.png" alt="Hora"></div>
                <p>14:30 - 16:00</p>
              </div>

            </div>

            <div class="MWC-container">
              <h2>Dimecres</h2>
              <div class="MWC-hotirzontal-box">
                <div>icona time</div>
                <p>Dimecres 4 Mar · 10:00</p>
              </div>
              <div class="MWC-hotirzontal-box">
                <div>icona ubi</div>
                <p>Pitching Point - Hall 8.1</p>
              </div>
            </div>

            <div class="MWC-container">
              <h2>Vine a Stand</h2>
              <div class="MWC-hotirzontal-box">
                <div>icona ubi</div>
                <p>Pitching Point - Hall 8.1</p>
              </div>
              <div class="MWC-hotirzontal-box">
                <div>icona ubi</div>
                <p>Pitching Point - Hall 8.1</p>
              </div>
            </div>

          </div>

        </section>

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


        <section aria-labelledby="waitlist">
          <Formulario id="waitlist" />
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

.MWC-section {
  width: 90%;
  padding-inline: 5%;

  display: flex;
  flex-direction: column;
}

.MWC-container-section {

  display: flex;
  flex-direction: row;
  align-items: space-around;
  gap: 1rem;

  margin: 0.5rem 0;
}

.MWC-container {
  width: 30%;

  background-color: #FFD8CF;

  padding: 1.5rem;
  border-radius: 8px;
  max-width: 800px;
}
</style>
