<template>
  <section id="hero" class="hero-section">
    <div class="hero-container">
      <!-- 1. Full 100vh Viewport: Logo alone -->
      <div class="hero-logo-screen">
        <div class="hero-animation-wrap">
          <RiveCanvas
            :src="logoRivUrl"
            state-machine="State Machine 1"
            :repeat-interval="5000"
            fit="contain"
            alignment="center"
            class="hero-rive"
          />
        </div>
      </div>

      <!-- 2. Below the fold on scroll: Typography & CTAs -->
      <div class="hero-content-screen">
        <h1 class="hero-title" v-html="t('rebrand_hero_title')"></h1>
        <p class="hero-subtitle">{{ t('rebrand_hero_subtitle') }}</p>

        <!-- Primary Conversion CTAs -->
        <div class="hero-actions">
          <div class="btn-bit-anchor">
            <!-- Static Bit perched directly on top of the button -->
            <div class="bit-attached">
              <RiveCanvas
                :src="respiracionRivUrl"
                animation="respiracion"
                state-machine="Idle"
                fit="contain"
                alignment="bottomCenter"
                class="bit-rive"
              />
            </div>

            <a href="#waitlist" class="btn-primary" @click.prevent="scrollToWaitlist">
              {{ t('rebrand_cta_waitlist') }}
              <svg
                class="btn-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <a :href="prototypeUrl" target="_blank" rel="noopener noreferrer" class="btn-secondary">
            {{ t('rebrand_cta_prototype') }}
            <svg
              class="btn-external"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import RiveCanvas from '@/components/common/RiveCanvas.vue'
import logoRivUrl from '@/assets/animations/logo.riv'
import respiracionRivUrl from '@/assets/animations/respiracion.riv'

const { t } = useI18n()
const prototypeUrl = 'https://prototype.bitspace.es'

function scrollToWaitlist() {
  const el = document.getElementById('waitlist')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 0;
}

.hero-container {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Screen 1: Full Viewport Logo */
.hero-logo-screen {
  width: 100%;
  height: 100vh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 1.5rem 2rem;
  box-sizing: border-box;
}

.hero-animation-wrap {
  position: relative;
  width: 86vw;
  max-width: 1420px;
  height: clamp(340px, 42vw, 560px);
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 20px 40px rgba(255, 188, 223, 0.45));
}

.hero-rive {
  width: 100%;
  height: 100%;
}

/* Screen 2: Content on scroll */
.hero-content-screen {
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3.5rem 1.5rem 6.5rem;
  box-sizing: border-box;
}

/* Title & Subtitle */
.hero-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
}

.hero-title :deep(.highlight) {
  color: #e879a9;
  background: transparent;
  padding: 0;
  display: inline-block;
}

.hero-subtitle {
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.65;
  font-weight: 400;
}

/* Actions & Perched Bit Companion */
.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
  margin-top: 1.5rem;
}

.btn-bit-anchor {
  position: relative;
  display: inline-flex;
  justify-content: center;
}

.bit-attached {
  position: absolute;
  bottom: calc(100% - 14px);
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 80px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  filter: drop-shadow(0 6px 12px rgba(241, 178, 195, 0.45));
  pointer-events: none;
  z-index: 3;
}

.bit-rive {
  width: 100%;
  height: 100%;
}

.btn-primary {
  background: #ade5a8;
  color: #18181b;
  font-weight: 800;
  font-size: 1.05rem;
  padding: 0.95rem 1.85rem;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 10px 25px rgba(173, 229, 168, 0.45);
}

.btn-primary:hover {
  background: #98de92;
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(173, 229, 168, 0.6);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-arrow {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}

.btn-primary:hover .btn-arrow {
  transform: translateX(3px);
}

.btn-secondary {
  background: var(--bg-surface-glass);
  color: var(--text-primary);
  border: 1.5px solid var(--border-subtle);
  font-weight: 700;
  font-size: 1.05rem;
  padding: 0.95rem 1.85rem;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(12px);
  transition: all 0.25s ease;
}

.btn-secondary:hover {
  background: var(--brand-mint-subtle, #eef9ec);
  border-color: var(--brand-mint, #ade5a8);
  color: #18181b;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(173, 229, 168, 0.3);
}

.btn-external {
  width: 16px;
  height: 16px;
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 860px) {
  .hero-logo-screen {
    height: 100vh;
    min-height: 520px;
    padding-top: 5rem;
    padding-bottom: 2rem;
  }

  .hero-animation-wrap {
    width: 95vw;
    height: clamp(220px, 48vw, 340px);
    margin: 0;
  }

  .hero-content-screen {
    padding: 2.5rem 1.25rem 5rem;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
    max-width: 340px;
    gap: 2.5rem;
  }

  .btn-bit-anchor {
    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
