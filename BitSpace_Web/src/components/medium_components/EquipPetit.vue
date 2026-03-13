<template>
  <div class="container" :style="{ backgroundColor: backgroundColor }">
    <h2>{{ t('equip_title') }}</h2>
    <div class="equip">

      <div class="membre">
        <div class="imatge-with-bit">
          <img class="imatge" src="@/assets/images/Equip/Jan.png" alt="Jan Moran Ricardo" />
          <img class="imatge_bit_right" src="@/assets/images/Bits_Background/Bit_jan_llegint.png" alt="Bit_Jan" />
        </div>
        <div class="info-membre">
          <div class="nom">{{ t('member_jan_name') }}</div>
          <div class="estudis">{{ t('member_jan_role') }}</div>
        </div>
        <!-- <div class="bottom_text">Amant de la música i de les coses ben fetes</div> -->
      </div>

      <div class="membre">
        <div class="imatge-with-bit">
          <img class="imatge" src="@/assets/images/Equip/Gerard.png" alt="Gerard Garcia Gross" />
          <img class="imatge_bit_right" src="@/assets/images/Bits_Background/Gerard_Bit_sin_fondo.png"
            alt="Bit_Gerard" />
        </div>
        <div class="info-membre">
          <div class="nom">{{ t('member_gerard_name') }}</div>
          <div class="estudis">{{ t('member_gerard_role') }}</div>
        </div><!-- <div class="bottom_text">Fan #1 del Karting i de fer projectes personals</div> -->
      </div>

      <div class="membre">
        <div class="imatge-with-bit">
          <img class="imatge" src="@/assets/images/Equip/anulL.png" alt="Lluna Lara Valle" />
          <img class="imatge_bit_right" src="@/assets/images/Bits_Background/Lluna_Bit_sin_fondo.png" alt="Bit_Lluna" />
        </div>
        <div class="info-membre">
          <div class="nom">{{ t('member_lluna_name') }}</div>
          <div class="estudis">{{ t('member_lluna_role') }}</div>
        </div>
        <!-- <div class="bottom_text">Apassionada de la lectura i dels cavalls</div> -->
      </div>





    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'EquipPetit' })

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

defineProps({
  backgroundColor: {
    type: String,
    default: '#FFFFFF'
  }
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

.imatge-with-bit,
.info-membre {
  display: flex;
  flex-direction: column;
}

.imatge {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.imatge_bit_right {
  width: 125px;
  height: 125px;
  margin-top: -100px;
  margin-left: 100px;
}

.imatge_bit_left {
  width: 125px;
  height: auto;
  margin-top: -100px;
  margin-right: -100px;
}

.nom {
  font-size: 1.5rem;
  font-weight: bold;
}

.estudis {
  display: flex;
  align-items: center;
  font-weight: normal;
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
    font-size: 0rem;
    /* Hide the small wording on smaller screens */
  }
}

@media (max-width: 768px) {
  h2 {
    font-size: 1.2rem;
  }

  .membre {
    width: 90%;
    display: flex;
    flex-direction: row;
  }

  .imatge {
    width: 110px;
    height: 110px;
  }

  .imatge_bit_right {
    width: 80px;
    height: 80px;
    margin-top: -65px;
    margin-left: 65px;
  }

  .imatge_bit_left {
    width: 80px;
    height: auto;
    margin-top: -65px;
    margin-right: 65px;
  }

  .nom {
    font-size: 1rem;
  }

  .estudis {
    font-size: .8rem;
    font-weight: normal;
  }
}
</style>