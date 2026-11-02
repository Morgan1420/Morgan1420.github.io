<template>
  <div class="article-page">
    <BitspaceNavBar />

    <main v-if="article" class="article-content-wrapper">
      <div class="article-container">
        <!-- Breadcrumbs Navigation -->
        <nav class="article-breadcrumbs" aria-label="Breadcrumb">
          <router-link :to="`/${currentLang}`" class="breadcrumb-link">{{ tArticle('home') }}</router-link>
          <span class="breadcrumb-sep">/</span>
          <router-link :to="`/${currentLang}/recursos`" class="breadcrumb-link">{{ tArticle('resources') }}</router-link>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">{{ currentCategoryLabel }}</span>
        </nav>

        <!-- Article Header (NO BADGES) -->
        <header class="article-header">
          <div class="article-meta-row">
            <span class="meta-item-category">{{ currentCategoryLabel }}</span>
            <span class="meta-dot">•</span>
            <span class="meta-item-date">{{ formatDate(article.publishDate) }}</span>
            <span class="meta-dot">•</span>
            <span class="meta-item-time">{{ article.readTime }} {{ tArticle('reading_time') }}</span>
          </div>

          <h1 class="article-title">{{ localized(article.title) }}</h1>
          <p class="article-lead">{{ localized(article.summary) }}</p>

          <div class="article-author-box">
            <div class="author-avatar-placeholder">BS</div>
            <div class="author-info">
              <span class="author-name">{{ article.author }}</span>
              <span class="author-role">{{ tArticle('author_role') }}</span>
            </div>
          </div>
        </header>

        <!-- Article Hero Graphic (if exists) -->
        <div v-if="article.heroImage" class="article-hero-graphic-wrap">
          <img
            :src="article.heroImage"
            :alt="localized(article.heroImageAlt) || localized(article.title)"
            class="article-hero-graphic"
            loading="eager"
          />
        </div>

        <!-- Scientific Context Callout -->
        <div v-if="article.scientificNote" class="scientific-context-card">
          <div class="scientific-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div class="scientific-text">
            <strong class="scientific-title">{{ tArticle('scientific_foundation') }}</strong>
            <p>{{ localized(article.scientificNote) }}</p>
          </div>
        </div>

        <!-- Comparison Table (if exists) -->
        <section v-if="article.tableData" class="comparison-section">
          <h2 class="section-title">{{ tArticle('comparative_table_title') }}</h2>
          <div class="table-responsive-wrapper">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th v-for="(h, idx) in article.tableData.headers[currentLang] || article.tableData.headers.ca" :key="idx">
                    {{ h }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rIdx) in article.tableData.rows" :key="rIdx">
                  <td class="col-feature">{{ localized(row.feature) }}</td>
                  <td class="col-competitor">{{ localized(row.competitor) }}</td>
                  <td class="col-bitspace">{{ localized(row.bitspace) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Content Body Sections -->
        <div class="article-body">
          <section
            v-for="(sec, sIdx) in currentSections"
            :key="sIdx"
            class="article-section"
          >
            <h2 class="section-heading">{{ sec.title }}</h2>
            <div class="section-text" v-html="formatContent(sec.content)"></div>
          </section>
        </div>

        <!-- Scientific References Box -->
        <footer v-if="article.references && article.references.length > 0" class="article-references">
          <h3 class="references-title">{{ tArticle('references_title') }}</h3>
          <ul class="references-list">
            <li v-for="(refItem, refIdx) in article.references" :key="refIdx">
              {{ refItem }}
            </li>
          </ul>
        </footer>

        <!-- In-Article Waitlist CTA Banner -->
        <section class="article-cta-box">
          <div class="cta-box-content">
            <h3 class="cta-box-title">{{ tArticle('cta_box_title') }}</h3>
            <p class="cta-box-desc">{{ tArticle('cta_box_desc') }}</p>
            <router-link :to="`/${currentLang}#waitlist`" class="cta-box-button" @click="onCtaClick">
              {{ tArticle('cta_box_btn') }}
            </router-link>
          </div>
        </section>

        <!-- Related Articles (Topic Cluster internal links) -->
        <section v-if="relatedArticles.length > 0" class="related-articles-section">
          <h3 class="related-heading">{{ tArticle('related_title') }}</h3>
          <div class="related-grid">
            <article
              v-for="rel in relatedArticles"
              :key="rel.slug"
              class="related-card"
            >
              <span class="related-category">{{ getCategoryLabel(rel.category) }}</span>
              <h4 class="related-card-title">
                <router-link :to="`/${currentLang}/recursos/${rel.slug}`">
                  {{ localized(rel.title) }}
                </router-link>
              </h4>
              <p class="related-card-desc">{{ localized(rel.summary) }}</p>
            </article>
          </div>
        </section>
      </div>
    </main>

    <!-- 404 / Not Found State -->
    <main v-else class="article-not-found">
      <div class="not-found-inner">
        <h1>{{ tArticle('not_found_title') }}</h1>
        <p>{{ tArticle('not_found_desc') }}</p>
        <router-link :to="`/${currentLang}/recursos`" class="back-btn">
          {{ tArticle('back_to_resources') }}
        </router-link>
      </div>
    </main>

    <BitspaceFooter />
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BitspaceNavBar from './BitspaceNavBar.vue'
import BitspaceFooter from './BitspaceFooter.vue'
import { getArticleBySlug, getRelatedArticles, ARTICLE_CATEGORIES } from '@/data/articles'

defineOptions({
  name: 'ArticleView',
})

const route = useRoute()
const { locale } = useI18n()

const currentLang = computed(() => {
  const lang = locale.value
  return ['es', 'ca', 'en'].includes(lang) ? lang : 'ca'
})

const article = computed(() => {
  const slug = route.params.slug
  return getArticleBySlug(slug)
})

const currentCategoryLabel = computed(() => {
  if (!article.value) return ''
  return getCategoryLabel(article.value.category)
})

function getCategoryLabel(categoryKey) {
  const cat = ARTICLE_CATEGORIES[categoryKey]
  if (!cat) return ''
  return cat.label[currentLang.value] || cat.label.ca
}

const currentSections = computed(() => {
  if (!article.value || !article.value.sections) return []
  return (
    article.value.sections[currentLang.value] ||
    article.value.sections.es ||
    article.value.sections.ca ||
    []
  )
})

const relatedArticles = computed(() => {
  if (!article.value) return []
  return getRelatedArticles(article.value.slug, 2)
})

function localized(field) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[currentLang.value] || field.es || field.ca || ''
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const parts = dateStr.split('-')
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }
  return dateStr
}

function onCtaClick() {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'click_article_waitlist_cta', {
      article_slug: article.value?.slug,
      page_title: document.title,
    })
  }
}

function formatContent(rawContent) {
  if (!rawContent) return ''
  // Convert basic markdown paragraphs and bold/lists to clean HTML
  return rawContent
    .split('\n\n')
    .map((paragraph) => {
      const trimmed = paragraph.trim()
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const items = trimmed
          .split('\n')
          .map((li) => `<li>${formatInline(li.replace(/^[-*]\s+/, ''))}</li>`)
          .join('')
        return `<ul class="article-list">${items}</ul>`
      }
      if (/^\d+\.\s+/.test(trimmed)) {
        const items = trimmed
          .split('\n')
          .map((li) => `<li>${formatInline(li.replace(/^\d+\.\s+/, ''))}</li>`)
          .join('')
        return `<ol class="article-ordered-list">${items}</ol>`
      }
      return `<p>${formatInline(trimmed)}</p>`
    })
    .join('')
}

function formatInline(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
}

const UI_TEXTS = {
  ca: {
    home: 'Inici',
    resources: 'Recursos',
    reading_time: 'de lectura',
    author_role: 'Equip Científic i Mèdic de BitSpace',
    scientific_foundation: 'FONAMENT CIENTÍFIC',
    comparative_table_title: 'Taula Comparativa Resum',
    references_title: 'Referències i Estudis Científics',
    cta_box_title: 'Vols una relació sana amb la teva tecnologia?',
    cta_box_desc: 'Uneix-te a la llista d\'espera de BitSpace per a Android i comença a cuidar el teu Bit cuidant el teu propi temps.',
    cta_box_btn: 'Apunta\'t a la llista d\'espera',
    related_title: 'Articles Relacionats',
    not_found_title: 'Article no trobat',
    not_found_desc: 'L\'article que cerques no existeix o ha canviat de direcció.',
    back_to_resources: 'Tornar a Recursos',
  },
  es: {
    home: 'Inicio',
    resources: 'Recursos',
    reading_time: 'de lectura',
    author_role: 'Equipo Científico y Médico de BitSpace',
    scientific_foundation: 'FUNDAMENTO CIENTÍFICO',
    comparative_table_title: 'Tabla Comparativa Resumen',
    references_title: 'Referencias y Estudios Científicos',
    cta_box_title: '¿Quieres una relación sana con tu tecnología?',
    cta_box_desc: 'Únete a la lista de espera de BitSpace para Android y empieza a cuidar de tu Bit cuidando de tu propio tiempo.',
    cta_box_btn: 'Apuntarme a la lista de espera',
    related_title: 'Artículos Relacionados',
    not_found_title: 'Artículo no encontrado',
    not_found_desc: 'El artículo que buscas no existe o ha cambiado de dirección.',
    back_to_resources: 'Volver a Recursos',
  },
  en: {
    home: 'Home',
    resources: 'Resources',
    reading_time: 'read',
    author_role: 'BitSpace Scientific & Health Team',
    scientific_foundation: 'SCIENTIFIC FOUNDATION',
    comparative_table_title: 'Comparative Summary Table',
    references_title: 'References & Scientific Literature',
    cta_box_title: 'Ready for a healthy relationship with tech?',
    cta_box_desc: 'Join the BitSpace Android waitlist and nurture your digital pet while reclaiming your real-world hours.',
    cta_box_btn: 'Join the waitlist',
    related_title: 'Related Articles',
    not_found_title: 'Article not found',
    not_found_desc: 'The article you are looking for does not exist or has been moved.',
    back_to_resources: 'Back to Resources',
  },
}

function tArticle(key) {
  const langTexts = UI_TEXTS[currentLang.value] || UI_TEXTS.ca
  return langTexts[key] || ''
}

function updatePageSEO() {
  if (!article.value) return
  const currentTitle = localized(article.value.title)
  const currentDesc = localized(article.value.metaDescription) || localized(article.value.summary)
  
  document.title = `${currentTitle} | BitSpace`
  
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) metaDesc.setAttribute('content', currentDesc)
  
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', `${currentTitle} | BitSpace`)
  
  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', currentDesc)
  
  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) {
    canonical.setAttribute(
      'href',
      `https://bitspace.es/${currentLang.value}/recursos/${article.value.slug}`
    )
  }
}

onMounted(() => {
  updatePageSEO()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

watch(
  () => [route.params.slug, locale.value],
  () => {
    updatePageSEO()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
)
</script>

<style scoped>
.article-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-gradient, linear-gradient(180deg, #f7f3fb 0%, #faf6fd 50%, #fdf8fb 100%));
  color: var(--text-primary, #18181b);
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.article-content-wrapper {
  flex: 1;
  padding: 7.5rem 1.5rem 5rem;
}

.article-container {
  max-width: 820px;
  margin: 0 auto;
}

/* Breadcrumbs */
.article-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-muted, #71717a);
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.breadcrumb-link {
  color: var(--text-secondary, #52525b);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: #15803d;
}

.breadcrumb-sep {
  color: #d4d4d8;
}

.breadcrumb-current {
  color: var(--brand-black, #18181b);
  font-weight: 700;
}

/* Header */
.article-header {
  margin-bottom: 2.5rem;
}

.article-meta-row {
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

.meta-item-category {
  color: #27272a;
}

.meta-dot {
  color: #d4d4d8;
}

.article-title {
  font-family: 'Nunito', sans-serif;
  font-size: clamp(2rem, 4vw, 2.85rem);
  font-weight: 900;
  line-height: 1.2;
  color: var(--brand-black, #18181b);
  margin: 0 0 1.25rem 0;
  letter-spacing: -0.02em;
}

.article-lead {
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  line-height: 1.6;
  color: var(--text-secondary, #52525b);
  margin: 0 0 1.75rem 0;
}

.article-author-box {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(24, 24, 27, 0.08);
}

.author-avatar-placeholder {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--brand-mint, #ade5a8);
  color: #18181b;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--brand-black, #18181b);
}

.author-role {
  font-size: 0.82rem;
  color: var(--text-muted, #71717a);
}

/* Article Hero Graphic Banner */
.article-hero-graphic-wrap {
  width: 100%;
  margin: 2rem 0 2.75rem;
  border-radius: var(--radius-xl, 2rem);
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(24, 24, 27, 0.08);
  border: 1.5px solid var(--border-subtle, rgba(24, 24, 27, 0.08));
  background: #ffffff;
}

.article-hero-graphic {
  width: 100%;
  height: auto;
  display: block;
}

/* Scientific Context Card */
.scientific-context-card {
  display: flex;
  gap: 1.25rem;
  background: var(--brand-mint-subtle, #eef9ec);
  border: 1.5px solid var(--brand-mint, #ade5a8);
  border-radius: var(--radius-lg, 1.5rem);
  padding: 1.5rem 1.75rem;
  margin-bottom: 3rem;
  align-items: flex-start;
}

.scientific-icon svg {
  width: 28px;
  height: 28px;
  color: #166534;
  margin-top: 2px;
}

.scientific-title {
  display: block;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  color: #166534;
  margin-bottom: 0.35rem;
}

.scientific-text p {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.55;
  color: #14532d;
}

/* Comparison Section */
.comparison-section {
  margin: 3rem 0;
}

.section-title {
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--brand-black, #18181b);
  margin-bottom: 1.25rem;
}

.table-responsive-wrapper {
  overflow-x: auto;
  border-radius: var(--radius-lg, 1.5rem);
  border: 1.5px solid var(--border-subtle, rgba(24, 24, 27, 0.08));
  background: #ffffff;
  box-shadow: var(--shadow-subtle, 0 4px 20px rgba(24, 24, 27, 0.04));
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.comparison-table th {
  background: #faf6fd;
  padding: 1.1rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 800;
  color: #18181b;
  border-bottom: 2px solid rgba(24, 24, 27, 0.08);
}

.comparison-table td {
  padding: 1.1rem 1.25rem;
  font-size: 0.92rem;
  line-height: 1.5;
  border-bottom: 1px solid rgba(24, 24, 27, 0.06);
}

.col-feature {
  font-weight: 700;
  color: #18181b;
  width: 28%;
}

.col-competitor {
  color: #52525b;
  width: 36%;
}

.col-bitspace {
  color: #15803d;
  font-weight: 700;
  background: rgba(173, 229, 168, 0.12);
  width: 36%;
}

/* Article Body */
.article-body {
  margin: 2.5rem 0 3.5rem;
}

.article-section {
  margin-bottom: 2.5rem;
}

.section-heading {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--brand-black, #18181b);
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.section-text :deep(p) {
  font-size: 1.05rem;
  line-height: 1.75;
  color: #3f3f46;
  margin: 0 0 1.25rem 0;
}

.section-text :deep(strong) {
  color: #18181b;
  font-weight: 800;
}

.section-text :deep(ul),
.section-text :deep(ol) {
  margin: 0 0 1.5rem 1.25rem;
  padding: 0;
}

.section-text :deep(li) {
  font-size: 1.02rem;
  line-height: 1.7;
  color: #3f3f46;
  margin-bottom: 0.5rem;
}

/* References */
.article-references {
  background: #ffffff;
  border: 1px solid rgba(24, 24, 27, 0.08);
  border-radius: var(--radius-md, 1rem);
  padding: 1.75rem 2rem;
  margin: 3.5rem 0;
}

.references-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--brand-black, #18181b);
  margin: 0 0 1rem;
}

.references-list {
  margin: 0;
  padding-left: 1.25rem;
}

.references-list li {
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--text-muted, #71717a);
  margin-bottom: 0.4rem;
}

/* CTA Box */
.article-cta-box {
  background: linear-gradient(135deg, #eef9ec 0%, #fff0f7 100%);
  border: 1.5px solid var(--border-subtle, rgba(24, 24, 27, 0.08));
  border-radius: var(--radius-xl, 2rem);
  padding: 3rem 2rem;
  text-align: center;
  margin: 4rem 0;
  box-shadow: var(--shadow-card, 0 12px 32px rgba(255, 188, 223, 0.35));
}

.cta-box-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-box-title {
  font-size: 1.75rem;
  font-weight: 900;
  color: var(--brand-black, #18181b);
  margin: 0 0 0.85rem;
}

.cta-box-desc {
  font-size: 1.02rem;
  line-height: 1.6;
  color: var(--text-secondary, #52525b);
  margin: 0 0 1.75rem;
}

.cta-box-button {
  display: inline-block;
  background: var(--brand-mint, #ade5a8);
  color: #18181b;
  font-weight: 800;
  font-size: 1rem;
  padding: 0.95rem 2rem;
  border-radius: var(--radius-full, 9999px);
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(173, 229, 168, 0.45);
  transition: all 0.25s ease;
}

.cta-box-button:hover {
  transform: translateY(-2px);
  background: var(--brand-mint-hover, #98de92);
}

/* Related Articles */
.related-articles-section {
  margin: 3.5rem 0 2rem;
}

.related-heading {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--brand-black, #18181b);
  margin-bottom: 1.5rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.related-card {
  background: #ffffff;
  border: 1px solid rgba(24, 24, 27, 0.08);
  border-radius: var(--radius-md, 1rem);
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.related-card:hover {
  transform: translateY(-3px);
  border-color: rgba(173, 229, 168, 0.6);
  box-shadow: 0 8px 24px rgba(24, 24, 27, 0.06);
}

.related-category {
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-muted, #71717a);
  margin-bottom: 0.5rem;
  display: block;
}

.related-card-title {
  font-size: 1.15rem;
  font-weight: 800;
  line-height: 1.35;
  margin: 0 0 0.5rem 0;
}

.related-card-title a {
  color: var(--brand-black, #18181b);
  text-decoration: none;
}

.related-card-title a:hover {
  color: #15803d;
}

.related-card-desc {
  font-size: 0.9rem;
  color: var(--text-secondary, #52525b);
  line-height: 1.5;
  margin: 0;
}

/* 404 */
.article-not-found {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem 1.5rem;
}

.not-found-inner h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.back-btn {
  display: inline-block;
  margin-top: 1.5rem;
  background: var(--brand-mint, #ade5a8);
  color: #18181b;
  padding: 0.8rem 1.6rem;
  border-radius: var(--radius-full, 9999px);
  font-weight: 800;
  text-decoration: none;
}

@media (max-width: 768px) {
  .article-content-wrapper {
    padding-top: 6rem;
  }
  .article-title {
    font-size: 2rem;
  }
  .article-lead {
    font-size: 1.05rem;
  }
  .scientific-context-card {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
