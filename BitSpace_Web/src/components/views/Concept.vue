<template>
  <section id="concept">
    <div class="section-inner">
      <div class="concept-grid">
        <div class="concept-text animate-on-scroll">
          <div class="section-badge"><b>✦</b> El concepte <b>✦</b></div>
          <h2 class="section-title">El teu Bit és el<br>teu mirall digital</h2>

          <p class="big-quote">
            "Quan <em>cuides del teu Bit</em>, t'estàs <em>cuidant a tu mateix</em>."
          </p>

          <p>
            BitSpace no és ni una llista "to-do" ni un bloquejador d'apps, sinó un <strong>entorn gamificat
              i ple
              d'eines </strong>que t'ajudaran a créixer i millorar la teva vida digital.
          </p>

          <p>
            Des de BitSpace sabem que no tots comencem des del mateix punt A, ni volem arribar al mateix
            punt B. És per això que la personalització és un factor tan important — <strong>apliquem
              solucions individuals i basades en la ciència de l'hàbit.</strong>
          </p>

          <div class="uvp-card">
            <p>"Si creus que pots donar més de tu mateix, però el telèfon t'atrapa... BitSpace és per a tu."
            </p>
          </div>
        </div>

        <div class="concept-visual animate-on-scroll">
          <div class="bit-states">
            <button v-for="(card, index) in emotionCards" :key="card.key" type="button" class="bit-state-card"
              :class="[card.variant, { flipped: flippedCards[index] }]" :aria-pressed="flippedCards[index]"
              :aria-label="`${card.title} - ${flippedCards[index] ? 'mostrar cara frontal' : 'mostrar explicació'}`"
              @click="toggleCard(index)">
              <span class="bit-card-inner">
                <span class="bit-card-face bit-card-front">
                  <span class="bit-emoji"><img :src="card.image" :alt="card.alt"></span>
                  <small>Fes clic per girar</small>
                </span>
                <span class="bit-card-face bit-card-back">
                  <h4>{{ card.title }}</h4>
                  <p>{{ card.backText }}</p>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

import bitFelic from '@/assets/images/Bits_Background/Lluna_Bit_sin_fondo.png'
import bitConcentrat from '@/assets/images/Bits_Background/Bit_jan_llegint.png'
import bitTired from '@/assets/images/Bits_Background/Gerard_Bit_sin_fondo.png'
import bitSad from '@/assets/images/Bits_Background/Bit_triste.png'

const emotionCards = [
  {
    key: 'happy',
    variant: 'happy',
    image: bitFelic,
    alt: 'Feliç',
    title: 'Feliç',
    frontText: 'Hàbits complerts. El Bit brilla!',
    backText: 'Quan mantens el ritme, el teu Bit es mostra content, estable i amb energia per continuar creixent.',
  },
  {
    key: 'focused',
    variant: 'focused',
    image: bitConcentrat,
    alt: 'Concentrat',
    title: 'Concentrat',
    frontText: 'Hàbits complerts. El Bit brilla!',
    backText: 'Quan avances amb constància, el Bit entra en mode focus i recompensa cada petit progrés.',
  },
  {
    key: 'sad',
    variant: 'sad',
    image: bitSad,
    alt: 'Trist',
    title: 'Trist',
    frontText: 'Pocs reptes completats avui.',
    backText: 'Quan t’allunyes dels teus hàbits, el Bit ho nota i et recorda suaument que torni la connexió.',
  },
  {
    key: 'tired',
    variant: 'tired',
    image: bitTired,
    alt: 'Cansat',
    title: 'Cansat',
    frontText: 'Necessita que cuides de tu.',
    backText: 'Quan et demanes massa, el Bit baixa el ritme i et recorda que descansar també forma part del progrés.',
  },
]

const flippedCards = ref([false, false, false, false])

const toggleCard = index => {
  flippedCards.value[index] = !flippedCards.value[index]
}

let observer

onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 },
  )

  document.querySelectorAll('#concept .animate-on-scroll').forEach(element => observer.observe(element))
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
#concept {
  background: white;
  position: relative;
  overflow: hidden;
  padding-block: 4rem;
  font-family: 'Nunito', sans-serif;
}

#concept::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--purple), var(--pink), var(--sky-deep), var(--gold));
}

.section-inner {
  max-width: 1300px;
  margin: 0 auto;
}

.section-badge {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6rem;
  color: var(--purple-deep);
  background: var(--lavender);
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.section-badge b {
  font-size: 1rem;
}

.section-title {
  font-family: 'Baloo 2', cursive;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: none;
}

@keyframes blob-float {

  0%,
  100% {
    transform: translateY(0) rotate(-2deg);
  }

  50% {
    transform: translateY(-18px) rotate(2deg);
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rem;
  align-items: center;
}

.concept-text .big-quote {
  font-size: clamp(1.4rem, 2.5vw, 1.9rem);
  font-family: 'Baloo 2', cursive;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  line-height: 1.35;
}

.concept-text .big-quote em {
  font-style: normal;
  color: var(--purple-deep);
}

.concept-text p {
  color: var(--text-mid);
  margin-bottom: 1.25rem;
  font-size: 1.05rem;
}

.uvp-card {
  background: linear-gradient(135deg, var(--lavender), var(--pink-soft));
  border-radius: var(--radius-xl);
  padding: 2rem;
  margin-top: 2rem;
  border: 2px solid var(--purple);
  position: relative;
  overflow: hidden;
}

.uvp-card::before {
  content: '✦';
  position: absolute;
  top: -1rem;
  right: 1.5rem;
  font-size: 3rem;
  opacity: 0.15;
  color: var(--purple-deep);
}

.uvp-card p {
  font-family: 'Baloo 2', cursive;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin: 0;
}

.concept-visual {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.bit-states {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  width: 150%;
}

.bit-state-card {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
  perspective: 1200px;
}

.bit-card-inner {
  position: relative;
  display: block;
  width: 100%;
  min-height: 300px;
  min-width: 300px;
  border-radius: var(--radius-lg);
  transition: transform 0.6s ease, box-shadow 0.25s ease;
  transform-style: preserve-3d;
  will-change: transform;
}

.bit-state-card:hover .bit-card-inner {
  box-shadow: 0 14px 36px rgba(45, 27, 78, 0.12);
  transform: translateY(-4px);
}

.bit-state-card.flipped .bit-card-inner {
  transform: rotateY(180deg);
}

.bit-card-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1.25rem;
  border-radius: var(--radius-lg);
  backface-visibility: hidden;
  box-shadow: var(--shadow-card);
}

.bit-card-front {
  background: white;
}

.bit-emoji {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.65rem;
}

.bit-emoji img {
  width: 125px;
  height: 125px;
  object-fit: contain;
}

.bit-state-card h4 {
  font-family: 'Baloo 2', cursive;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.bit-state-card p {
  font-size: 0.9rem;
  color: var(--text-light);
  margin: 0;
  text-align: center;
  line-height: 1.45;
}

.bit-card-front small {
  display: block;
  margin-top: 0.75rem;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.45rem;
  color: var(--purple-deep);
  letter-spacing: 0.04em;
}

.bit-card-back {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, var(--lavender), var(--pink-soft));
}

.bit-state-card.happy {
  background: linear-gradient(135deg, #fff, #f0fff8);
}

.bit-state-card.happy .bit-card-back {
  background: linear-gradient(135deg, #fff8e7, var(--cream));
  border: 2px solid var(--gold);
}

.bit-state-card.sad {
  background: linear-gradient(135deg, #fff, #f0f8ff);
}

.bit-state-card.sad .bit-card-back {
  background: linear-gradient(135deg, #f0f8ff, var(--sky));
  border: 2px solid var(--sky-deep);
}

.bit-state-card.tired {
  background: linear-gradient(135deg, #fff, #fffbf0);
}

.bit-state-card.tired .bit-card-back {
  background: linear-gradient(135deg, #f0fff8, var(--mint));
  border: 2px solid var(--green);
}

.bit-state-card.focused {
  background: linear-gradient(135deg, #fff, #fffbf0);
}

.bit-state-card.focused .bit-card-back {
  background: linear-gradient(135deg, #fdf0ff, var(--lavender));
  border: 2px solid var(--purple);
}

.bit-state-card.happy .bit-card-front,
.bit-state-card.sad .bit-card-front,
.bit-state-card.tired .bit-card-front,
.bit-state-card.focused .bit-card-front {
  border: 2px solid transparent;
}

.bit-card-back h4 {
  margin-bottom: 0.5rem;
}

.bit-card-back p {
  max-width: 25ch;
  font-size: 0.85rem;
  color: var(--text-dark);
}


@media (max-width: 900px) {
  .concept-grid {
    grid-template-columns: 1fr;
  }

  .bit-states {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .bit-card-inner {
    min-height: 300px;
  }
}

@media (max-width: 600px) {
  .bit-states {
    grid-template-columns: 1fr;
  }

  .bit-card-inner {
    min-height: 280px;
  }
}
</style>
