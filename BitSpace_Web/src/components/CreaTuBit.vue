<template>
  <div class="crea-tu-bit-container">
    <h1>{{ t('create_your_bit') }}</h1>
    
    <div class="bit-display">
      <!-- Bit con ropa superpuesta -->
      <div class="bit-container">
        <img 
          :src="bitBasicImage" 
          alt="Bit Básico" 
          class="bit-image"
        />
        <img 
          :src="currentOutfitImage" 
          :alt="`Ropa ${currentOutfitIndex + 1}`"
          class="ropa-overlay"
        />
      </div>
      
      <!-- Controles de ropa -->
      <div class="ropa-section">
        <h2>{{ t('choose_outfit') }}</h2>
        
        <div class="ropa-selector">
          <!-- Flecha izquierda -->
          <button 
            @click="previousOutfit" 
            class="arrow-button"
            :disabled="currentOutfitIndex === 0"
            aria-label="Anterior"
          >
            &#9664;
          </button>
          
          <p class="outfit-counter">{{ currentOutfitIndex + 1 }} / {{ totalOutfits }}</p>
          
          <!-- Flecha derecha -->
          <button 
            @click="nextOutfit" 
            class="arrow-button"
            :disabled="currentOutfitIndex === totalOutfits - 1"
            aria-label="Siguiente"
          >
            &#9654;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Importar imagen del Bit Básico
import bitBasicImage from '@/assets/images/Crea_Tu_Bit/Basic.png'

// Importar imágenes de ropa
import ropa1 from '@/assets/images/Crea_Tu_Bit/Ropa/Ropa_1.png'
import ropa2 from '@/assets/images/Crea_Tu_Bit/Ropa/Ropa_2.png'
import ropa3 from '@/assets/images/Crea_Tu_Bit/Ropa/Ropa_3.png'
import ropa4 from '@/assets/images/Crea_Tu_Bit/Ropa/Ropa_4.png'

// Array de rutas de ropa
const ropaImages = [ropa1, ropa2, ropa3, ropa4]

// Estado reactivo
const currentOutfitIndex = ref(0)
const totalOutfits = ropaImages.length

// Imagen de ropa actual
const currentOutfitImage = computed(() => ropaImages[currentOutfitIndex.value])

// Funciones de navegación
function nextOutfit() {
  if (currentOutfitIndex.value < totalOutfits - 1) {
    currentOutfitIndex.value++
  }
}

function previousOutfit() {
  if (currentOutfitIndex.value > 0) {
    currentOutfitIndex.value--
  }
}
</script>

<style scoped>
.crea-tu-bit-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background-color: #FFE4DD;
  min-height: 100vh;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: bold;
}

.bit-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.bit-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
}

.bit-image {
  position: absolute;
  max-width: 300px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.ropa-overlay {
  margin-top: 18vh;
  margin-right: 1.4vh;
  position: absolute;
  max-width: 300px;
  height: auto;
  object-fit: contain;
  z-index: 10;
  pointer-events: none;
  width: 65%;
}


.ropa-overlay[alt="Ropa 2"] { 
  margin-top: 15vh;
  margin-right: 1.2vh;
  width: 80%;
}

.ropa-overlay[alt="Ropa 4"] { 
  margin-top: 17.5vh;
  margin-right: 1.8vh;
  width: 67%;
}

.ropa-section {
  width: 100%;
}

.ropa-section h2 {
  font-size: 1.8rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.ropa-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
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

.ropa-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.ropa-image {
  max-width: 250px;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: white;
  padding: 1rem;
}

.outfit-counter {
  font-size: 1.2rem;
  color: #666;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .crea-tu-bit-container {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .bit-image {
    max-width: 200px;
  }

  .ropa-image {
    max-width: 180px;
  }

  .ropa-selector {
    gap: 1rem;
  }

  .arrow-button {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}
</style>
