<template>
  <section id="showcase" class="showcase-section">
    <div class="showcase-container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">{{ t('rebrand_showcase_title') }}</h2>
        <p class="section-subtitle">{{ t('rebrand_showcase_subtitle') }}</p>
      </div>

      <!-- Video Showcase Container -->
      <div class="video-card-shell">
        <div class="video-card-header">
          <div class="window-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <div class="window-title">bitspace-isometric-room.mp4</div>
        </div>
        <div class="video-wrapper">
          <video
            class="showcase-video"
            :src="showcaseVideoUrl"
            autoplay
            loop
            muted
            playsinline
            aria-label="Showcase de BitSpace"
          ></video>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import showcaseVideoUrl from '@/assets/animations/bitspace_showcase.mp4'

const { t } = useI18n()
</script>

<style scoped>
.showcase-section {
  position: relative;
  padding: 6rem 1.5rem;
}

.showcase-container {
  max-width: 1040px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header */
.section-header {
  text-align: center;
  max-width: 680px;
  margin-bottom: 3.5rem;
}

.section-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Video Card Shell */
.video-card-shell {
  width: 100%;
  background: #ffffff;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(241, 178, 195, 0.22);
  border: 1.5px solid rgba(255, 255, 255, 0.9);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.video-card-shell:hover {
  transform: translateY(-3px);
  box-shadow: 0 28px 70px rgba(241, 178, 195, 0.3);
}

.video-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.5rem;
  background: #fdfafc;
  border-bottom: 1px solid rgba(24, 24, 27, 0.06);
}

.window-dots {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-red {
  background: #ffb5c8;
}

.dot-yellow {
  background: #fde68a;
}

.dot-green {
  background: #ade5a8;
}

.window-title {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.02em;
}

.video-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #f1e7fb;
  overflow: hidden;
}

.showcase-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Responsive */
@media (max-width: 640px) {
  .showcase-section {
    padding: 4rem 1rem;
  }

  .video-card-shell {
    border-radius: var(--radius-lg);
  }

  .video-card-header {
    padding: 0.65rem 1rem;
  }
}
</style>
