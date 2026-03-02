<template>
  <header class="header">
    <div class="bit-background">
      <div v-for="(row, rowIndex) in rowsOfBits" :key="'row-' + rowIndex" class="bit-scroll-track"
        :style="{ animationDuration: animationDuration }">
        <img v-for="bit in row" :key="'r' + rowIndex + '-1-' + bit.id" :src="bit.src" alt="Bit character"
          class="bit-bg-image" draggable="false" />
        <img v-for="bit in row" :key="'r' + rowIndex + '-2-' + bit.id" :src="bit.src" alt="Bit character"
          class="bit-bg-image" draggable="false" />
      </div>
    </div>
    <div class="header-content">
      <img src="../../assets/images/Titol.png" alt="" draggable="false">
      <div class="buttons">
        <fancyButton :buttonText="$t('prototype_access')" @click="openPrototype" :center="true" />
        <fancyButton :buttonText="t('carousel_button_waitlist')" @click="$emit('go-to-waitlist')" :center="true" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import fancyButton from '../small_components/fancyButton.vue'

const { t, locale } = useI18n()

// Prototype link and opener
const prototype_link = computed(() => {
  const loc = locale && locale.value ? String(locale.value).toLowerCase() : ''
  if (loc.startsWith('en')) return 'https://prototype.bitspace.es/en'
  if (loc.startsWith('es')) return 'https://prototype.bitspace.es/es'
  return 'https://prototype.bitspace.es/ca'
})

function openPrototype() {
  window.open(prototype_link.value, '_blank', 'noopener,noreferrer')
}

// Define los eventos que este componente puede emitir
defineEmits(['go-to-collaborate', 'go-to-waitlist'])

const bitImageNames = [
  'Bit_1.png', 'Bit_10.png', 'Bit_11.png', 'Bit_12.png', 'Bit_13.png',
  'Bit_14.png', 'Bit_15.png', 'Bit_16.png', 'Bit_17.png', 'Bit_18.png',
  'Bit_19.png', 'Bit_2.png', 'Bit_20.png', 'Bit_21_malo.png', 'Bit_22_malo.png',
  'Bit_23.png', 'Bit_24.png', 'Bit_25.png', 'Bit_3.png', 'Bit_4.png',
  'Bit_5.png', 'Bit_6.png', 'Bit_7.png', 'Bit_8.png', 'Bit_9.png',
  'Bit_jan_llegint.png', 'Bit_triste.png', 'Lluna_Bit_sin_fondo.png'
];

const rowsOfBits = ref([])
const animationDuration = ref('180s')

function buildRows(rowsCount, itemsCount) {
  const allRows = []
  for (let r = 0; r < rowsCount; r++) {
    const newRow = []
    for (let i = 0; i < itemsCount; i++) {
      const randomIndex = Math.floor(Math.random() * bitImageNames.length)
      const imageName = bitImageNames[randomIndex]
      newRow.push({
        id: i,
        src: new URL(`../../assets/images/Bits_Background/${imageName}`, import.meta.url).href
      })
    }
    allRows.push(newRow)
  }
  rowsOfBits.value = allRows
}

function setForViewport(isMobile) {
  if (isMobile) {
    // fewer rows and items, faster animation on phones
    buildRows(7, 20)
    animationDuration.value = '40s'
  } else {
    buildRows(6, 50)
    animationDuration.value = '180s'
  }
}

let mql
function onMediaChange(e) {
  setForViewport(e.matches)
}

onMounted(() => {
  mql = window.matchMedia('(max-width: 768px)')
  // initial setup: pass true if mobile
  setForViewport(mql.matches)
  // listen for changes and update rows/speed dynamically
  if (mql.addEventListener) {
    mql.addEventListener('change', onMediaChange)
  } else if (mql.addListener) {
    mql.addListener(onMediaChange)
  }
})

onBeforeUnmount(() => {
  if (!mql) return
  if (mql.removeEventListener) {
    mql.removeEventListener('change', onMediaChange)
  } else if (mql.removeListener) {
    mql.removeListener(onMediaChange)
  }
})

</script>

<style scoped>
.header {
  position: relative;
  text-align: center;
  min-height: 100vh;
  background-color: #FFE4DD;
  align-items: center;
  justify-content: center;
  display: flex;
  overflow: hidden;
}

.header h1 {
  font-size: 3rem;
  font-weight: bold;
}

.header p {
  font-size: 1.75rem;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

.bit-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  opacity: 0.4;
  z-index: 1;
  background-color: #FFE4DD;
  overflow: hidden;
}

.bit-scroll-track:nth-child(even) {
  animation-direction: reverse;
}

.bit-scroll-track {
  display: flex;
  animation: scroll 180s linear infinite;
}

.bit-bg-image {
  width: 120px;
  height: 120px;
  margin: 0 10px;
  flex-shrink: 0;
  user-select: none;
  pointer-events: none;
}

/* make image sit on top and buttons stack below it */
.header-content {
  position: relative;
  z-index: 2;
  background-color: #FFE4DD;
  padding: 1rem 1.75rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
}

/* keep header image responsive and above the buttons */
.header-content img {
  display: block;
  width: 100%;
  height: auto;
}

/* prettier buttons that fit under the image */
.buttons {
  padding: 0.6rem 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-top: -40px;
  margin-bottom: 20px;
}

.buttons fancy-button {
  width: 45%;
}

@media (max-width: 768px) {
  .header {
    padding: 1rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .header p {
    font-size: 1.2rem;
  }

  .bit-bg-image {
    width: 60px;
    height: 60px;
    margin: 0 10px;
    flex-shrink: 0;
  }


  .header-content {

    padding: 1rem;
    padding-bottom: 0;
    max-width: 320px;
    height: fit-content;
    justify-content: center;
  }

  .header-content img {
    size: 100%;
  }

  .buttons {
    /* Hide from view for now */
    visibility: hidden;
    height: 0;
    padding: 0;
    margin: 0;
  }

}
</style>