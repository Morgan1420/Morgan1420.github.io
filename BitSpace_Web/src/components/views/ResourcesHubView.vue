<template>
  <div class="resources-hub-page">
    <BitspaceNavBar />

    <header class="hub-hero">
      <div class="hero-container">
        <h1 class="hero-title">{{ tHub('title') }}</h1>
        <p class="hero-subtitle">
          {{ tHub('subtitle') }}
        </p>

        <!-- Category Filters (NO BADGES: clean button pills) -->
        <div class="filters-container">
          <button
            type="button"
            class="filter-btn"
            :class="{ active: selectedCategory === 'all' }"
            @click="selectedCategory = 'all'"
          >
            {{ tHub('filter_all') }}
          </button>
          <button
            type="button"
            class="filter-btn"
            :class="{ active: selectedCategory === 'comparativas' }"
            @click="selectedCategory = 'comparativas'"
          >
            {{ tHub('filter_comparativas') }}
          </button>
          <button
            type="button"
            class="filter-btn"
            :class="{ active: selectedCategory === 'guias' }"
            @click="selectedCategory = 'guias'"
          >
            {{ tHub('filter_guias') }}
          </button>
          <button
            type="button"
            class="filter-btn"
            :class="{ active: selectedCategory === 'tutoriales' }"
            @click="selectedCategory = 'tutoriales'"
          >
            {{ tHub('filter_tutoriales') }}
          </button>
        </div>
      </div>
    </header>

    <main class="hub-content">
      <div class="articles-grid-container">
        <div v-if="filteredArticles.length === 0" class="no-articles-state">
          <p>{{ tHub('no_results') }}</p>
        </div>

        <div v-else class="articles-grid">
          <article
            v-for="article in filteredArticles"
            :key="article.slug"
            class="article-card"
          >
            <div class="card-meta">
              <span class="card-category-text">{{ getCategoryName(article.category) }}</span>
              <span class="meta-separator">•</span>
              <span class="card-date">{{ formatCardDate(article) }}</span>
              <span class="meta-separator">•</span>
              <span class="card-read-time">{{ article.readTime }}</span>
            </div>

            <h2 class="card-title">
              <router-link :to="`/${currentLang}/recursos/${article.slug}`" class="card-title-link">
                {{ article.title[currentLang] || article.title.ca }}
              </router-link>
            </h2>

            <p class="card-summary">
              {{ article.summary[currentLang] || article.summary.ca }}
            </p>

            <div class="card-footer">
              <router-link
                :to="`/${currentLang}/recursos/${article.slug}`"
                class="card-action-link"
              >
                <span>{{ tHub('read_more') }}</span>
                <svg
                  class="action-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </router-link>
            </div>
          </article>
        </div>

        <!-- Conversion CTA Banner to Waitlist -->
        <section class="hub-cta-banner">
          <div class="cta-inner">
            <h2 class="cta-title">{{ tHub('cta_title') }}</h2>
            <p class="cta-desc">{{ tHub('cta_desc') }}</p>
            <router-link :to="`/${currentLang}#waitlist`" class="cta-button">
              {{ tHub('cta_button') }}
            </router-link>
          </div>
        </section>
      </div>
    </main>

    <BitspaceFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BitspaceNavBar from './BitspaceNavBar.vue'
import BitspaceFooter from './BitspaceFooter.vue'
import { ARTICLES, ARTICLE_CATEGORIES } from '@/data/articles'

defineOptions({
  name: 'ResourcesHubView',
})

const { locale } = useI18n()
const selectedCategory = ref('all')

const currentLang = computed(() => {
  const lang = locale.value
  return ['es', 'ca', 'en'].includes(lang) ? lang : 'ca'
})

const filteredArticles = computed(() => {
  if (selectedCategory.value === 'all') {
    return ARTICLES
  }
  return ARTICLES.filter((a) => a.category === selectedCategory.value)
})

function getCategoryName(categoryKey) {
  const cat = ARTICLE_CATEGORIES[categoryKey]
  if (!cat) return ''
  return cat.label[currentLang.value] || cat.label.ca
}

function formatCardDate(article) {
  if (!article || !article.publishDate) return ''
  const parts = article.publishDate.split('-')
  const dateFormatted =
    parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : article.publishDate
  if (article.status === 'scheduled') {
    return `${tHub('scheduled_prefix')} ${dateFormatted}`
  }
  return dateFormatted
}

const UI_TEXTS = {
  ca: {
    title: 'Recursos i Guies de Benestar Digital',
    subtitle:
      'Coneixement rigorós, guies pas a pas i comparatives exhaustives per construir una relació sana i autònoma amb la tecnologia.',
    filter_all: 'Tots els articles',
    filter_comparativas: 'Comparatives',
    filter_guias: 'Guies d\'Hàbits',
    filter_tutoriales: 'Tutorials',
    read_more: 'Llegir article complet',
    no_results: 'No s\'han trobat articles en aquesta categoria.',
    scheduled_prefix: 'Properament:',
    cta_title: 'Vols una eina real per transformar els teus hàbits?',
    cta_desc:
      'BitSpace combina el millor d\'una mascota virtual reactiva amb ciència conductual i eines contra el doomscrolling. Uneix-te a la llista d\'espera per a Android.',
    cta_button: 'Unir-me a la llista d\'espera',
  },
  es: {
    title: 'Recursos y Guías de Bienestar Digital',
    subtitle:
      'Conocimiento riguroso, guías paso a paso y comparativas exhaustivas para construir una relación sana y autónoma con la tecnología.',
    filter_all: 'Todos los artículos',
    filter_comparativas: 'Comparativas',
    filter_guias: 'Guías de Hábitos',
    filter_tutoriales: 'Tutoriales',
    read_more: 'Leer artículo completo',
    no_results: 'No se encontraron artículos en esta categoría.',
    scheduled_prefix: 'Próximamente:',
    cta_title: '¿Buscas una herramienta real para transformar tus hábitos?',
    cta_desc:
      'BitSpace une la calidez de una mascota virtual reactiva con ciencia conductual y herramientas contra el doomscrolling. Apúntate a la lista de espera para Android.',
    cta_button: 'Unirme a la lista de espera',
  },
  en: {
    title: 'Digital Wellbeing Resources & Guides',
    subtitle:
      'Rigorous research, step-by-step guides, and detailed comparisons to build an autonomous, healthy relationship with technology.',
    filter_all: 'All articles',
    filter_comparativas: 'Comparisons',
    filter_guias: 'Habit Guides',
    filter_tutoriales: 'Tutorials',
    read_more: 'Read full article',
    no_results: 'No articles found in this category.',
    scheduled_prefix: 'Coming soon:',
    cta_title: 'Looking for a genuine tool to rewire your digital habits?',
    cta_desc:
      'BitSpace pairs a reactive virtual pet with behavioral science and anti-doomscrolling intervention tools. Join the Android early waitlist.',
    cta_button: 'Join the waitlist',
  },
}

function tHub(key) {
  const langTexts = UI_TEXTS[currentLang.value] || UI_TEXTS.ca
  return langTexts[key] || ''
}
</script>

<style scoped>
.resources-hub-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-gradient, linear-gradient(180deg, #f7f3fb 0%, #faf6fd 50%, #fdf8fb 100%));
  color: var(--text-primary, #18181b);
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Hero Header */
.hub-hero {
  padding: 8rem 1.5rem 3.5rem;
  background: radial-gradient(circle at 50% 0%, rgba(173, 229, 168, 0.18) 0%, transparent 70%);
  text-align: center;
}

.hero-container {
  max-width: 860px;
  margin: 0 auto;
}

.hero-title {
  font-family: 'Nunito', sans-serif;
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  font-weight: 900;
  color: var(--brand-black, #18181b);
  line-height: 1.15;
  margin: 0 0 1.25rem 0;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  color: var(--text-secondary, #52525b);
  line-height: 1.6;
  margin: 0 auto 2.5rem;
  max-width: 680px;
}

/* Category Filters */
.filters-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-btn {
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 0.65rem 1.4rem;
  border-radius: var(--radius-full, 9999px);
  border: 1.5px solid var(--border-subtle, rgba(24, 24, 27, 0.08));
  background: var(--brand-white, #ffffff);
  color: var(--text-secondary, #52525b);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.filter-btn:hover {
  border-color: rgba(24, 24, 27, 0.2);
  color: var(--text-primary, #18181b);
  transform: translateY(-1px);
}

.filter-btn.active {
  background: var(--brand-mint, #ade5a8);
  border-color: var(--brand-mint, #ade5a8);
  color: #18181b;
  box-shadow: 0 4px 14px rgba(173, 229, 168, 0.45);
}

/* Content & Grid */
.hub-content {
  flex: 1;
  padding: 1rem 1.5rem 5rem;
}

.articles-grid-container {
  max-width: 1100px;
  margin: 0 auto;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

/* Article Card */
.article-card {
  background: var(--brand-white, #ffffff);
  border-radius: var(--radius-lg, 1.5rem);
  border: 1.5px solid var(--border-subtle, rgba(24, 24, 27, 0.08));
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;
  box-shadow: var(--shadow-subtle, 0 4px 20px rgba(24, 24, 27, 0.04));
}

.article-card:hover {
  transform: translateY(-4px);
  border-color: rgba(173, 229, 168, 0.6);
  box-shadow: 0 14px 34px rgba(24, 24, 27, 0.08);
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-muted, #71717a);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 1rem;
}

.card-category-text {
  color: #27272a;
}

.meta-separator {
  color: #d4d4d8;
}

.card-read-time {
  color: var(--text-muted, #71717a);
}

.card-title {
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.35;
  margin: 0 0 0.85rem 0;
}

.card-title-link {
  color: var(--brand-black, #18181b);
  text-decoration: none;
  transition: color 0.2s ease;
}

.card-title-link:hover {
  color: #15803d;
}

.card-summary {
  font-size: 0.98rem;
  color: var(--text-secondary, #52525b);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  flex: 1;
}

.card-footer {
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(24, 24, 27, 0.06);
}

.card-action-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 800;
  font-size: 0.95rem;
  color: #18181b;
  text-decoration: none;
  transition: all 0.2s ease;
}

.card-action-link:hover {
  color: #15803d;
  transform: translateX(4px);
}

.action-arrow {
  width: 16px;
  height: 16px;
}

/* Empty State */
.no-articles-state {
  text-align: center;
  padding: 4rem 1rem;
  font-size: 1.1rem;
  color: var(--text-muted, #71717a);
}

/* CTA Banner */
.hub-cta-banner {
  background: linear-gradient(135deg, #eef9ec 0%, #fff0f7 100%);
  border: 1.5px solid var(--border-subtle, rgba(24, 24, 27, 0.08));
  border-radius: var(--radius-xl, 2rem);
  padding: 3.5rem 2rem;
  text-align: center;
  box-shadow: var(--shadow-card, 0 12px 32px rgba(255, 188, 223, 0.35));
}

.cta-inner {
  max-width: 680px;
  margin: 0 auto;
}

.cta-title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 900;
  color: var(--brand-black, #18181b);
  margin: 0 0 1rem;
  line-height: 1.2;
}

.cta-desc {
  font-size: 1.05rem;
  color: var(--text-secondary, #52525b);
  line-height: 1.6;
  margin: 0 0 2rem;
}

.cta-button {
  display: inline-block;
  background: var(--brand-mint, #ade5a8);
  color: #18181b;
  font-weight: 800;
  font-size: 1.05rem;
  padding: 1rem 2.2rem;
  border-radius: var(--radius-full, 9999px);
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(173, 229, 168, 0.45);
  transition: all 0.25s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  background: var(--brand-mint-hover, #98de92);
  box-shadow: 0 12px 28px rgba(173, 229, 168, 0.55);
}

@media (max-width: 768px) {
  .hub-hero {
    padding-top: 6.5rem;
  }
  .articles-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .article-card {
    padding: 1.5rem;
  }
  .hub-cta-banner {
    padding: 2.5rem 1.5rem;
  }
}
</style>
