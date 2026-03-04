<template>
  <div class="home-container">
    <div ref="carouselWrapper">
      <Carousel @go-to-collaborate="scrollToCollaborate" @go-to-waitlist="scrollToWaitlist" />


    </div>


    <NavBar class="nav-bar" :is-over-carousel="isOverCarousel" />

    <section aria-labelledby="waitlist">
      <Formulario id="waitlist" />
    </section>

    <section class="MWC-section" aria-labelledby="MWC">
      <h1>{{ t('mwc_title') }}</h1>

      <div class="MWC-container-section">

        <div class="MWC-container">
          <h2>{{ t('mwc_day1_title') }}</h2>
          <p>{{ t('mwc_day1_desc') }}</p>
          <div class="MWC-hotirzontal-box">
            <div><img src="@/assets/images/Web_icons/ubi_icon.png" alt="Ubicació"></div>
            <p>{{ t('mwc_day1_location') }}</p>
          </div>
          <div class="MWC-hotirzontal-box">
            <div><img src="@/assets/images/Web_icons/clock.png" alt="Hora"></div>
            <p>{{ t('mwc_day1_time') }}</p>
          </div>
        </div>

        <div class="MWC-container" id="current-day-container">
          <h2>{{ t('mwc_day2_title') }}</h2>
          <p>{{ t('mwc_day2_desc') }}</p>
          <div class="MWC-hotirzontal-box">
            <div><img src="@/assets/images/Web_icons/ubi_icon.png" alt="Ubicació"></div>
            <p>{{ t('mwc_day2_location') }}</p>
          </div>
          <div class="MWC-hotirzontal-box">
            <div><img src="@/assets/images/Web_icons/clock.png" alt="Hora"></div>
            <p>{{ t('mwc_day2_time') }}</p>
          </div>
        </div>

        <div class="MWC-container">
          <h2>{{ t('mwc_day3_title') }}</h2>
          <p>{{ t('mwc_day3_desc') }}</p>
          <div class="MWC-hotirzontal-box">
            <div><img src="@/assets/images/Web_icons/ubi_icon.png" alt="Ubicació"></div>
            <p>{{ t('mwc_day3_location') }}</p>
          </div>
          <div class="MWC-hotirzontal-box">
            <div><img src="@/assets/images/Web_icons/clock.png" alt="Hora"></div>
            <p><b>{{ t('mwc_day3_time') }}</b></p>
          </div>
        </div>

      </div>

    </section>
    <div id="prototype">
      <h2>{{ $t('prototype_title') }}</h2>
      <p>BitSpace encara es troba en una fase "early seed" on on encara s'està validant i desenvolupant les bases
        de l'aplicació final.</p>
      <p>A continuació podreu veure doncs un petit prototip web perquè us feu a la idea de com es veurà BitSpace.
        Si teniu qualsevol dubte o opinió no dubteu a contactar-nos a la pesta de contacte.</p>
      <p></p>
      <fancyButton :buttonText="$t('prototype_access')" @click="openPrototype" :center="true" />
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
import fancyButton from './small_components/fancyButton.vue';

const { t, locale } = useI18n()

const isOverCarousel = ref(true)
const carouselWrapper = ref(null)
let observer

const prototype_link = "https://prototype.bitspace.es/ca"

function openPrototype() {
  const url = prototype_link;
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}


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

#current-day-container {
  /* 1. Stronger background to catch the light */
  background: rgba(255, 255, 255, 0.15);

  /* 2. Outer Glow: Uses a mix of magenta and white for a neon effect */
  box-shadow:
    0 0 20px rgba(216, 43, 125, 0.6),
    0 0 40px rgba(216, 43, 125, 0.3),
    inset 0 0 15px rgba(255, 255, 255, 0.2);

  /* 3. Border Highlight: Brightens the edge to make it look "lit" */
  border: 1.5px solid rgba(255, 255, 255, 0.8);

  /* 4. Scale up slightly to physically stand out */
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;

  /* 5. Ensure it sits above other cards */
  z-index: 10;
}

.MWC-section {
  width: 90%;
  padding-inline: 5%;

  display: flex;
  flex-direction: column;

  background: linear-gradient(135deg, #1c0e35 0%, #2e125a 30%, #b81d79 100%);
}

.MWC-section h1 {
  color: white;
  font-size: 2.5rem;
  margin-top: 4rem;
  margin-bottom: 3rem;

  text-align: center;
}

.MWC-container-section {


  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 1rem;

  margin: 0.5rem 0;
  margin-bottom: 5rem;
}

.MWC-container {
  width: 28%;

  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);

  /* Layout padding */
  padding: 24px;
  color: white;
}

.MWC-container p {
  font-size: 1.1rem;
  margin: 0.6rem 0;
  text-align: center;
}

.MWC-container h2 {
  color: white;

  font-size: 1.75rem;
  margin-bottom: 0.5rem;

  text-align: center;
}

.MWC-hotirzontal-box {
  display: flex;

  flex-direction: row;
  align-items: center;
  justify-content: center;


  gap: 0.75rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.MWC-hotirzontal-box img {
  width: 24px;
  height: 24px;
}


#prototype {
  display: none;
  /* hidden on desktop; shown on mobile below */
  flex-direction: column;
  align-items: center;
  justify-content: left;
  padding: 4rem 5rem;
}

#prototype h2 {
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

#prototype p {
  width: 100%;
  font-size: 1.1rem;
  color: #333;
}


/* Responsive Styles for Phones and Tablets */
@media (max-width: 768px) {

  /* Make the main title a bit smaller for mobile screens */
  .MWC-section h1 {
    font-size: 2rem;
    margin-top: 3rem;
    margin-bottom: 2rem;
  }

  /* Stack the cards vertically instead of horizontally */
  .MWC-container-section {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    /* Adds breathing room between stacked cards */
    margin-bottom: 4rem;
  }

  /* Make cards take up the full width instead of 28% */
  .MWC-container {
    width: 100%;
    max-width: 380px;
    /* Prevents cards from getting too stretched on landscape mode */
    box-sizing: border-box;
  }

  /* Slightly reduce the scale of the active day to prevent horizontal scrolling/overflow */
  #current-day-container {
    transform: scale(1.03);
  }

  /* Adjust card title sizes for mobile */
  .MWC-container h2 {
    font-size: 1.5rem;
  }

  /* Adjust text sizes slightly */
  .MWC-container p {
    font-size: 1rem;
  }

  .MWC-container {
    width: 80%;
    /* Reduce padding to fit smaller screens */
  }

  .nav-bar {
    display: none;
  }

  /* Show prototype section on mobile */
  #prototype {
    display: flex;
    padding: 2rem 1.5rem;
  }
}

/* Extra tweak for very small screens (like older iPhones) */
@media (max-width: 480px) {
  .MWC-section {
    width: 95%;
    /* Give a bit more horizontal space to the cards */
    padding-inline: 2.5%;
  }

  .MWC-container {
    width: 80%;
    /* Reduce padding to fit smaller screens */
  }

  .nav-bar {
    display: none;
  }
}
</style>
