<template>
  <div class="pilars-showcase-page">
    <BitspaceNavBar />

    <header class="showcase-hero">
      <div class="hero-inner">
        <h1 class="hero-title">Laboratori de Disseny: Pilars</h1>
        <p class="hero-subtitle">
          5 alternatives amb boles 3D pastel, text ultra-minimalista i patrons interactius moderns.
        </p>

        <!-- Navigation Tabs to switch or jump -->
        <nav class="options-nav" aria-label="Opcions de disseny">
          <button
            type="button"
            class="opt-btn"
            :class="{ active: activeOption === 'all' }"
            @click="selectOption('all')"
          >
            Totes les opcions
          </button>
          <button
            type="button"
            class="opt-btn"
            :class="{ active: activeOption === '1' }"
            @click="selectOption('1')"
          >
            1. Bento Grid
          </button>
          <button
            type="button"
            class="opt-btn"
            :class="{ active: activeOption === '2' }"
            @click="selectOption('2')"
          >
            2. Dock Interactiu
          </button>
          <button
            type="button"
            class="opt-btn"
            :class="{ active: activeOption === '3' }"
            @click="selectOption('3')"
          >
            3. Peek-a-boo
          </button>
          <button
            type="button"
            class="opt-btn"
            :class="{ active: activeOption === '4' }"
            @click="selectOption('4')"
          >
            4. Rutina Diària
          </button>
          <button
            type="button"
            class="opt-btn"
            :class="{ active: activeOption === '5' }"
            @click="selectOption('5')"
          >
            5. Carrusel Scroll Vertical
          </button>
        </nav>
      </div>
    </header>

    <main class="showcase-content">
      <!-- ========================================================
           OPCIÓ 1: BENTO GRID ASIMÈTRIC
           ======================================================== -->
      <section
        v-if="activeOption === 'all' || activeOption === '1'"
        id="opt-bento"
        class="opt-section"
      >
        <div class="opt-label-header">
          <span class="opt-number">OPCIÓ 1</span>
          <h2 class="opt-title">Bento Grid Asimètric</h2>
          <p class="opt-desc">Composició moderna amb jerarquia visual i boles 3D de marca.</p>
        </div>

        <div class="bento-grid">
          <!-- 1. Detox (Wide Feature) -->
          <article class="bento-card bento-wide card-pink">
            <div class="bento-text">
              <span class="minimal-tag tag-pink">DETOX</span>
              <h3 class="bento-heading">Desconnexió Digital</h3>
              <p class="bento-sub">Menys pantalles, descans real.</p>
            </div>
            <div class="bento-visual">
              <div class="bit-visual-box bit-box-wide">
                <RiveCanvas
                  :src="bitCompletRivUrl"
                  animation="Idle_Movimiento"
                  fit="contain"
                  alignment="center"
                  class="bit-rive"
                />
              </div>
            </div>
          </article>

          <!-- 2. Fitness (Compact) -->
          <article class="bento-card bento-square card-mint">
            <div class="bit-top">
              <div class="bit-visual-box bit-box-sport">
                <RiveCanvas
                  :src="bitCompletRivUrl"
                  animation="Sport_Loop"
                  fit="contain"
                  alignment="bottomCenter"
                  class="bit-rive"
                />
              </div>
            </div>
            <div class="bento-text">
              <span class="minimal-tag tag-mint">FITNESS</span>
              <h3 class="bento-heading">Moviment</h3>
              <p class="bento-sub">Energia diària activa.</p>
            </div>
          </article>

          <!-- 3. Lectura (Compact) -->
          <article class="bento-card bento-square card-yellow">
            <div class="bit-top">
              <div class="bit-visual-box bit-box-square">
                <RiveCanvas
                  :src="bitCompletRivUrl"
                  animation="Read_Loop"
                  fit="contain"
                  alignment="center"
                  class="bit-rive"
                />
              </div>
            </div>
            <div class="bento-text">
              <span class="minimal-tag tag-yellow">LECTURA</span>
              <h3 class="bento-heading">Hàbit Lector</h3>
              <p class="bento-sub">Calma i coneixement.</p>
            </div>
          </article>

          <!-- 4. Focus (Wide Bottom) -->
          <article class="bento-card bento-wide card-lilac">
            <div class="bento-text">
              <span class="minimal-tag tag-lilac">FOCUS</span>
              <h3 class="bento-heading">Concentració</h3>
              <p class="bento-sub">Estudi profund lliure de notificacions.</p>
            </div>
            <div class="bento-visual">
              <div class="bit-visual-box bit-box-wide">
                <RiveCanvas
                  :src="bitCompletRivUrl"
                  :animation="['Study_Intro', 'Study_Loop']"
                  fit="contain"
                  alignment="center"
                  class="bit-rive"
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ========================================================
           OPCIÓ 2: SELECTOR INTERACTIU / DOCK
           ======================================================== -->
      <section
        v-if="activeOption === 'all' || activeOption === '2'"
        id="opt-dock"
        class="opt-section"
      >
        <div class="opt-label-header">
          <span class="opt-number">OPCIÓ 2</span>
          <h2 class="opt-title">Dock Interactiu & Escenari Central</h2>
          <p class="opt-desc">
            Clica o passa el ratolí per activar cada pilar en l'escenari minimalista.
          </p>
        </div>

        <div class="dock-container">
          <!-- Dock Buttons -->
          <div class="dock-bar" role="tablist">
            <button
              v-for="pilar in pillarsData"
              :key="pilar.id"
              type="button"
              role="tab"
              :aria-selected="selectedDockId === pilar.id"
              class="dock-btn"
              :class="['btn-' + pilar.theme, { active: selectedDockId === pilar.id }]"
              @click="selectedDockId = pilar.id"
              @mouseenter="selectedDockId = pilar.id"
            >
              <div class="dock-sphere-dot" :class="'dot-' + pilar.theme"></div>
              <span>{{ pilar.tag }}</span>
            </button>
          </div>

          <!-- Dynamic Stage Card -->
          <transition name="dock-fade" mode="out-in">
            <article
              :key="activeDockPillar.id"
              class="dock-stage-card"
              :class="'stage-' + activeDockPillar.theme"
            >
              <div class="stage-left">
                <div
                  class="bit-visual-box bit-box-stage"
                  :class="{ 'bit-box-stage-sport': activeDockPillar.animation === 'Sport_Loop' }"
                >
                  <RiveCanvas
                    :key="activeDockPillar.id"
                    :src="bitCompletRivUrl"
                    :animation="activeDockPillar.animation"
                    fit="contain"
                    :alignment="
                      activeDockPillar.animation === 'Sport_Loop' ? 'bottomCenter' : 'center'
                    "
                    class="bit-rive"
                  />
                </div>
              </div>
              <div class="stage-right">
                <span class="minimal-tag" :class="'tag-' + activeDockPillar.theme">{{
                  activeDockPillar.tag
                }}</span>
                <h3 class="stage-title">{{ activeDockPillar.title }}</h3>
                <p class="stage-claim">{{ activeDockPillar.punchline }}</p>
                <div class="stage-metric">
                  <span class="metric-plus">+</span>
                  <span class="metric-label">{{ activeDockPillar.metric }}</span>
                </div>
              </div>
            </article>
          </transition>
        </div>
      </section>

      <!-- ========================================================
           OPCIÓ 3: PEEK-A-BOO CARDS (Boles Asomades)
           ======================================================== -->
      <section
        v-if="activeOption === 'all' || activeOption === '3'"
        id="opt-peek"
        class="opt-section"
      >
        <div class="opt-label-header">
          <span class="opt-number">OPCIÓ 3</span>
          <h2 class="opt-title">Peek-a-boo (Bits Asomats)</h2>
          <p class="opt-desc">
            Inspirat en el logo: el Bit s'asoma pel marc superior i reacciona al passar el cursor.
          </p>
        </div>

        <div class="peek-grid">
          <article
            v-for="pilar in pillarsData"
            :key="pilar.id"
            class="peek-card"
            :class="'card-' + pilar.theme"
          >
            <!-- Peeking Bit -->
            <div class="peek-bit-wrapper">
              <RiveCanvas
                :src="bitCompletRivUrl"
                :animation="pilar.animation"
                fit="contain"
                alignment="bottomCenter"
                class="bit-rive"
              />
            </div>

            <div class="peek-body">
              <span class="minimal-tag" :class="'tag-' + pilar.theme">{{ pilar.tag }}</span>
              <h3 class="peek-title">{{ pilar.title }}</h3>
              <p class="peek-text">{{ pilar.punchline }}</p>
            </div>
          </article>
        </div>
      </section>

      <!-- ========================================================
           OPCIÓ 4: RUTINA DIÀRIA (Timeline Minimalista)
           ======================================================== -->
      <section
        v-if="activeOption === 'all' || activeOption === '4'"
        id="opt-timeline"
        class="opt-section"
      >
        <div class="opt-label-header">
          <span class="opt-number">OPCIÓ 4</span>
          <h2 class="opt-title">Ruta del Dia (Timeline de Salut)</h2>
          <p class="opt-desc">Flux seqüencial connectat des del matí fins a la nit.</p>
        </div>

        <div class="timeline-container">
          <div class="timeline-track"></div>
          <div class="timeline-grid">
            <article
              v-for="(step, idx) in timelineData"
              :key="step.id"
              class="timeline-card"
              :class="'card-' + step.theme"
            >
              <div class="timeline-step-badge">0{{ idx + 1 }} • {{ step.time }}</div>
              <div
                class="timeline-bit-wrap"
                :class="{ 'timeline-bit-sport': step.animation === 'Sport_Loop' }"
              >
                <RiveCanvas
                  :src="bitCompletRivUrl"
                  :animation="step.animation"
                  fit="contain"
                  :alignment="step.animation === 'Sport_Loop' ? 'bottomCenter' : 'center'"
                  class="bit-rive"
                />
              </div>
              <h3 class="timeline-title">{{ step.title }}</h3>
              <p class="timeline-sub">{{ step.action }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- ========================================================
           OPCIÓ 5: MAZO DE CARTES AL SCROLL (STACKING DECK)
           ======================================================== -->
      <section
        v-if="activeOption === 'all' || activeOption === '5'"
        id="opt-carousel"
        class="opt-section scroll-carousel-section"
      >
        <div class="opt-label-header">
          <span class="opt-number">OPCIÓ 5</span>
          <h2 class="opt-title">Mazo de Cartes al Scroll (Stacking Deck)</h2>
          <p class="opt-desc">
            Les cartes estan una sobre l'altra i van apareixent amb desplaçament horitzontal
            netament, sense solapar el contingut.
          </p>

          <!-- Mode Toggle for Option 5 -->
          <div class="deck-mode-toggle" role="group" aria-label="Modalitat d'aparició">
            <button
              type="button"
              class="mode-pill-btn"
              :class="{ active: opt5Mode === 'deck' }"
              @click="opt5Mode = 'deck'"
            >
              Mazo Relevo Horitzontal (Sticky Deck)
            </button>
            <button
              type="button"
              class="mode-pill-btn"
              :class="{ active: opt5Mode === 'cascade' }"
              @click="opt5Mode = 'cascade'"
            >
              Cascada Vertical Neta
            </button>
            <button
              type="button"
              class="mode-pill-btn"
              :class="{ active: opt5Mode === 'carousel' }"
              @click="opt5Mode = 'carousel'"
            >
              Carrusel Horitzontal Panoràmic
            </button>
          </div>
        </div>

        <!-- MODE A & C: Sticky Scroll Track Container -->
        <div
          v-if="opt5Mode === 'deck' || opt5Mode === 'carousel'"
          ref="stickyContainerRef"
          class="scroll-track-container"
        >
          <div class="sticky-viewport">
            <div class="carousel-hud">
              <div class="hud-left">
                <span class="hud-indicator">
                  Pilar {{ currentCarouselIndex + 1 }} de {{ pillarsData.length }} •
                  {{ activeDeckPillar.tag }}
                </span>
                <div class="hud-pills">
                  <button
                    v-for="(pilar, idx) in pillarsData"
                    :key="pilar.id"
                    type="button"
                    class="hud-dot"
                    :class="['dot-' + pilar.theme, { active: currentCarouselIndex === idx }]"
                    :title="'Anar al pilar ' + pilar.tag"
                    @click="scrollToDeckStep(idx)"
                  >
                    <span class="dot-inner"></span>
                    <span class="dot-label">{{ pilar.tag }}</span>
                  </button>
                </div>
              </div>
              <span class="hud-hint">Desplaça cap avall ↓</span>
            </div>

            <!-- SUB-MODE 1: DECK (Cards in depth, clean transition without overlap) -->
            <div v-if="opt5Mode === 'deck'" class="deck-stage-wrapper">
              <div class="deck-stage">
                <article
                  v-for="(pilar, idx) in pillarsData"
                  :key="pilar.id"
                  class="deck-card"
                  :class="['card-' + pilar.theme, { 'is-current': currentCarouselIndex === idx }]"
                  :style="getDeckCardStyle(idx)"
                >
                  <div class="deck-card-grid">
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
                    <div class="deck-content-side">
                      <div class="deck-card-badge-row">
                        <span class="minimal-tag" :class="'tag-' + pilar.theme">{{
                          pilar.tag
                        }}</span>
                        <span class="deck-card-counter">0{{ idx + 1 }} / 04</span>
                      </div>
                      <h3 class="deck-card-title">{{ pilar.title }}</h3>
                      <p class="deck-card-text">{{ pilar.punchline }}</p>
                      <div class="deck-card-footer">
                        <span class="metric-highlight">+ {{ pilar.metric }}</span>
                        <span class="deck-card-note">Hàbit diari clau</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <!-- SUB-MODE 2: HORIZONTAL CAROUSEL (Fixed across all viewport widths including 2560px) -->
            <div
              v-else-if="opt5Mode === 'carousel'"
              ref="sliderRef"
              class="horizontal-slider"
              :style="{ transform: `translateX(-${horizontalTranslatePx}px)` }"
            >
              <article
                v-for="pilar in pillarsData"
                :key="pilar.id"
                class="carousel-card"
                :class="'card-' + pilar.theme"
              >
                <div class="carousel-card-inner">
                  <div
                    class="carousel-bit-box"
                    :class="{ 'carousel-bit-sport': pilar.animation === 'Sport_Loop' }"
                  >
                    <RiveCanvas
                      :src="bitCompletRivUrl"
                      :animation="pilar.animation"
                      fit="contain"
                      :alignment="pilar.animation === 'Sport_Loop' ? 'bottomCenter' : 'center'"
                      class="bit-rive"
                    />
                  </div>
                  <div class="carousel-info">
                    <span class="minimal-tag" :class="'tag-' + pilar.theme">{{ pilar.tag }}</span>
                    <h3 class="carousel-title">{{ pilar.title }}</h3>
                    <p class="carousel-text">{{ pilar.punchline }}</p>
                    <div class="carousel-metric">
                      <span class="metric-highlight">+ {{ pilar.metric }}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        <!-- MODE B: Cascada Vertical Neta (Non-sticky vertical stream, one above another with zero overlap) -->
        <div v-else-if="opt5Mode === 'cascade'" class="cascade-stage">
          <div class="cascade-timeline-spine"></div>
          <div class="cascade-cards-list">
            <article
              v-for="(pilar, idx) in pillarsData"
              :key="pilar.id"
              class="cascade-card"
              :class="'card-' + pilar.theme"
            >
              <div class="cascade-node-marker" :class="'node-' + pilar.theme">
                <span>0{{ idx + 1 }}</span>
              </div>
              <div class="cascade-card-content">
                <div class="cascade-visual">
                  <div
                    class="bit-visual-box bit-box-cascade"
                    :class="{ 'bit-box-cascade-sport': pilar.animation === 'Sport_Loop' }"
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
                <div class="cascade-text">
                  <span class="minimal-tag" :class="'tag-' + pilar.theme">{{ pilar.tag }}</span>
                  <h3 class="cascade-title">{{ pilar.title }}</h3>
                  <p class="cascade-desc">{{ pilar.punchline }}</p>
                  <div class="cascade-metric">
                    <span class="metric-highlight">+ {{ pilar.metric }}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>

    <BitspaceFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import BitspaceNavBar from '@/components/views/BitspaceNavBar.vue'
import BitspaceFooter from '@/components/views/BitspaceFooter.vue'
import RiveCanvas from '@/components/common/RiveCanvas.vue'
import bitCompletRivUrl from '@/assets/animations/BitComplet.riv'

import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'PilarsShowcase',
})

const route = useRoute()
const router = useRouter()

const activeOption = ref(route.query.opt || 'all')
const selectedDockId = ref('detox')

function selectOption(opt) {
  activeOption.value = opt
  router.replace({ query: opt === 'all' ? {} : { opt } })
}

// Pillars data with animations from BitComplet.riv
const pillarsData = [
  {
    id: 'detox',
    theme: 'pink',
    tag: 'DETOX',
    title: 'Desconnexió Digital',
    punchline: 'Menys pantalles, descans profund.',
    metric: 'Temps de calma',
    animation: 'Idle_Movimiento',
  },
  {
    id: 'fitness',
    theme: 'mint',
    tag: 'FITNESS',
    title: 'Activitat Física',
    punchline: 'Moviment diari i vitalitat.',
    metric: 'Energia activa',
    animation: 'Sport_Loop',
  },
  {
    id: 'lectura',
    theme: 'yellow',
    tag: 'LECTURA',
    title: 'Hàbit Lector',
    punchline: 'Moments de lectura serena.',
    metric: 'Concentració',
    animation: 'Read_Loop',
  },
  {
    id: 'focus',
    theme: 'lilac',
    tag: 'FOCUS',
    title: 'Estudi i Treball',
    punchline: 'Sense interrupcions ni avisos.',
    metric: 'Rendiment net',
    animation: ['Study_Intro', 'Study_Loop'],
  },
]

const timelineData = [
  {
    id: 't-fit',
    theme: 'mint',
    time: 'MATÍ',
    title: 'Moviment',
    action: "Desperta't amb energia activa.",
    animation: 'Sport_Loop',
  },
  {
    id: 't-foc',
    theme: 'lilac',
    time: 'TARDA',
    title: 'Focus',
    action: 'Feina i estudi sense pantalles buides.',
    animation: ['Study_Intro', 'Study_Loop'],
  },
  {
    id: 't-lec',
    theme: 'yellow',
    time: 'VESPRE',
    title: 'Lectura',
    action: 'Calma mental abans de tancar el dia.',
    animation: 'Read_Loop',
  },
  {
    id: 't-det',
    theme: 'pink',
    time: 'NIT',
    title: 'Detox',
    action: 'Mòbil lluny per a un descans real.',
    animation: 'Idle_Movimiento',
  },
]

const activeDockPillar = computed(() => {
  return pillarsData.find((p) => p.id === selectedDockId.value) || pillarsData[0]
})

// Option 5: Modes & Scroll-driven Deck / Carousel implementation
const opt5Mode = ref('deck') // 'deck' | 'cascade' | 'carousel'
const stickyContainerRef = ref(null)
const sliderRef = ref(null)
const scrollProgress = ref(0)
const horizontalTranslatePx = ref(0)

const currentCarouselIndex = computed(() => {
  const idx = Math.round(scrollProgress.value * (pillarsData.length - 1))
  return Math.min(Math.max(idx, 0), pillarsData.length - 1)
})

const activeDeckPillar = computed(() => {
  return pillarsData[currentCarouselIndex.value] || pillarsData[0]
})

function getDeckCardStyle(idx) {
  // Continuous target index from 0.0 to 3.0
  const targetStep = scrollProgress.value * (pillarsData.length - 1)
  const offset = targetStep - idx

  // Current active card in the focal center
  if (Math.abs(offset) < 0.03) {
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
    const translateX = dist * 140 // enters horizontally from 140px to the right
    const scale = 1 - dist * 0.05 // 1.0 down to 0.95
    const opacity = Math.max(1 - dist * 1.3, 0)
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
    const translateX = -dist * 140 // exits horizontally 140px to the left
    const scale = 1 - dist * 0.06 // 1.0 down to 0.94
    const opacity = Math.max(1 - dist * 1.4, 0)
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
  const scrollTop = window.scrollY + rect.top - 90
  const scrollableDistance = container.offsetHeight - window.innerHeight + 90
  const targetScroll = scrollTop + (stepIdx / (pillarsData.length - 1)) * scrollableDistance
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

  // Horizontal translation calculation: works universally across all screen widths (including 2560px ultra-wide)
  const cardW = window.innerWidth <= 960 ? 320 : 440
  const gap = window.innerWidth <= 960 ? 24 : 36
  const totalTravelDistance = (pillarsData.length - 1) * (cardW + gap)
  horizontalTranslatePx.value = clampedProgress * totalTravelDistance
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
.pilars-showcase-page {
  min-height: 100vh;
  background: var(--bg-gradient);
  display: flex;
  flex-direction: column;
}

/* ========================================================
   Hero & Filter Navigation
   ======================================================== */
.showcase-hero {
  padding: 8rem 1.5rem 3rem;
  text-align: center;
}

.hero-inner {
  max-width: 900px;
  margin: 0 auto;
}

.hero-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--text-primary);
  margin-bottom: 0.85rem;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--text-secondary);
  max-width: 650px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

/* Options Selector Nav */
.options-nav {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem;
  background: var(--bg-surface-glass);
  backdrop-filter: blur(14px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-subtle);
  flex-wrap: wrap;
  justify-content: center;
}

.opt-btn {
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-secondary);
  padding: 0.55rem 1.15rem;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.opt-btn:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.7);
}

.opt-btn.active {
  background: var(--text-primary);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(24, 24, 27, 0.15);
}

/* ========================================================
   Common Section Styles
   ======================================================== */
.showcase-content {
  flex: 1;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 2rem 1.5rem 8rem;
}

.opt-section {
  margin-bottom: 7rem;
  padding-top: 2rem;
  border-top: 1px dashed rgba(24, 24, 27, 0.1);
}

.opt-section:first-of-type {
  border-top: none;
  padding-top: 0;
}

.opt-label-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
}

.opt-number {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.4rem;
}

.opt-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.opt-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
}

/* Minimal Tags */
.minimal-tag {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  display: inline-block;
  margin-bottom: 0.6rem;
}

.tag-pink {
  background: var(--bit-pink-soft);
  color: #db2777;
}

.tag-mint {
  background: var(--bit-mint-soft);
  color: #15803d;
}

.tag-yellow {
  background: var(--bit-yellow-soft);
  color: #a16207;
}

.tag-lilac {
  background: var(--bit-lilac-soft);
  color: #6d28d9;
}

/* ========================================================
   3D Sphere / Ball Design (Pure CSS Glass & Gradient)
   ======================================================== */
.sphere {
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
  border: 1.5px solid rgba(24, 24, 27, 0.85); /* fine black contour */
  box-sizing: border-box;
}

/* Highlight reflection on top curved edge */
.sphere::before {
  content: '';
  position: absolute;
  top: 12%;
  left: 20%;
  width: 32%;
  height: 24%;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0) 75%
  );
  transform: rotate(-35deg);
  pointer-events: none;
}

/* Core Colors using radial gradients for 3D volume */
.sphere-pink {
  background: radial-gradient(
    circle at 35% 30%,
    #ffffff 0%,
    #ffd5ea 30%,
    #ffbcdf 60%,
    #f49bc9 100%
  );
  box-shadow:
    0 12px 28px rgba(255, 188, 223, 0.6),
    inset 0 -8px 14px rgba(219, 39, 119, 0.25);
}

.sphere-mint {
  background: radial-gradient(
    circle at 35% 30%,
    #ffffff 0%,
    #d4f5d0 30%,
    #ade5a8 60%,
    #8fdb89 100%
  );
  box-shadow:
    0 12px 28px rgba(173, 229, 168, 0.6),
    inset 0 -8px 14px rgba(22, 163, 74, 0.25);
}

.sphere-yellow {
  background: radial-gradient(
    circle at 35% 30%,
    #ffffff 0%,
    #fef7c3 30%,
    #fde68a 60%,
    #facc15 100%
  );
  box-shadow:
    0 12px 28px rgba(253, 230, 138, 0.6),
    inset 0 -8px 14px rgba(202, 138, 4, 0.25);
}

.sphere-lilac {
  background: radial-gradient(
    circle at 35% 30%,
    #ffffff 0%,
    #eae6ff 30%,
    #c3bbff 60%,
    #a89bf9 100%
  );
  box-shadow:
    0 12px 28px rgba(195, 187, 255, 0.6),
    inset 0 -8px 14px rgba(109, 40, 217, 0.25);
}

/* Sphere Sizes */
.sphere-medium {
  width: 72px;
  height: 72px;
}

.sphere-large {
  width: 130px;
  height: 130px;
}

.sphere-huge {
  width: 170px;
  height: 170px;
}

/* Floating Animations */
.sphere-float-slow {
  animation: floatOrb 5s ease-in-out infinite;
}

.sphere-float-medium {
  animation: floatOrb 4s ease-in-out infinite 0.7s;
}

.sphere-float-fast {
  animation: floatOrb 3.5s ease-in-out infinite 1.4s;
}

@keyframes floatOrb {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* ========================================================
   Rive Bit Animation Containers
   ======================================================== */
.bit-visual-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bit-rive {
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.bit-box-wide {
  width: 150px;
  height: 130px;
  filter: drop-shadow(0 8px 16px rgba(24, 24, 27, 0.08));
}

.bit-box-square {
  width: 120px;
  height: 105px;
  margin-bottom: 0.75rem;
  filter: drop-shadow(0 6px 14px rgba(24, 24, 27, 0.08));
}

.bit-box-sport {
  width: 140px;
  height: 135px;
  margin-top: -32px;
  margin-bottom: 0.25rem;
  z-index: 5;
  filter: drop-shadow(0 8px 18px rgba(24, 24, 27, 0.1));
}

.bit-top {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bit-box-stage {
  width: 175px;
  height: 155px;
  filter: drop-shadow(0 12px 24px rgba(24, 24, 27, 0.1));
}

.bit-box-stage-sport {
  width: 200px;
  height: 195px;
  margin-top: -35px;
  margin-bottom: -10px;
  z-index: 5;
  filter: drop-shadow(0 14px 28px rgba(24, 24, 27, 0.12));
}

.peek-bit-wrapper {
  position: absolute;
  top: -65px;
  left: 50%;
  transform: translateX(-50%);
  width: 105px;
  height: 100px;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 3;
  pointer-events: none;
  filter: drop-shadow(0 8px 16px rgba(24, 24, 27, 0.12));
}

.peek-card:hover .peek-bit-wrapper {
  transform: translateX(-50%) translateY(-10px) scale(1.06);
}

.timeline-bit-wrap {
  width: 105px;
  height: 95px;
  margin: 0.5rem auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 6px 14px rgba(24, 24, 27, 0.08));
}

.timeline-bit-sport {
  width: 140px;
  height: 140px;
  margin: -24px auto 0.25rem;
  z-index: 5;
  filter: drop-shadow(0 10px 20px rgba(24, 24, 27, 0.12));
}

.bit-box-deck {
  width: 190px;
  height: 170px;
  filter: drop-shadow(0 12px 28px rgba(24, 24, 27, 0.1));
}

.bit-box-deck-sport {
  width: 220px;
  height: 220px;
  margin-top: -50px;
  margin-bottom: -15px;
  z-index: 5;
  filter: drop-shadow(0 14px 32px rgba(24, 24, 27, 0.14));
}

.carousel-bit-box {
  width: 190px;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 12px 28px rgba(24, 24, 27, 0.1));
}

.carousel-bit-sport {
  width: 220px;
  height: 220px;
  margin-top: -60px;
  margin-bottom: 0.25rem;
  z-index: 5;
  filter: drop-shadow(0 14px 32px rgba(24, 24, 27, 0.14));
}

.bit-box-cascade {
  width: 140px;
  height: 125px;
  filter: drop-shadow(0 8px 18px rgba(24, 24, 27, 0.08));
}

.bit-box-cascade-sport {
  width: 170px;
  height: 165px;
  margin-top: -40px;
  margin-bottom: -10px;
  z-index: 5;
  filter: drop-shadow(0 12px 24px rgba(24, 24, 27, 0.12));
}

/* ========================================================
   1. BENTO GRID STYLES
   ======================================================== */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.bento-card {
  background: #ffffff;
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--border-subtle);
  padding: 2.25rem;
  box-shadow: var(--shadow-subtle);
  display: flex;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: visible;
}

.bento-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(241, 178, 195, 0.25);
  border-color: rgba(24, 24, 27, 0.16);
}

.bento-wide {
  grid-column: span 2;
  align-items: center;
  justify-content: space-between;
}

.bento-wide .sphere {
  width: 100px;
  height: 100px;
}

.bento-square {
  grid-column: span 1;
  flex-direction: column;
  justify-content: space-between;
}

.bento-square .sphere {
  width: 80px;
  height: 80px;
}

.bento-heading {
  font-family: 'Baloo 2', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
}

.bento-sub {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
}

/* ========================================================
   2. DOCK INTERACTIU STYLES
   ======================================================== */
.dock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

.dock-bar {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.85rem;
  background: #ffffff;
  border: 1.5px solid var(--border-subtle);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-subtle);
}

.dock-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-secondary);
  padding: 0.65rem 1.25rem;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.25s ease;
}

.dock-btn:hover {
  background: #fdfafc;
  color: var(--text-primary);
}

.dock-btn.active {
  background: var(--text-primary);
  color: #ffffff;
}

.dock-sphere-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid rgba(24, 24, 27, 0.4);
}

.dot-pink {
  background: #ffbcdf;
}
.dot-mint {
  background: #ade5a8;
}
.dot-yellow {
  background: #fde68a;
}
.dot-lilac {
  background: #c3bbff;
}

.dock-stage-card {
  width: 100%;
  max-width: 780px;
  background: #ffffff;
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--border-subtle);
  padding: 3.5rem 3rem;
  box-shadow: 0 20px 50px rgba(241, 178, 195, 0.2);
  display: flex;
  align-items: center;
  gap: 3.5rem;
}

.stage-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.stage-claim {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.stage-metric {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1rem;
  background: #fdfafc;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--text-primary);
}

.metric-plus {
  color: #16a34a;
}

/* Stage Transitions */
.dock-fade-enter-active,
.dock-fade-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.dock-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.dock-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ========================================================
   3. PEEK-A-BOO STYLES
   ======================================================== */
.peek-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding-top: 2.5rem; /* space for the peeking sphere */
}

.peek-card {
  background: #ffffff;
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--border-subtle);
  padding: 2.5rem 1.75rem 2rem;
  position: relative;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow-subtle);
}

.peek-sphere-wrapper {
  position: absolute;
  top: -36px;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.sphere-peek {
  width: 72px;
  height: 72px;
}

.peek-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(241, 178, 195, 0.25);
  border-color: rgba(24, 24, 27, 0.16);
}

.peek-card:hover .peek-sphere-wrapper {
  transform: translateX(-50%) translateY(-10px) scale(1.06);
}

.peek-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.peek-text {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* ========================================================
   4. TIMELINE / ROUTINE STYLES
   ======================================================== */
.timeline-container {
  position: relative;
  padding: 2rem 0;
}

.timeline-track {
  position: absolute;
  top: 50%;
  left: 5%;
  right: 5%;
  height: 3px;
  background: linear-gradient(
    90deg,
    var(--bit-mint) 0%,
    var(--bit-lilac) 35%,
    var(--bit-yellow) 70%,
    var(--bit-pink) 100%
  );
  transform: translateY(-50%);
  border-radius: var(--radius-full);
  z-index: 1;
}

.timeline-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  position: relative;
  z-index: 2;
}

.timeline-card {
  background: #ffffff;
  border: 1.5px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: var(--shadow-subtle);
  transition: transform 0.3s ease;
  overflow: visible;
}

.timeline-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(241, 178, 195, 0.2);
}

.timeline-step-badge {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
}

.timeline-sphere-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.timeline-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.timeline-sub {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* ========================================================
   5. MAZO DE CARTES AL SCROLL (STACKING DECK) & CARRUSEL
   ======================================================== */
.scroll-carousel-section {
  position: relative;
}

.deck-mode-toggle {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  background: #ffffff;
  padding: 0.35rem;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--border-subtle);
  box-shadow: var(--shadow-subtle);
  margin-top: 1.5rem;
  gap: 0.35rem;
}

.mode-pill-btn {
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-secondary);
  padding: 0.5rem 1.1rem;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.mode-pill-btn:hover {
  color: var(--text-primary);
  background: #f4f4f5;
}

.mode-pill-btn.active {
  background: var(--text-primary);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(24, 24, 27, 0.16);
}

.scroll-track-container {
  /* Height determines how much vertical scroll distance moves the deck */
  height: 320vh;
  position: relative;
}

.sticky-viewport {
  position: sticky;
  top: 90px;
  height: calc(100vh - 120px);
  min-height: 540px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.carousel-hud {
  max-width: 1040px;
  width: 100%;
  margin: 0 auto 2rem;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.hud-left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-subtle);
}

.hud-pills {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.hud-dot {
  background: #ffffff;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  padding: 0.35rem 0.75rem;
  font-family: inherit;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.hud-dot:hover {
  background: #f4f4f5;
  color: var(--text-primary);
}

.hud-dot.active {
  background: var(--text-primary);
  color: #ffffff;
  border-color: var(--text-primary);
  box-shadow: 0 4px 10px rgba(24, 24, 27, 0.12);
}

.dot-inner {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
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

.hud-hint {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-muted);
  animation: bounceHint 2s infinite ease-in-out;
  white-space: nowrap;
}

@keyframes bounceHint {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
}

/* --------------------------------------------------------
   Deck Mode Styles (Cards in depth, clean transition)
   -------------------------------------------------------- */
.deck-stage-wrapper {
  position: relative;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
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
  padding: 2.5rem 3.5rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  will-change: transform, opacity;
  overflow: visible;
}

.deck-card-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  gap: 3rem;
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
  margin-bottom: 0.9rem;
}

.deck-card-counter {
  font-family: 'Baloo 2', sans-serif;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.deck-card-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: 2.2rem;
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

/* --------------------------------------------------------
   Cascade Mode Styles (Vertical Stream)
   -------------------------------------------------------- */
.cascade-stage {
  max-width: 780px;
  margin: 3.5rem auto 5rem;
  position: relative;
  padding: 0 1rem;
}

.cascade-timeline-spine {
  position: absolute;
  top: 40px;
  bottom: 40px;
  left: 38px;
  width: 3px;
  background: linear-gradient(180deg, #ffbcdf 0%, #ade5a8 33%, #fde68a 66%, #c3bbff 100%);
  opacity: 0.4;
  border-radius: var(--radius-full);
}

.cascade-cards-list {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: relative;
}

.cascade-card {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--border-subtle);
  box-shadow: var(--shadow-subtle);
  padding: 2.25rem 2.75rem;
  position: relative;
  margin-left: 65px;
  overflow: visible;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.cascade-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 45px rgba(24, 24, 27, 0.08);
}

.cascade-node-marker {
  position: absolute;
  left: -83px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ffffff;
  border: 2.5px solid var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--text-primary);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.cascade-card-content {
  display: grid;
  grid-template-columns: 160px 1fr;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
}

.cascade-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.cascade-desc {
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin-bottom: 1.25rem;
  line-height: 1.5;
}

/* --------------------------------------------------------
   Horizontal Carousel Mode Styles
   -------------------------------------------------------- */
.horizontal-slider {
  display: flex;
  gap: 2.25rem;
  padding: 40px 4vw 20px;
  transition: transform 0.1s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
}

.carousel-card {
  width: 440px;
  flex-shrink: 0;
  background: #ffffff;
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--border-subtle);
  box-shadow: 0 20px 50px rgba(241, 178, 195, 0.22);
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: visible;
}

.carousel-card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.carousel-sphere-box {
  margin-bottom: 2rem;
}

.carousel-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.carousel-text {
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.carousel-metric {
  font-size: 0.88rem;
  font-weight: 800;
  color: #16a34a;
  background: #f0fdf4;
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
}

/* ========================================================
   Responsive Media Queries
   ======================================================== */
@media (max-width: 960px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
  .bento-wide,
  .bento-square {
    grid-column: span 1;
  }

  .peek-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem 1.25rem;
  }

  .timeline-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  .timeline-track {
    display: none;
  }

  .dock-stage-card {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    padding: 2.5rem 1.5rem;
  }

  .carousel-card {
    width: 320px;
    padding: 2rem 1.5rem;
  }

  .deck-stage-wrapper {
    height: 440px;
    padding: 0 1rem;
  }
  .deck-card {
    padding: 2rem;
  }
  .deck-card-grid {
    grid-template-columns: 140px 1fr;
    gap: 1.75rem;
  }
  .deck-card-title {
    font-size: 1.75rem;
  }

  .cascade-card {
    padding: 2rem 1.5rem;
  }
  .cascade-card-content {
    grid-template-columns: 120px 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 640px) {
  .peek-grid {
    grid-template-columns: 1fr;
  }

  .timeline-grid {
    grid-template-columns: 1fr;
  }

  .dock-bar {
    flex-wrap: wrap;
    justify-content: center;
  }

  .deck-stage-wrapper {
    height: 520px;
  }
  .deck-card {
    padding: 2rem 1.25rem;
  }
  .deck-card-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    text-align: center;
  }
  .deck-content-side {
    text-align: center;
  }
  .deck-card-badge-row {
    justify-content: center;
    gap: 1rem;
  }
  .deck-card-footer {
    justify-content: center;
  }
  .deck-card-title {
    font-size: 1.5rem;
  }

  .cascade-card {
    margin-left: 0;
    margin-top: 1rem;
  }
  .cascade-timeline-spine {
    display: none;
  }
  .cascade-node-marker {
    position: static;
    transform: none;
    margin-bottom: 1rem;
  }
  .cascade-card-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.25rem;
  }
  .cascade-visual {
    display: flex;
    justify-content: center;
  }
}
</style>
