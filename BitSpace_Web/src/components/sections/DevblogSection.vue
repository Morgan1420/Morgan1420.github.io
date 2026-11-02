<template>
  <section id="devblog" class="devblog-section">
    <div class="devblog-container">
      <div class="devblog-card">
        <!-- Visual Preview: Thumbnail / Mockup -->
        <div class="devblog-visual">
          <a
            :href="youtubeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="devblog-thumb-link"
            aria-label="Abrir DevBlog de BitSpace en YouTube"
          >
            <div class="devblog-thumb-wrapper">
              <img
                src="/devlog.png"
                alt="DevBlog BitSpace en YouTube"
                class="devblog-thumb-img"
                loading="lazy"
              />
              <div class="devblog-play-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" class="play-icon" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </a>
        </div>

        <!-- Content Block -->
        <div class="devblog-content">
          <h2 class="devblog-title">
            {{ t('rebrand_devblog_title') }}
          </h2>

          <p class="devblog-subtitle">
            {{ t('rebrand_devblog_subtitle') }}
          </p>

          <div class="devblog-action">
            <a
              :href="youtubeUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-youtube"
            >
              <svg viewBox="0 0 24 24" class="yt-icon" fill="currentColor">
                <path
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                />
              </svg>
              <span>{{ t('rebrand_devblog_button') }}</span>
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
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'DevblogSection',
})

const { t } = useI18n()
const youtubeUrl = 'https://www.youtube.com/@BitSpaceDigitalHealth'
</script>

<style scoped>
.devblog-section {
  position: relative;
  padding: 2rem 1.5rem 2.5rem;
}

.devblog-container {
  max-width: 1040px;
  margin: 0 auto;
}

.devblog-card {
  background: linear-gradient(135deg, #ffffff 0%, #fff7f7 100%);
  padding: 2.75rem 3rem;
  border-radius: var(--radius-xl);
  border: 1.5px solid rgba(239, 68, 68, 0.15);
  box-shadow:
    0 16px 40px rgba(239, 68, 68, 0.08),
    0 4px 12px rgba(24, 24, 27, 0.03);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
}

/* Visual / Thumbnail */
.devblog-visual {
  flex-shrink: 0;
  width: 320px;
  max-width: 100%;
}

.devblog-thumb-link {
  display: block;
  text-decoration: none;
}

.devblog-thumb-wrapper {
  position: relative;
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  border: 1.5px solid rgba(24, 24, 27, 0.08);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.09);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  aspect-ratio: 16 / 9;
  background: #18181b;
}

.devblog-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
}

.devblog-play-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52px;
  height: 52px;
  background: rgba(239, 68, 68, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.5);
  transition: all 0.3s ease;
}

.play-icon {
  width: 22px;
  height: 22px;
  margin-left: 3px;
}

.devblog-thumb-link:hover .devblog-thumb-wrapper {
  transform: translateY(-3px);
  box-shadow: 0 16px 32px rgba(239, 68, 68, 0.22);
}

.devblog-thumb-link:hover .devblog-thumb-img {
  transform: scale(1.04);
}

.devblog-thumb-link:hover .devblog-play-badge {
  transform: translate(-50%, -50%) scale(1.12);
  background: #dc2626;
}

/* Content */
.devblog-content {
  flex: 1;
}

.devblog-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  line-height: 1.25;
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.01em;
}

.devblog-subtitle {
  font-size: 1.02rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

.devblog-action {
  display: flex;
  align-items: center;
}

.btn-youtube {
  background: #ef4444;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 800;
  padding: 0.9rem 1.85rem;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  white-space: nowrap;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.38);
}

.btn-youtube:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(239, 68, 68, 0.5);
}

.yt-icon {
  width: 22px;
  height: 22px;
}

.btn-arrow {
  width: 17px;
  height: 17px;
  transition: transform 0.2s ease;
}

.btn-youtube:hover .btn-arrow {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 860px) {
  .devblog-card {
    flex-direction: column;
    text-align: center;
    padding: 2.25rem 1.5rem;
    gap: 1.75rem;
  }

  .devblog-visual {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  .devblog-action {
    justify-content: center;
  }

  .btn-youtube {
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }
}
</style>
