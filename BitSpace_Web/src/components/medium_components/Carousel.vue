<template>
  <header class="header">
    <div class="bit-background">
      <div v-for="(row, rowIndex) in rowsOfBits" :key="'row-' + rowIndex" class="bit-scroll-track">
        <img v-for="bit in row" :key="'r' + rowIndex + '-1-' + bit.id" :src="bit.src" alt="Bit character" class="bit-bg-image" />
        <img v-for="bit in row" :key="'r' + rowIndex + '-2-' + bit.id" :src="bit.src" alt="Bit character" class="bit-bg-image" />
      </div>
    </div>
    <div class="header-content">
      <img src="../../assets/images/Titol.png" alt="">
      <div class="buttons">
        <fancyButton buttonText="!! Respongueu a les ENQUESTES !!" @click="$emit('go-to-collaborate')" center="true" />
        <fancyButton buttonText="!! Apunta't a la LLISTA D'ESPERA !!" @click="$emit('go-to-waitlist')" center="true" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import fancyButton from '../small_components/fancyButton.vue'

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
  for (let r = 0; r < 6; r++) {
    const newRow = [];
    for (let i = 0; i < 50; i++) {
      const randomIndex = Math.floor(Math.random() * bitImageNames.length);
      const imageName = bitImageNames[randomIndex];
      newRow.push({
        id: i,
        src: new URL(`../../assets/images/Bits Background/${imageName}`, import.meta.url).href
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
  box-shadow: 0 10px 24px rgba(0,0,0,0.12);
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
    padding: 4rem 1rem;
  }
  .header h1 {
    font-size: 2rem;
  }
  .header p {
    font-size: 1.2rem;
  }

  .header-content {
    padding: 1rem;
    max-width: 320px;
  }

  .header-content img {
    max-width: 280px;
  }

}


</style>