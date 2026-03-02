<template>
  <div class="crea-tu-bit-container">
    <h1>{{ t('create_your_bit') }}</h1>

    <div class="bit-display">
      <!-- Bit con capas superpuestas -->
      <div class="bit-container">
        <img :src="bitBasicImage" alt="Bit Básico" class="bit-layer bit-base" />
        <img :src="currentOutfitImage" :alt="`Ropa ${currentOutfitIndex + 1}`" class="bit-layer bit-outfit" />
        <img :src="currentHairImage" :alt="`Pelo ${currentHairIndex + 1}`" class="bit-layer bit-hair" />
      </div>

      <!-- Controles de personalización -->
      <div class="customization-controls">
        <!-- Selector de Ropa -->
        <div class="selector-section">
          <h2>{{ t('choose_outfit') }}</h2>
          <div class="selector">
            <button @click="changeSelection('outfit', -1)" class="arrow-button" :disabled="currentOutfitIndex === 0"
              aria-label="Ropa anterior">
              &#9664;
            </button>

            <div class="options-preview" ref="outfitOptionsRef">
              <div v-for="(outfit, index) in ropaImages" :key="`outfit-${index}`" class="option-item" :class="{
                'active': index === currentOutfitIndex,
                'adjacent': Math.abs(index - currentOutfitIndex) === 1
              }" @click="currentOutfitIndex = index">
                <div class="option-image-wrapper">
                  <img :src="bitBasicImage" alt="Base" class="option-base" />
                  <img :src="outfit" :alt="`Ropa ${index + 1}`" class="option-layer" />
                </div>
              </div>
            </div>

            <button @click="changeSelection('outfit', 1)" class="arrow-button"
              :disabled="currentOutfitIndex === totalOutfits - 1" aria-label="Ropa siguiente">
              &#9654;
            </button>
          </div>
        </div>

        <!-- Selector de Pelo -->
        <div class="selector-section">
          <h2>{{ t('choose_hair') }}</h2>
          <div class="selector">
            <button @click="changeSelection('hair', -1)" class="arrow-button" :disabled="currentHairIndex === 0"
              aria-label="Pelo anterior">
              &#9664;
            </button>

            <div class="options-preview" ref="hairOptionsRef">
              <div v-for="(hair, index) in hairImages" :key="`hair-${index}`" class="option-item" :class="{
                'active': index === currentHairIndex,
                'adjacent': Math.abs(index - currentHairIndex) === 1
              }" @click="currentHairIndex = index">
                <div class="option-image-wrapper">
                  <img :src="bitBasicImage" alt="Base" class="option-base" />
                  <img :src="hair" :alt="`Pelo ${index + 1}`" class="option-layer" />
                </div>
              </div>
            </div>

            <button @click="changeSelection('hair', 1)" class="arrow-button"
              :disabled="currentHairIndex === totalHairs - 1" aria-label="Pelo siguiente">
              &#9654;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Importar imagen del Bit Básico
import bitBasicImage from '@/assets/images/Crea_Tu_Bit/Basic.png'

// Importar imágenes de ropa
import ropa1 from '@/assets/images/Crea_Tu_Bit/Ropa/Ropa_1.png'
import ropa2 from '@/assets/images/Crea_Tu_Bit/Ropa/Ropa_2.png'
import ropa3 from '@/assets/images/Crea_Tu_Bit/Ropa/Ropa_3.png'
import ropa4 from '@/assets/images/Crea_Tu_Bit/Ropa/Ropa_4.png'

// Importar imágenes de pelo
import pelo1 from '@/assets/images/Crea_Tu_Bit/Pelo/Pelo_1.png'
import pelo2 from '@/assets/images/Crea_Tu_Bit/Pelo/Pelo_2.png'
import pelo3 from '@/assets/images/Crea_Tu_Bit/Pelo/Pelo_3.png'
import pelo4 from '@/assets/images/Crea_Tu_Bit/Pelo/Pelo_4.png'

// Arrays de opciones
const ropaImages = [ropa1, ropa2, ropa3, ropa4]
const hairImages = [pelo1, pelo2, pelo3, pelo4]

// Estado reactivo
const currentOutfitIndex = ref(0)
const currentHairIndex = ref(0)

// Referencias a los contenedores de opciones
const outfitOptionsRef = ref(null)
const hairOptionsRef = ref(null)

// Totales
const totalOutfits = ropaImages.length
const totalHairs = hairImages.length

// Imágenes actuales
const currentOutfitImage = computed(() => ropaImages[currentOutfitIndex.value])
const currentHairImage = computed(() => hairImages[currentHairIndex.value])

// Función genérica de cambio de selección
function changeSelection(type, direction) {
  if (type === 'outfit') {
    const newIndex = currentOutfitIndex.value + direction
    if (newIndex >= 0 && newIndex < totalOutfits) {
      currentOutfitIndex.value = newIndex
    }
  } else if (type === 'hair') {
    const newIndex = currentHairIndex.value + direction
    if (newIndex >= 0 && newIndex < totalHairs) {
      currentHairIndex.value = newIndex
    }
  }
}

// Función para hacer scroll al elemento seleccionado
function scrollToSelected(containerRef, index) {
  nextTick(() => {
    if (containerRef.value) {
      const container = containerRef.value
      const items = container.children
      if (items[index]) {
        items[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  })
}

// Watchers para hacer scroll cuando cambia la selección
watch(currentOutfitIndex, (newIndex) => {
  scrollToSelected(outfitOptionsRef, newIndex)
})

watch(currentHairIndex, (newIndex) => {
  scrollToSelected(hairOptionsRef, newIndex)
})
</script>

<style scoped>
.crea-tu-bit-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background-color: #FFD8CF;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: bold;
}

.bit-display {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 4rem;
  width: 100%;
}

.bit-container {
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

/* Sistema de capas para el Bit */
.bit-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

.bit-base {
  z-index: 1;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.bit-outfit {
  z-index: 2;
}

.bit-hair {
  z-index: 3;
}

/* Controles de personalización */
.customization-controls {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 400px;
  flex-shrink: 0;
}

.selector-section {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.selector-section h2 {
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 1rem;
  text-align: center;
}

.selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.options-preview {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem;
  max-width: 100%;
  scrollbar-width: thin;
  scrollbar-color: #FF6B6B #f0f0f0;
}

.options-preview::-webkit-scrollbar {
  height: 6px;
}

.options-preview::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 3px;
}

.options-preview::-webkit-scrollbar-thumb {
  background: #FF6B6B;
  border-radius: 3px;
}

.option-item {
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  border: 2px solid transparent;
}

.option-item:hover {
  transform: translateY(-4px);
  background-color: rgba(255, 255, 255, 0.5);
}

.option-item.active {
  border-color: #FF6B6B;
  background-color: rgba(255, 107, 107, 0.1);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.option-item.adjacent {
  opacity: 0.9;
}

.option-image-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.option-base,
.option-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

.option-base {
  z-index: 1;
}

.option-layer {
  z-index: 2;
}

.arrow-button {
  background-color: #FF6B6B;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.arrow-button:hover:not(:disabled) {
  background-color: #FF5252;
  transform: scale(1.1);
}

.arrow-button:active:not(:disabled) {
  transform: scale(0.95);
}

.arrow-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.5;
}

.counter {
  font-size: 1.2rem;
  color: #666;
  font-weight: 600;
  min-width: 60px;
  text-align: center;
}

/* Responsive */
@media (max-width: 1024px) {
  .bit-display {
    gap: 2rem;
  }

  .bit-container {
    width: 350px;
    height: 350px;
  }

  .customization-controls {
    max-width: 350px;
  }
}

@media (max-width: 768px) {
  .crea-tu-bit-container {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .bit-display {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .bit-container {
    width: 280px;
    height: 280px;
  }

  .customization-controls {
    gap: 1.5rem;
    max-width: 100%;
  }

  .selector-section {
    padding: 1rem;
  }

  .selector-section h2 {
    font-size: 1.3rem;
  }

  .selector {
    gap: 1rem;
  }

  .arrow-button {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .counter {
    font-size: 1rem;
    min-width: 50px;
  }
}

@media (max-width: 480px) {
  .crea-tu-bit-container {
    padding: 0.5rem;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .bit-display {
    gap: 1.5rem;
  }

  .bit-container {
    width: 240px;
    height: 240px;
  }

  .customization-controls {
    gap: 1rem;
  }

  .selector-section {
    padding: 0.75rem;
  }

  .selector-section h2 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }

  .selector {
    gap: 0.75rem;
  }

  .arrow-button {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .counter {
    font-size: 0.9rem;
    min-width: 45px;
  }
}

@media (max-width: 360px) {
  h1 {
    font-size: 1.3rem;
  }

  .bit-container {
    width: 200px;
    height: 200px;
  }

  .selector-section h2 {
    font-size: 1rem;
  }

  .arrow-button {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
}
</style>
