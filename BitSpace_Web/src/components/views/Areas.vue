<template>
  <section id="areas">
    <div class="section-inner">
      <div class="section-header text-center animate-on-scroll">
        <div class="section-badge"><b>✦</b> {{ t('areas_badge') }} <b>✦</b></div>
        <h2 class="section-title">{{ t('areas_title') }}</h2>
        <p class="section-subtitle">{{ t('areas_subtitle') }}</p>
      </div>

      <div class="areas-grid">
        <div class="area-card animate-on-scroll" style="transition-delay:0.1s">
          <span class="area-emoji">📵</span>
          <h3>{{ t('areas_detox_title') }}</h3>
          <p>{{ t('areas_detox_text') }}</p>
          <span class="area-pill">DETOX</span>
        </div>
        <div class="area-card animate-on-scroll" style="transition-delay:0.2s">
          <span class="area-emoji">🏃</span>
          <h3>{{ t('areas_sport_title') }}</h3>
          <p>{{ t('areas_sport_text') }}</p>
          <span class="area-pill">FITNESS</span>
        </div>
        <div class="area-card animate-on-scroll" style="transition-delay:0.3s">
          <span class="area-emoji">📚</span>
          <h3>{{ t('areas_reading_title') }}</h3>
          <p>{{ t('areas_reading_text') }}</p>
          <span class="area-pill">READING</span>
        </div>
        <div class="area-card animate-on-scroll" style="transition-delay:0.4s">
          <span class="area-emoji">🎓</span>
          <h3>{{ t('areas_study_title') }}</h3>
          <p>{{ t('areas_study_text') }}</p>
          <span class="area-pill">FOCUS</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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

  document.querySelectorAll('#areas .animate-on-scroll').forEach(element => observer.observe(element))
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
#areas {
  background: white;
  position: relative;
  overflow: hidden;
  padding: 6rem 2rem;
  font-family: 'Nunito', sans-serif;
}

.section-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 4rem;
}

.text-center {
  text-align: center;
}

.text-center .section-subtitle {
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

.section-subtitle {
  font-size: 1.05rem;
  color: var(--text-mid);
  max-width: 580px;
  font-weight: 500;
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

.areas-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.area-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: var(--shadow-card);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: default;
}

.area-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 40px rgba(45, 27, 78, 0.12);
}

.area-emoji {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.area-card h3 {
  font-family: 'Baloo 2', cursive;
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.area-card p {
  font-size: 0.82rem;
  color: var(--text-mid);
  line-height: 1.6;
}

.area-pill {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 700;
  font-family: 'Press Start 2P', monospace;
}

.area-card:nth-child(1) .area-pill {
  background: #E0F2FE;
  color: #0369A1;
}

.area-card:nth-child(2) .area-pill {
  background: #DCFCE7;
  color: #15803D;
}

.area-card:nth-child(3) .area-pill {
  background: #FEF3C7;
  color: #B45309;
}

.area-card:nth-child(4) .area-pill {
  background: #EDE9FE;
  color: #6D28D9;
}

@media (max-width: 900px) {
  #areas {
    padding: 4rem 1.5rem;
  }

  .areas-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .areas-grid {
    grid-template-columns: 1fr;
  }
}
</style>
