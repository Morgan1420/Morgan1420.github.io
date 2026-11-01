<template>
  <section id="pillars" class="pillars-section">
    <!-- Mazo Relevo Horitzontal (Sticky Scroll-Driven Deck) -->
    <div ref="stickyContainerRef" class="scroll-track-container">
      <div class="sticky-viewport">
        <!-- Section Header -->
        <div class="section-header">
          <h2 class="section-title">{{ t('rebrand_pillars_title') }}</h2>
          <p class="section-subtitle">{{ t('rebrand_pillars_subtitle') }}</p>
        </div>

        <!-- Top HUD Navigation Bar with Indicator and Clickable Pills -->
        <div class="carousel-hud">
          <div class="hud-left">
            <span class="hud-indicator">
              {{
                t('rebrand_pillar_counter', {
                  current: currentCarouselIndex + 1,
                  total: pillarsData.length,
                })
              }}
              •
              {{ activeDeckPillar.tag }}
            </span>
            <div class="hud-pills" role="tablist">
              <button
                v-for="(pilar, idx) in pillarsData"
                :key="pilar.id"
                type="button"
                role="tab"
                :aria-selected="currentCarouselIndex === idx"
                class="hud-dot"
                :class="['dot-' + pilar.theme, { active: currentCarouselIndex === idx }]"
                :title="'Anar a ' + pilar.tag"
                @click="scrollToDeckStep(idx)"
              >
                <span class="dot-inner"></span>
                <span class="dot-label">{{ pilar.tag }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Horizontal Deck Stage: Cards in Depth with Smooth Horizontal Transition -->
        <div class="deck-stage-wrapper">
          <div class="deck-stage">
            <article
              v-for="(pilar, idx) in pillarsData"
              :key="pilar.id"
              class="deck-card"
              :class="['card-' + pilar.theme, { 'is-current': currentCarouselIndex === idx }]"
              :style="getDeckCardStyle(idx)"
            >
              <div class="deck-card-grid">
                <!-- Visual Character Side -->
                <div class="deck-visual-side">
                  <div
                    class="bit-visual-box bit-box-deck"
                    :class="{ 'bit-box-deck-sport': pilar.animation === 'Sport_Loop' }"
                  >
                    <RiveCanvas
                      :src="bitCompletRivUrl"
                      :animation="pilar.animation"
                      fit="contain"
                      :alignment="pilar.animation === 'Sport_Loop' ? 'bottomCenter' : 'center'"
                      class="bit-rive"
                    />
                  </div>
                </div>

                <!-- Content Details Side -->
                <div class="deck-content-side">
                  <div class="deck-card-badge-row">
                    <span class="minimal-tag" :class="'tag-' + pilar.theme">{{ pilar.tag }}</span>
                    <span class="deck-card-counter">0{{ idx + 1 }} / 04</span>
                  </div>
                  <h3 class="deck-card-title">{{ pilar.title }}</h3>
                  <p class="deck-card-text">{{ pilar.punchline }}</p>
                  <div class="deck-card-footer">
                    <span class="metric-highlight">+ {{ pilar.metric }}</span>
                    <span class="deck-card-note">{{ t('rebrand_pillar_daily_note') }}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import RiveCanvas from '@/components/common/RiveCanvas.vue'
import bitCompletRivUrl from '@/assets/animations/BitComplet.riv'

defineOptions({
  name: 'PillarsSection',
})

const { t } = useI18n()

const stickyContainerRef = ref(null)
const scrollProgress = ref(0)

const pillarsData = computed(() => [
  {
    id: 'detox',
    theme: 'pink',
    tag: t('rebrand_pillar_detox_tag'),
    title: t('rebrand_pillar_detox_title'),
    punchline: t('rebrand_pillar_detox_desc'),
    metric: t('rebrand_pillar_metric_detox'),
    animation: 'Idle_Movimiento',
  },
  {
    id: 'fitness',
    theme: 'mint',
    tag: t('rebrand_pillar_fitness_tag'),
    title: t('rebrand_pillar_fitness_title'),
    punchline: t('rebrand_pillar_fitness_desc'),
    metric: t('rebrand_pillar_metric_fitness'),
    animation: 'Sport_Loop',
  },
  {
    id: 'reading',
    theme: 'yellow',
    tag: t('rebrand_pillar_reading_tag'),
    title: t('rebrand_pillar_reading_title'),
    punchline: t('rebrand_pillar_reading_desc'),
    metric: t('rebrand_pillar_metric_reading'),
    animation: 'Read_Loop',
  },
  {
    id: 'focus',
    theme: 'lilac',
    tag: t('rebrand_pillar_focus_tag'),
    title: t('rebrand_pillar_focus_title'),
    punchline: t('rebrand_pillar_focus_desc'),
    metric: t('rebrand_pillar_metric_focus'),
    animation: ['Study_Intro', 'Study_Loop'],
  },
])

const currentCarouselIndex = computed(() => {
  const total = pillarsData.value.length
  const idx = Math.round(scrollProgress.value * (total - 1))
  return Math.min(Math.max(idx, 0), total - 1)
})

const activeDeckPillar = computed(() => {
  return pillarsData.value[currentCarouselIndex.value] || pillarsData.value[0]
})

function getDeckCardStyle(idx) {
  const total = pillarsData.value.length
  const targetStep = scrollProgress.value * (total - 1)
  const offset = targetStep - idx

  // Current active card in the focal center
  if (Math.abs(offset) < 0.05) {
    return {
      transform: 'translate3d(0, 0, 0) scale(1)',
      opacity: 1,
      zIndex: 20,
      pointerEvents: 'auto',
      visibility: 'visible',
    }
  }

  // Upcoming card entering horizontally from right as user scrolls down
  if (offset < 0) {
    const dist = Math.min(-offset, 1.2)
    const translateX = dist * 140
    const scale = 1 - dist * 0.05
    const opacity = Math.max(1 - dist * 1.6, 0)
    return {
      transform: `translate3d(${translateX}px, 0, 0) scale(${scale})`,
      opacity: opacity,
      zIndex: Math.max(Math.round(15 - dist * 8), 0),
      pointerEvents: opacity > 0.8 ? 'auto' : 'none',
      visibility: opacity > 0.01 ? 'visible' : 'hidden',
    }
  }

  // Card has passed and is smoothly exiting horizontally to the left
  if (offset > 0) {
    const dist = Math.min(offset, 1.2)
    const translateX = -dist * 140
    const scale = 1 - dist * 0.06
    const opacity = Math.max(1 - dist * 1.8, 0)
    return {
      transform: `translate3d(${translateX}px, 0, 0) scale(${scale})`,
      opacity: opacity,
      zIndex: Math.max(Math.round(15 - dist * 8), 0),
      pointerEvents: opacity > 0.8 ? 'auto' : 'none',
      visibility: opacity > 0.01 ? 'visible' : 'hidden',
    }
  }
}

function scrollToDeckStep(stepIdx) {
  if (!stickyContainerRef.value) return
  const container = stickyContainerRef.value
  const rect = container.getBoundingClientRect()
  const stickyTopOffset = 90
  const scrollTop = window.scrollY + rect.top - stickyTopOffset
  const scrollableDistance = container.offsetHeight - window.innerHeight + stickyTopOffset
  const targetScroll = scrollTop + (stepIdx / (pillarsData.value.length - 1)) * scrollableDistance
  window.scrollTo({ top: targetScroll, behavior: 'smooth' })
}

function handleScroll() {
  if (!stickyContainerRef.value) return

  const rect = stickyContainerRef.value.getBoundingClientRect()
  const stickyTopOffset = 90
  const totalScrollableHeight = rect.height - window.innerHeight + stickyTopOffset

  if (totalScrollableHeight <= 0) return

  const currentScroll = -(rect.top - stickyTopOffset)
  const rawProgress = currentScroll / totalScrollableHeight
  const clampedProgress = Math.min(Math.max(rawProgress, 0), 1)

  scrollProgress.value = clampedProgress
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})
</script>

<style scoped>
.pillars-section {
  position: relative;
  padding: 2rem 0;
}

/* Header */
.section-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 1.25rem;
  padding: 0 1rem;
}

.section-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: clamp(1.85rem, 3.4vw, 2.5rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
  letter-spacing: -0.01em;
}

.section-subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* ========================================================
   STICKY SCROLL-DRIVEN TRACK
   ======================================================== */
.scroll-track-container {
  height: 280vh;
  position: relative;
}

.sticky-viewport {
  position: sticky;
  top: 75px;
  height: calc(100vh - 90px);
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
}

/* HUD Top Bar */
.carousel-hud {
  max-width: 1040px;
  width: 100%;
  margin: 0 auto 1.25rem;
  padding: 0 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.hud-left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.hud-indicator {
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--text-primary);
  background: #ffffff;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--brand-mint, #ade5a8);
  box-shadow: 0 2px 10px rgba(173, 229, 168, 0.25);
}

.hud-pills {
  display: flex;
  gap: 0.5rem;
}

.hud-dot {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: #ffffff;
  border: 1.5px solid var(--border-subtle);
  border-radius: var(--radius-full);
  padding: 0.35rem 0.8rem;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-secondary);
  transition: all 0.25s ease;
  box-shadow: var(--shadow-subtle);
}

.hud-dot:hover {
  transform: translateY(-2px);
  color: var(--text-primary);
}

.dot-inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition: transform 0.25s ease;
}

.dot-pink .dot-inner {
  background: #ffbcdf;
}
.dot-mint .dot-inner {
  background: #ade5a8;
}
.dot-yellow .dot-inner {
  background: #fde68a;
}
.dot-lilac .dot-inner {
  background: #c3bbff;
}

.hud-dot.active {
  border-color: var(--brand-mint, #ade5a8);
  color: var(--text-primary);
  background: #ffffff;
  box-shadow: 0 4px 14px rgba(173, 229, 168, 0.35);
  transform: translateY(-1px);
}

.hud-dot.active .dot-inner {
  transform: scale(1.4);
}

/* ========================================================
   DECK STAGE & CARDS (HORIZONTAL DISPLACEMENT)
   ======================================================== */
.deck-stage-wrapper {
  position: relative;
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  height: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
  padding: 0 1.5rem;
  overflow: visible;
}

.deck-stage {
  position: relative;
  width: 100%;
  height: 100%;
}

.deck-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--border-subtle);
  box-shadow: 0 25px 60px rgba(24, 24, 27, 0.08);
  padding: 3rem 4rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  will-change: transform, opacity;
  overflow: visible;
  transition: box-shadow 0.3s ease;
}

.deck-card.card-pink {
  border-top: 4px solid #ffbcdf;
}
.deck-card.card-mint {
  border-top: 4px solid #ade5a8;
}
.deck-card.card-yellow {
  border-top: 4px solid #fde68a;
}
.deck-card.card-lilac {
  border-top: 4px solid #c3bbff;
}

.deck-card-grid {
  display: grid;
  grid-template-columns: 240px 1fr;
  align-items: center;
  gap: 4rem;
  width: 100%;
}

.deck-visual-side {
  display: flex;
  align-items: center;
  justify-content: center;
}

.deck-content-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.deck-card-badge-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.deck-card-counter {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}

.deck-card-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: 2.1rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.deck-card-text {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.deck-card-footer {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.deck-card-note {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-muted);
}

/* ========================================================
   RIVE BOX & BIT SIZES
   ======================================================== */
.bit-visual-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  pointer-events: none;
}

.bit-rive {
  width: 100%;
  height: 100%;
}

.bit-box-deck {
  width: 210px;
  height: 190px;
  filter: drop-shadow(0 12px 28px rgba(24, 24, 27, 0.1));
}

.bit-box-deck-sport {
  width: 245px;
  height: 245px;
  margin-top: -55px;
  margin-bottom: -15px;
  z-index: 5;
  filter: drop-shadow(0 14px 32px rgba(24, 24, 27, 0.14));
}

/* Minimal Tags */
.minimal-tag {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-full);
}

.tag-pink {
  background: #fff0f7;
  color: #db2777;
}
.tag-mint {
  background: #f0fdf4;
  color: #16a34a;
}
.tag-yellow {
  background: #fefce8;
  color: #ca8a04;
}
.tag-lilac {
  background: #f5f3ff;
  color: #7c3aed;
}

.metric-highlight {
  font-size: 0.85rem;
  font-weight: 800;
  color: #16a34a;
  background: #f0fdf4;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
}

/* Responsive */
@media (max-width: 860px) {
  .deck-card {
    padding: 2rem 1.75rem;
  }

  .deck-card-grid {
    grid-template-columns: 140px 1fr;
    gap: 1.5rem;
  }

  .deck-card-title {
    font-size: 1.65rem;
  }

  .bit-box-deck {
    width: 140px;
    height: 130px;
  }

  .bit-box-deck-sport {
    width: 180px;
    height: 190px;
    margin-top: -35px;
    margin-bottom: -10px;
    z-index: 10;
  }
}

@media (max-width: 640px) {
  .sticky-viewport {
    top: 60px;
    height: calc(100vh - 75px);
    min-height: 520px;
    padding: 0.25rem 0.75rem;
    justify-content: center;
  }

  .section-header {
    margin-bottom: 0.65rem;
    padding: 0 0.5rem;
  }

  .section-title {
    font-size: clamp(1.4rem, 4.5vw, 1.75rem);
    margin-bottom: 0.2rem;
  }

  .section-subtitle {
    font-size: 0.88rem;
    line-height: 1.35;
  }

  .carousel-hud {
    margin-bottom: 0.75rem;
    padding: 0 0.5rem;
    gap: 0.5rem;
  }

  .hud-indicator {
    font-size: 0.75rem;
    padding: 0.35rem 0.75rem;
  }

  .hud-dot {
    padding: 0.3rem 0.6rem;
  }

  .deck-stage-wrapper {
    height: 450px;
    padding: 0 0.5rem;
    overflow: visible;
  }

  .deck-card {
    padding: 1.25rem 1.15rem 1.25rem;
    border-radius: var(--radius-lg);
    overflow: visible;
  }

  .deck-card-grid {
    grid-template-columns: 1fr;
    gap: 0.65rem;
    text-align: center;
    width: 100%;
  }

  .deck-visual-side {
    min-height: 110px;
    height: 110px;
    margin-bottom: 0;
    overflow: visible;
  }

  .bit-box-deck {
    width: 120px;
    height: 110px;
  }

  .bit-box-deck-sport {
    width: 165px;
    height: 170px;
    margin-top: -35px;
    margin-bottom: -15px;
    z-index: 10;
  }

  .deck-content-side {
    text-align: center;
  }

  .deck-card-badge-row {
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 0.35rem;
  }

  .deck-card-title {
    font-size: 1.45rem;
    margin-bottom: 0.3rem;
    line-height: 1.2;
  }

  .deck-card-text {
    font-size: 0.92rem;
    line-height: 1.45;
    margin-bottom: 0.85rem;
    padding: 0 0.25rem;
  }

  .deck-card-footer {
    justify-content: center;
    gap: 0.75rem;
  }

  .metric-highlight {
    font-size: 0.78rem;
    padding: 0.25rem 0.65rem;
  }

  .deck-card-note {
    font-size: 0.75rem;
  }

  .hud-hint {
    display: none;
  }

  .hud-pills .dot-label {
    display: none;
  }
}

@media (max-width: 380px) {
  .deck-stage-wrapper {
    height: 420px;
    overflow: visible;
  }

  .deck-card {
    padding: 1rem 0.85rem;
    overflow: visible;
  }

  .deck-visual-side {
    height: 95px;
    min-height: 95px;
    overflow: visible;
  }

  .bit-box-deck {
    width: 105px;
    height: 95px;
  }

  .bit-box-deck-sport {
    width: 140px;
    height: 145px;
    margin-top: -28px;
    margin-bottom: -12px;
    z-index: 10;
  }

  .deck-card-title {
    font-size: 1.3rem;
  }

  .deck-card-text {
    font-size: 0.85rem;
    margin-bottom: 0.65rem;
  }
}
</style>
