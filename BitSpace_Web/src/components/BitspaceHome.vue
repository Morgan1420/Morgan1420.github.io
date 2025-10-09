<template>
  <div class="home-container">
    <header class="header">
      <div class="bit-background">
        <div v-for="(row, rowIndex) in rowsOfBits" :key="'row-' + rowIndex" class="bit-scroll-track">
          <img v-for="bit in row" :key="'r' + rowIndex + '-1-' + bit.id" :src="bit.src" alt="Bit character" class="bit-bg-image" />
          <img v-for="bit in row" :key="'r' + rowIndex + '-2-' + bit.id" :src="bit.src" alt="Bit character" class="bit-bg-image" />
        </div>
      </div>
      <div class="header-content">
        <img src="../assets/images/Titol.png" alt="">
      </div>
    </header>

    <main>
      <VideoSection
        title="Què és BitSpace?"
        text="BitSpace és un entorn virtual accessible via aplicació mòbil i web, que es basa a cuidar mascotes digitals (els 'Bits'), de forma similar a jocs com Pou o Tamagotchi. A diferència d’aquests, a BitSpace, el benestar del Bit està directament lligat als hàbits de cura personal de l'usuari. 

En altres paraules: En cuidar la teva mascota t’estàs cuidant a tu mateix.
En unes altres paraules encara: El teu Bit actua de mirall de la teva salut “digital”."
        videoSrc="https://www.youtube.com/watch?v=Qwq4Hw9aljQ"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VideoSection from './VideoSection.vue'

const bitImageNames = [
  'Bit_1.png', 'Bit_10.png', 'Bit_11.png', 'Bit_12.png', 'Bit_13.png',
  'Bit_14.png', 'Bit_15.png', 'Bit_16.png', 'Bit_17.png', 'Bit_18.png',
  'Bit_19.png', 'Bit_2.png', 'Bit_20.png', 'Bit_21_malo.png', 'Bit_22_malo.png',
  'Bit_23.png', 'Bit_24.png', 'Bit_25.png', 'Bit_3.png', 'Bit_4.png',
  'Bit_5.png', 'Bit_6.png', 'Bit_7.png', 'Bit_8.png', 'Bit_9.png',
  'Bit_jan_llegint.png', 'Bit_triste.png', 'Lluna_Bit_sin_fondo.png'
];

const rowsOfBits = ref([]);

const generateBackgroundBits = () => {
  const allRows = [];
  for (let r = 0; r < 5; r++) {
    const newRow = [];
    for (let i = 0; i < 50; i++) {
      const randomIndex = Math.floor(Math.random() * bitImageNames.length);
      const imageName = bitImageNames[randomIndex];
      newRow.push({
        id: i,
        src: new URL(`../assets/images/Bits Background/${imageName}`, import.meta.url).href
      });
    }
    allRows.push(newRow);
  }
  rowsOfBits.value = allRows;
};

onMounted(() => {
  generateBackgroundBits();
});
</script>

<style scoped>
.home-container {
  background-color: #FFD8CF;
  min-height: 100vh;
  font-family: sans-serif;
  color: #333;
}

.header {
  position: relative;
  text-align: center;
  padding: 6rem 2rem;
  background-color: #FFE4DD;
  overflow: hidden;
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
}

.header-content {
  position: relative;
  z-index: 2;
  background-color: #FFE4DD;
  padding: 2rem;
  border-radius: 15px;
  display: inline-block;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.header h1 {
  font-size: 3rem;
  font-weight: bold;
}

.header p {
  font-size: 1.75rem;
}

@media (max-width: 768px) {
  .header {
    padding: 4rem 1rem;
  }
  .header h1 {
    font-size: 2rem;
  }
  .header p {
    font-size: 1.2rem;
  }
}
</style>
