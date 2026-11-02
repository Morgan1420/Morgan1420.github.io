<template>
  <section id="resources" class="resources-section">
    <div class="resources-container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">{{ tSec('title') }}</h2>
        <p class="section-subtitle">
          {{ tSec('subtitle') }}
        </p>
      </div>

      <!-- Featured Articles Grid (NO BADGES) -->
      <div class="resources-grid">
        <article
          v-for="item in featuredArticles"
          :key="item.slug"
          class="resource-card"
        >
          <div class="card-meta">
            <span class="card-category">{{ getCategoryLabel(item.category) }}</span>
            <span class="meta-dot">•</span>
            <span class="card-date">{{ formatDate(item.publishDate) }}</span>
            <span class="meta-dot">•</span>
            <span class="card-time">{{ item.readTime }}</span>
          </div>

          <h3 class="card-title">
            <router-link :to="`/${currentLang}/recursos/${item.slug}`" class="title-link">
              {{ localized(item.title) }}
            </router-link>
          </h3>

          <p class="card-summary">
            {{ localized(item.summary) }}
          </p>

          <div class="card-footer">
            <router-link
              :to="`/${currentLang}/recursos/${item.slug}`"
              class="read-link"
            >
              <span>{{ tSec('read_article') }}</span>
              <svg
                class="arrow-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </router-link>
          </div>
        </article>
      </div>

      <!-- View All Resources CTA Button -->
      <div class="resources-cta-wrap">
        <router-link :to="`/${currentLang}/recursos`" class="btn-view-all">
          <span>{{ tSec('view_all_btn') }}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ARTICLES, ARTICLE_CATEGORIES } from '@/data/articles'

defineOptions({
  name: 'ResourcesSection',
})

const { locale } = useI18n()

const currentLang = computed(() => {
  const lang = locale.value
  return ['es', 'ca', 'en'].includes(lang) ? lang : 'ca'
})

// Highlight this week's active releases: Opal (today) and Doomscrolling (Thursday)
const featuredArticles = computed(() => {
  const selectedSlugs = [
    'bitspace-vs-opal',
    'como-frenar-el-doomscrolling-tiktok-instagram',
  ]
  return ARTICLES.filter((a) => selectedSlugs.includes(a.slug))
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  const parts = dateStr.split('-')
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }
  return dateStr
}

function getCategoryLabel(categoryKey) {
  const cat = ARTICLE_CATEGORIES[categoryKey]
  if (!cat) return ''
  return cat.label[currentLang.value] || cat.label.ca
}

function localized(field) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[currentLang.value] || field.es || field.ca || ''
}

const UI_TEXTS = {
  ca: {
    title: 'Aprèn i Millora els teus Hàbits',
    subtitle:
      'Guies basades en investigació universitària, comparatives transparents i tutorials pràctics per acompanyar el teu creixement.',
    read_article: 'Llegir article',
    view_all_btn: 'Explorar tots els recursos i comparatives',
  },
  es: {
    title: 'Aprende y Optimiza tus Hábitos',
    subtitle:
      'Guías basadas en investigación universitaria, comparativas transparentes y tutoriales prácticos para acompañar tu crecimiento.',
    read_article: 'Leer artículo',
    view_all_btn: 'Explorar todos los recursos y comparativas',
  },
  en: {
    title: 'Learn & Optimize Your Habits',
    subtitle:
      'Research-backed guides, transparent software comparisons, and practical tutorials to support your daily digital growth.',
    read_article: 'Read article',
    view_all_btn: 'Explore all resources and comparisons',
  },
}

function tSec(key) {
  const langTexts = UI_TEXTS[currentLang.value] || UI_TEXTS.ca
  return langTexts[key] || ''
}
</script>

<style scoped>
.resources-section {
  width: 100%;
  padding: 6.5rem 1.5rem;
  background: linear-gradient(180deg, rgba(247, 243, 251, 0.4) 0%, rgba(238, 249, 236, 0.5) 100%);
  position: relative;
  overflow: hidden;
}

.resources-container {
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header */
.section-header {
  text-align: center;
  max-width: 720px;
  margin-bottom: 3.5rem;
}

.section-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: clamp(2.1rem, 4.2vw, 2.9rem);
  font-weight: 800;
  line-height: 1.2;
  color: var(--text-primary, #18181b);
  margin-bottom: 0.85rem;
  letter-spacing: -0.01em;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary, #52525b);
  line-height: 1.6;
}

/* Grid */
.resources-grid {
  width: 100%;
  max-width: 960px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
  margin-bottom: 3.5rem;
}

/* Resource Card (NO BADGES) */
.resource-card {
  background: #ffffff;
  border-radius: var(--radius-xl, 2rem);
  border: 1.5px solid var(--border-subtle, rgba(24, 24, 27, 0.08));
  padding: 2.25rem 2rem 2rem;
  box-shadow: 0 16px 40px rgba(24, 24, 27, 0.04);
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.resource-card:hover {
  transform: translateY(-8px);
  border-color: rgba(173, 229, 168, 0.9);
  box-shadow: 0 24px 50px rgba(173, 229, 168, 0.22);
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted, #71717a);
  margin-bottom: 1.15rem;
}

.card-category {
  color: #27272a;
}

.meta-dot {
  color: #d4d4d8;
}

.card-title {
  font-size: 1.28rem;
  font-weight: 800;
  line-height: 1.35;
  margin: 0 0 0.85rem;
}

.title-link {
  color: var(--text-primary, #18181b);
  text-decoration: none;
  transition: color 0.2s ease;
}

.title-link:hover {
  color: #15803d;
}

.card-summary {
  font-size: 0.96rem;
  color: var(--text-secondary, #52525b);
  line-height: 1.6;
  margin: 0 0 1.75rem;
  flex: 1;
}

.card-footer {
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(24, 24, 27, 0.06);
}

.read-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.95rem;
  font-weight: 800;
  color: #18181b;
  text-decoration: none;
  transition: all 0.2s ease;
}

.read-link:hover {
  color: #15803d;
  transform: translateX(4px);
}

.arrow-icon {
  width: 17px;
  height: 17px;
}

/* Button View All */
.resources-cta-wrap {
  text-align: center;
}

.btn-view-all {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  background: #ffffff;
  color: #18181b;
  font-weight: 800;
  font-size: 1rem;
  padding: 0.95rem 2.2rem;
  border-radius: var(--radius-full, 9999px);
  border: 1.5px solid var(--border-subtle, rgba(24, 24, 27, 0.12));
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.25s ease;
}

.btn-view-all:hover {
  transform: translateY(-2px);
  background: var(--brand-mint, #ade5a8);
  border-color: var(--brand-mint, #ade5a8);
  box-shadow: 0 10px 26px rgba(173, 229, 168, 0.45);
}

.btn-view-all svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 980px) {
  .resources-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
