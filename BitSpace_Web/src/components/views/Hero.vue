<template>
  <section id="hero">

    <!-- Sparkles -->
    <svg class="hero-sparkle" style="top:15%;left:8%;width:28px;--sparkle-duration:3.2s;" viewBox="0 0 24 24"
      fill="#C4B5FD">
      <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z" />
    </svg>
    <svg class="hero-sparkle" style="top:20%;right:12%;width:20px;--sparkle-duration:2.8s;--sparkle-delay:0.5s;"
      viewBox="0 0 24 24" fill="#FDE68A">
      <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z" />
    </svg>
    <svg class="hero-sparkle" style="bottom:30%;left:5%;width:16px;--sparkle-duration:3.5s;--sparkle-delay:1s;"
      viewBox="0 0 24 24" fill="#7DD3FC">
      <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z" />
    </svg>
    <svg class="hero-sparkle" style="top:60%;right:8%;width:22px;--sparkle-duration:4s;--sparkle-delay:0.3s;"
      viewBox="0 0 24 24" fill="#FFB5C8">
      <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z" />
    </svg>

    <!-- Hero Content -->
    <div class="hero-inner">
      <!-- Hero Text -->
      <div class="hero-content">
        <div class="hero-badge">
          <span>✦</span> APP DE BENESTAR<span>✦</span>
        </div>

        <h1 class="hero-title">
          El teu benestar,<br>
          <span class="highlight">reflectit en<br>un món digital</span>
        </h1>

        <p class="hero-subtitle">
          Adopta el teu Bit, crea hàbits saludables dia a dia i observa com creix feliç al teu costat. Perquè
          cuidar-te no ha de ser una cosa que facis sol.
        </p>

        <div class="hero-tagline">
          ✦ less scroll, more control ✦
        </div>

        <div class="hero-actions">
          <a href="#cta" class="btn-primary"
            :class="{ 'is-muted': !activeWaitlistPrimary, 'is-hover-locked': hoveredButton === 'waitlist' }"
            @mouseenter="hoveredButton = 'waitlist'" @mouseleave="hoveredButton = null">
            <span>📱</span> {{ activeWaitlistPrimary ? "Uneix-te a la llista" : "Llista d'espera" }}
          </a>
          <a :href="prototypeLink" class="btn-secondary"
            :class="{ 'is-highlighted': !activeWaitlistPrimary, 'is-hover-locked': hoveredButton === 'prototype' }"
            @mouseenter="hoveredButton = 'prototype'" @mouseleave="hoveredButton = null" @click.prevent="openPrototype">
            <span>▶</span> {{ activeWaitlistPrimary ? 'Prova el prototip' : 'Prova el prototip' }}
          </a>
        </div>

      </div>

      <!-- Hero Visual -->
      <div class="hero-visual">
        <div class="hero-mascot-wrap">
          <img class="hero-mascot" :src="heroMascot" alt="Mascota de BitSpace" />

          <div class="reviews">
            <div class="review">
              <div class="review-img">
                <img class="review-avatar" :src="reviewAvatar1" alt="Img Alfons">
              </div>
              <div class="review-content">
                <p><b>” </b> Cada cop que obro Instagram penso en vosaltres! 10/10</p>
                <cite>— Alfons, mentor</cite>
              </div>
            </div>

            <div class="review">
              <div class="review-img">
                <img class="review-avatar" :src="reviewAvatar2" alt="Img Esther">
              </div>
              <div class="review-content">
                <p><b>” </b> M'encanta el vostre projecte! Com puc ajudar?</p>
                <cite>— Esther, consultora</cite>
              </div>
            </div>

          </div>





        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const heroMascot = new URL('../../assets/images/Bits_Background/Bit_25.png', import.meta.url).href
const reviewAvatar1 = new URL('../../assets/images/Web_icons/Review_person_1.png', import.meta.url).href
const reviewAvatar2 = new URL('../../assets/images/Web_icons/Review_person_2.png', import.meta.url).href
const prototypeLink = 'https://prototype.bitspace.es/ca'

const isWaitlistPrimary = ref(true)
const hoveredButton = ref(null)

const activeWaitlistPrimary = computed(() => {
  if (hoveredButton.value === 'waitlist') {
    return true
  }

  if (hoveredButton.value === 'prototype') {
    return false
  }

  return isWaitlistPrimary.value
})

const openPrototype = () => {
  if (!prototypeLink) {
    return
  }

  window.open(prototypeLink, '_blank', 'noopener,noreferrer')
}

let swapInterval = null

onMounted(() => {
  swapInterval = window.setInterval(() => {
    isWaitlistPrimary.value = !isWaitlistPrimary.value
  }, 3000)
})

onBeforeUnmount(() => {
  if (swapInterval) {
    window.clearInterval(swapInterval)
  }
})
</script>

<style scoped>
/* =============================================
   ANIMACIONS (KEYFRAMES)
============================================= */
@keyframes sparkle-float {

  0%,
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0.7;
  }

  50% {
    transform: translateY(-12px) rotate(15deg) scale(1.1);
    opacity: 1;
  }
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }

  100% {
    background-position: 200% center;
  }
}

@keyframes pulse-glow {

  0%,
  100% {
    box-shadow: 0 0 20px rgba(196, 181, 253, 0.3);
  }

  50% {
    box-shadow: 0 0 40px rgba(196, 181, 253, 0.6);
  }
}

/* =============================================
   HERO SECTION STYLES
============================================= */
#hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 0rem 2rem 4rem;
  background: linear-gradient(160deg, #FFF8F2 0%, #F0E8FF 40%, #FFE8F2 70%, #E8F8FF 100%);
  font-family: 'Nunito', sans-serif;
  color: var(--text-dark);
}

a {
  text-decoration: none;
}


.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 1.5px solid var(--purple);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--purple-deep);
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.6s ease both;
  font-family: 'Press Start 2P', monospace;
  letter-spacing: 0;
}

.hero-badge span {
  font-size: 1rem;
  margin-top: -10px;
}

.hero-title {
  font-family: 'Baloo 2', cursive;
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 1.25rem;
  animation: fadeInUp 0.6s ease 0.1s both;
  line-height: 1.15;
}

.hero-title .highlight {
  background: linear-gradient(120deg, var(--purple-deep), var(--pink-deep));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--text-mid);
  margin-bottom: 2rem;
  max-width: 480px;
  animation: fadeInUp 0.6s ease 0.2s both;
  font-weight: 500;
  line-height: 1.7;
}

.hero-tagline {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.65rem;
  color: var(--purple-deep);
  background: var(--lavender);
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease 0.3s both;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  animation: fadeInUp 0.6s ease 0.4s both;
}

.hero-actions a {
  width: 15rem;
  min-height: 3rem;
  justify-content: center;
  white-space: nowrap;
  box-sizing: border-box;
  transform: scale(var(--cta-scale, 1));
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, var(--purple-deep) 0%, var(--pink-deep) 100%);
  color: white;
  padding: 0.7rem 1rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  font-family: 'Baloo 2', cursive;
  transition: transform 1.15s ease, box-shadow 1.15s ease, background 1.15s ease, color 1.15s ease, border-color 1.15s ease;
  box-shadow: 0 8px 24px rgba(167, 139, 250, 0.35);
  border: none;
  --cta-scale: 1;
}

.btn-primary:hover {
  transform: translateY(-3px) scale(var(--cta-scale, 1));
  box-shadow: 0 12px 32px rgba(167, 139, 250, 0.5);
}

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: white;
  color: var(--text-dark);
  padding: 0.7rem 1rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  font-family: 'Baloo 2', cursive;
  border: 2px solid var(--purple);
  transition: transform 1.15s ease, box-shadow 1.15s ease, background 1.15s ease, color 1.15s ease, border-color 1.15s ease;
  --cta-scale: 1;
}

.btn-secondary:hover {
  background: var(--lavender);
  transform: translateY(-3px) scale(var(--cta-scale, 1));
  box-shadow: var(--shadow-soft);
}

.btn-primary.is-muted {
  background: white;
  color: var(--text-dark);
  border: 2px solid var(--purple);
  --cta-scale: 0.95;
  box-shadow: 0 3px 14px rgba(45, 27, 78, 0.12);
}

.btn-primary.is-muted:hover {
  background: var(--lavender);
  box-shadow: var(--shadow-soft);
}


.btn-secondary.is-highlighted {
  background: linear-gradient(135deg, var(--purple-deep) 0%, var(--pink-deep) 100%);
  color: white;
  border: none;
  --cta-scale: 1.04;
  box-shadow: 0 10px 28px rgba(167, 139, 250, 0.42);
}

.btn-secondary.is-highlighted:hover {
  background: linear-gradient(135deg, var(--purple-deep) 0%, var(--pink-deep) 100%);
  box-shadow: 0 14px 34px rgba(167, 139, 250, 0.5);
}

.hero-actions a.is-hover-locked {
  --cta-scale: 1.1;
}


.hero-visual {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: scaleIn 0.7s ease 0.2s both;
}

.room-preview {
  position: relative;
  width: 380px;
  height: 380px;
}

.room-isometric {
  width: 100%;
  height: 100%;
  position: relative;
}

.iso-room {
  width: 280px;
  height: 280px;
  position: relative;
  margin: auto;
  transform: rotate(-30deg) skewX(15deg) scale(0.9);
  transform-style: preserve-3d;
}

.iso-floor {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0e6ff 0%, #ffe0ec 100%);
  position: absolute;
  border-radius: 4px;
}

.iso-wall-left {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #ffe4f0 0%, #f8d7ff 100%);
  position: absolute;
  transform: rotateX(90deg);
  transform-origin: bottom;
}

.hero-mascot-wrap {
  width: 100%;
  height: 80%;
  padding-top: 20%;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

}

.hero-mascot {
  width: 220px;
  filter: drop-shadow(0 20px 40px rgba(167, 139, 250, 0.3));
  animation: blob-float 4s ease-in-out infinite;
}

.hero-room-bg {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 340px;
  opacity: 0.7;
}

.hero-sparkle {
  position: absolute;
  pointer-events: none;
  animation: sparkle-float var(--sparkle-duration, 3s) ease-in-out infinite var(--sparkle-delay, 0s);
}

.sparkle {
  position: absolute;
  pointer-events: none;
  animation: sparkle-float 3s ease-in-out infinite;
}

.reviews {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
}

.review {
  background: white;
  border-radius: var(--radius-lg);
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 32px rgba(45, 27, 78, 0.1);
  max-width: 350px;
  margin: 1rem auto 0;
  border: 1.5px solid var(--lavender);
  animation: pulse-glow 3s ease-in-out infinite;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  will-change: transform;
}

.review:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 36px rgba(45, 27, 78, 0.14);
}


.review-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}

.review-content p {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-dark);
  margin: 0;
  line-height: 1.4;
}

.review-content p b {
  font-size: 1.1rem;
  color: var(--purple-deep);
  line-height: 1;
}

.review-content cite {
  width: 100%;
  text-align: right;
  font-size: 0.5rem;
  font-family: 'Press Start 2P', monospace;
  color: var(--text-light);
  display: block;
  margin-top: 0.5rem;
}

/* =============================================
   RESPONSIVE
============================================= */
@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-actions a {
    width: min(100%, 18rem);
  }

  .hero-stats {
    justify-content: center;
  }

  .hero-subtitle {
    margin: 0 auto 2rem;
  }

  .hero-visual {
    order: -1;
  }

  .hero-mascot {
    width: 180px;
  }
}

@media (max-width: 600px) {
  #hero {
    padding: 4rem 1.5rem;
  }
}
</style>