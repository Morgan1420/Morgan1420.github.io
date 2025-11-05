<script>
export default {
  name: 'EquipPetit'
}
</script>

<template>
  <div class="container" :style="{ backgroundColor: backgroundColor }">
    <h2>L'Equip de BitSpace</h2>
    <div class="equip">
      
      <div class="membre">
        <img class="imatge" src="@/assets/images/Equip/Gerard.png" alt="Gerard Garcia Gross" />
        <img class="imatge_bit_right" src="@/assets/images/Bits_Background/Gerard_Bit_sin_fondo.png" alt="Bit_Gerard" />
        <div class="nom">Gerard Garcia Gross</div>
        <div class="estudis">Enginyer</div>
        <!-- <div class="bottom_text">Fan #1 del Karting i de fer projectes personals</div> -->
      </div>

      <div class="membre">
        <img class="imatge" src="@/assets/images/Equip/anulL.png" alt="Lluna Lara Valle" />
        <img class="imatge_bit_right" src="@/assets/images/Bits_Background/Lluna_Bit_sin_fondo.png" alt="Bit_Lluna" />
        <div class="nom">Lluna Lara Valle</div>
        <div class="estudis">Infermera <div class="small_wording">(en procés)</div></div>
        <!-- <div class="bottom_text">Apassionada de la lectura i dels cavalls</div> -->
      </div>

      <div class="membre">
        <img class="imatge" src="@/assets/images/Equip/Jan.png" alt="Jan Moran Ricardo" />
        <img class="imatge_bit_right" src="@/assets/images/Bits_Background/Bit_jan_llegint.png" alt="Bit_Jan" />
        <div class="nom">Jan Moran Ricardo</div>
        <div class="estudis">Enginyer</div>
        <!-- <div class="bottom_text">Amant de la música i de les coses ben fetes</div> -->
      </div>

      
    </div>
  </div>
</template>

<script setup>
defineProps({
  backgroundColor: {
    type: String,
    default: '#FFFFFF'
  },
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 4rem 2rem;
}


h2 {
  margin-top: 1rem;
  font-size: 2.5rem;
}
p {
  font-size: 1.4rem;
  line-height: 1.6;
}

.equip {
  width: 80%;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.membre {
  width: 23%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.imatge {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.imatge_bit_right {
  width: 125px;
  height: 125px;
  margin-top: -100px;
  margin-right: -100px;
}
.imatge_bit_left {
  width: 125px;
  height: auto;
  margin-top: -100px;
  margin-left: -100px;
}

.nom {
  font-size: 1.5rem;
  font-weight: bold;
}
.estudis {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
}
.small_wording {
  margin-left: 10px;
  font-size: 1rem;
}
.bottom_text {
  font-size: 1.2rem;
  color: #666;
}

@media (max-width: 1000px) {
  .container {
    padding: 2rem 1rem;
    flex-direction: column;
  }
  h2 {
    font-size: 2rem;
  }
  .equip {
    width: 100%;
    flex-direction: column;
    gap: 3rem;
  }
  .membre {
    width: 70%;
  }
  .small_wording {
    font-size: 0rem; /* Hide the small wording on smaller screens */
  }

}
</style>