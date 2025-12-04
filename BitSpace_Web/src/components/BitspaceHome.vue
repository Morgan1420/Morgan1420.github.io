<template>
  <div class="home-container">
  <Carousel @go-to-collaborate="scrollToCollaborate" @go-to-waitlist="scrollToWaitlist"/>
    <main role="main">
      <article itemscope itemtype="https://schema.org/WebApplication">
      <section aria-labelledby="what-is-bitspace">
      <VideoSection
        :title="t('what_is_bitspace')"
        :text="t('what_is_bitspace_text')"
        videoSrc="https://www.youtube.com/watch?v=Qwq4Hw9aljQ"
        backgroundColor="#FFD8CF"
      />
      </section>

      <section aria-labelledby="how-it-works">
      <InfoSectionLeft
        :title="t('how_it_works')"
        :text="t('how_it_works_text')"
        imageSrc=""
        backgroundColor="#FFE4DD"
      />
      </section>

      <section aria-labelledby="what-about-bits">
      <InfoSectionRight
        :title="t('what_about_bits')"
        :text="t('what_about_bits_text')"
        imageSrc=""
        backgroundColor="#FFD8CF"
      />
      </section>

      <section aria-labelledby="what-about-space">
      <InfoSectionLeft
        :title="t('what_about_space')"
        :text="t('what_about_space_text')"
        imageSrc=""
        backgroundColor="#FFE4DD"
      />
      </section>

      <section aria-labelledby="team">
      <EquipPetit
        :title="t('team_title')"
        backgroundColor="#FFD8CF"
      />
      </section>

      <section aria-labelledby="collaborate">
      <Collaborate
        id="collaborate"
        :title="t('collaborate_title')"
        backgroundColor="#FFE4DD"
      />
      </section>
      
      <hr aria-hidden="true">
      <section aria-labelledby="waitlist">
      <Formulario id="waitlist" style="background-color: aliceblue;"/>
      </section>
      </article>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { onMounted, onUnmounted } from 'vue'
import Carousel from './medium_components/Carousel.vue';
import VideoSection from './medium_components/VideoSection.vue'
import Formulario from './Formulario.vue';
import InfoSectionLeft from './medium_components/InfoSectionLeft.vue';
import InfoSectionRight from './medium_components/InfoSectionRight.vue';
import Collaborate from './medium_components/Collaborate.vue';
import EquipPetit from './medium_components/EquipPetit.vue';
import SiteFooter from './medium_components/Footer.vue';

const { t } = useI18n()

// Schema.org Structured Data
const schemaWebApplication = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "BitSpace",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "iOS, Android",
  "description": "BitSpace és un entorn virtual accessible via aplicació mòbil que es basa a cuidar mascotes digitals (els 'Bits'). Al cuidar de la teva mascota, t'estàs cuidant a tu mateix.",
  "url": "https://morgan1420.github.io",
  "author": {
    "@type": "Organization",
    "name": "BitSpace Team",
    "email": "info@bitspace.es"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  }
}

const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BitSpace",
  "url": "https://morgan1420.github.io",
  "logo": "https://morgan1420.github.io/src/assets/logoBit.ico",
  "description": "Digital Health - Cuida tu mascota digital, cuídate a ti mismo",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "info@bitspace.es",
    "contactType": "Customer Service"
  },
  "sameAs": [
    "https://www.instagram.com/bitspace_app",
    "https://www.linkedin.com/company/bitspace"
  ]
}

let schemaScripts = []

onMounted(() => {
  // Insertar Schema.org scripts en el head
  const script1 = document.createElement('script')
  script1.type = 'application/ld+json'
  script1.textContent = JSON.stringify(schemaWebApplication)
  document.head.appendChild(script1)
  schemaScripts.push(script1)

  const script2 = document.createElement('script')
  script2.type = 'application/ld+json'
  script2.textContent = JSON.stringify(schemaOrganization)
  document.head.appendChild(script2)
  schemaScripts.push(script2)
})

onUnmounted(() => {
  // Limpiar los scripts cuando el componente se desmonte
  schemaScripts.forEach(script => {
    if (script.parentNode) {
      script.parentNode.removeChild(script)
    }
  })
  schemaScripts = []
})

function scrollToCollaborate () {
  const el = document.getElementById('collaborate')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el.focus({ preventScroll: true })
  }
}

function scrollToWaitlist () {
  const el = document.getElementById('waitlist')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el.focus({ preventScroll: true })
  }
}
</script>

<style scoped>

.home-container {
  background-color: #FFE4DD;
  min-height: 100vh;
  font-family: sans-serif;
  color: #333;
}


</style>
