import { createRouter, createWebHistory } from 'vue-router'
import BitspaceHome from '../components/BitspaceHome.vue'
import LanguageWrapper from './LanguageWrapper.vue'
import i18n from '../i18n'
import { getArticleBySlug } from '../data/articles'

const LANG_STORAGE_KEY = 'bitspace_lang'

// Preferred CA/ES/EN language: stored choice first, then browser language, defaulting to Catalan
const getPreferredLang = () => {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY)
    if (stored === 'ca' || stored === 'es' || stored === 'en') {
      return stored
    }
  } catch {
    // localStorage unavailable (e.g. private browsing)
  }

  const browserLang = (typeof navigator !== 'undefined' ? navigator.language : '').toLowerCase()
  if (browserLang.startsWith('es')) {
    return 'es'
  }
  if (browserLang.startsWith('en')) {
    return 'en'
  }
  return 'ca'
}

// SEO Meta Tags per idioma i ruta
const getPageMeta = (lang, currentRoutePath = '') => {
  const cleanPath = (currentRoutePath || (typeof window !== 'undefined' ? window.location.pathname : ''))
    .replace(/^\/(?:ca|es|en)(?:\/|$)/, '')
    .replace(/\/$/, '')

  if (cleanPath === 'recursos') {
    const hubMeta = {
      ca: {
        title: 'Recursos i Guies de Benestar Digital | BitSpace',
        description:
          "Articles, guies de desintoxicació digital, comparatives d'eines i tutorials per crear hàbits saludables amb la tecnologia.",
        ogTitle: 'Recursos i Guies de Benestar Digital | BitSpace',
        ogDescription:
          "Articles, guies de desintoxicació digital, comparatives d'eines i tutorials per crear hàbits saludables amb la tecnologia.",
      },
      es: {
        title: 'Recursos y Guías de Bienestar Digital | BitSpace',
        description:
          'Artículos, guías de desintoxicación digital, comparativas de herramientas y tutoriales para crear hábitos saludables con la tecnología.',
        ogTitle: 'Recursos y Guías de Bienestar Digital | BitSpace',
        ogDescription:
          'Artículos, guías de desintoxicación digital, comparativas de herramientas y tutoriales para crear hábitos saludables con la tecnología.',
      },
      en: {
        title: 'Digital Wellbeing Resources & Guides | BitSpace',
        description:
          'Articles, digital detox guides, tool comparisons, and step-by-step tutorials to build healthy habits with technology.',
        ogTitle: 'Digital Wellbeing Resources & Guides | BitSpace',
        ogDescription:
          'Articles, digital detox guides, tool comparisons, and step-by-step tutorials to build healthy habits with technology.',
      },
    }
    return hubMeta[lang] || hubMeta.ca
  }

  if (cleanPath.startsWith('recursos/')) {
    const slug = cleanPath.replace(/^recursos\//, '')
    const article = getArticleBySlug(slug)
    if (article) {
      const title = article.title[lang] || article.title.es || article.title.ca
      const desc =
        (article.metaDescription && (article.metaDescription[lang] || article.metaDescription.es || article.metaDescription.ca)) ||
        (article.summary && (article.summary[lang] || article.summary.ca)) ||
        ''
      return {
        title: `${title} | BitSpace`,
        description: desc,
        ogTitle: `${title} | BitSpace`,
        ogDescription: desc,
      }
    }
  }

  const meta = {
    ca: {
      title: 'BitSpace - Benestar Digital | Cuida la teva mascota digital',
      description:
        "Cuida la teva mascota digital i millora els teus hàbits de salut. BitSpace gamifica el teu descans, activitat física, lectura i concentració.",
      ogTitle: 'BitSpace - Benestar Digital | Cuida la teva mascota digital',
      ogDescription:
        'Cuida la teva mascota digital i millora els teus hàbits de salut. El teu Bit evoluciona amb el teu progrés real.',
    },
    es: {
      title: 'BitSpace - Bienestar Digital | Cuida tu mascota digital',
      description:
        'Cuida tu mascota digital y mejora tus hábitos de salud. BitSpace gamifica tu desconexión, deporte, lectura y concentración diaria.',
      ogTitle: 'BitSpace - Bienestar Digital | Cuida tu mascota digital',
      ogDescription:
        'Cuida tu mascota digital y mejora tus hábitos de salud. Tu Bit evoluciona con tu bienestar en el mundo real.',
    },
    en: {
      title: 'BitSpace - Digital Wellbeing | Care for your digital pet',
      description:
        'Take care of your digital pet and build healthy habits. BitSpace gamifies your digital detox, fitness, reading and focus.',
      ogTitle: 'BitSpace - Digital Wellbeing | Care for your digital pet',
      ogDescription:
        'Take care of your digital pet and build healthy habits. Your Bit grows as your real-world habits improve.',
    },
  }
  return meta[lang] || meta.ca
}

const updateMetaTags = (lang, currentRoutePath = '') => {
  const meta = getPageMeta(lang, currentRoutePath)

  // Update title
  document.title = meta.title

  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', meta.description)
  }

  // Determine subpath without language prefix (e.g., '' or 'pilars' or 'unsubscribe')
  const cleanPath = (currentRoutePath || window.location.pathname)
    .replace(/^\/(?:ca|es|en)(?:\/|$)/, '')
    .replace(/\/$/, '')
  const subpath = cleanPath ? `/${cleanPath}` : ''

  // Update Open Graph
  let ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) {
    ogTitle.setAttribute('content', meta.ogTitle)
  }

  let ogDescription = document.querySelector('meta[property="og:description"]')
  if (ogDescription) {
    ogDescription.setAttribute('content', meta.ogDescription)
  }

  let ogUrl = document.querySelector('meta[property="og:url"]')
  if (ogUrl) {
    ogUrl.setAttribute('content', `https://bitspace.es/${lang}${subpath}`)
  }

  // Update Twitter Card
  let twitterTitle = document.querySelector('meta[name="twitter:title"]')
  if (twitterTitle) {
    twitterTitle.setAttribute('content', meta.ogTitle)
  }

  let twitterDescription = document.querySelector('meta[name="twitter:description"]')
  if (twitterDescription) {
    twitterDescription.setAttribute('content', meta.ogDescription)
  }

  let twitterUrl = document.querySelector('meta[name="twitter:url"]')
  if (twitterUrl) {
    twitterUrl.setAttribute('content', `https://bitspace.es/${lang}${subpath}`)
  }

  // Update canonical URL (self-referential)
  let canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) {
    canonical.setAttribute('href', `https://bitspace.es/${lang}${subpath}`)
  }

  // Update or synchronize hreflang alternates (self-referential & localized)
  const languages = ['ca', 'es', 'en']
  languages.forEach((altLang) => {
    let altLink = document.querySelector(`link[rel="alternate"][hreflang="${altLang}"]`)
    if (altLink) {
      altLink.setAttribute('href', `https://bitspace.es/${altLang}${subpath}`)
    }
  })

  let xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]')
  if (xDefault) {
    xDefault.setAttribute('href', `https://bitspace.es/ca${subpath}`)
  }

  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', lang)
}

const routes = [
  {
    path: '/:lang',
    component: LanguageWrapper, // 2. Úsalo aquí
    beforeEnter: (to, from, next) => {
      const lang = to.params.lang
      if (['es', 'ca', 'en'].includes(lang)) {
        if (i18n.global.locale.value !== lang) {
          i18n.global.locale.value = lang
        }
        try {
          localStorage.setItem(LANG_STORAGE_KEY, lang)
        } catch {
          // localStorage unavailable (e.g. private browsing)
        }
        updateMetaTags(lang, to.path)
        return next()
      }
      return next({ path: `/${getPreferredLang()}` }) // Idioma no vàlid: usar preferència guardada o del navegador
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: BitspaceHome,
      },
      {
        path: 'pilars',
        name: 'PilarsShowcase',
        component: () => import('../components/views/PilarsShowcase.vue'),
      },
      {
        path: 'recursos',
        name: 'ResourcesHub',
        component: () => import('../components/views/ResourcesHubView.vue'),
      },
      {
        path: 'recursos/:slug',
        name: 'ArticleView',
        component: () => import('../components/views/ArticleView.vue'),
      },
      {
        path: 'unsubscribe',
        name: 'Unsubscribe',
        component: () => import('../components/views/UnsubscribeView.vue'),
      },
    ],
  },
  {
    path: '/recursos',
    redirect: () => ({ path: `/${getPreferredLang()}/recursos` }),
  },
  {
    path: '/recursos/:slug',
    redirect: (to) => ({ path: `/${getPreferredLang()}/recursos/${to.params.slug}` }),
  },
  {
    path: '/unsubscribe',
    redirect: (to) => ({
      path: `/${getPreferredLang()}/unsubscribe`,
      query: to.query,
    }),
  },
  {
    path: '/pilars',
    redirect: () => ({ path: `/${getPreferredLang()}/pilars` }),
  },
  {
    path: '/',
    redirect: () => ({ path: `/${getPreferredLang()}` }), // Idioma per defecte: preferència guardada o del navegador
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }

    return { top: 0, behavior: 'smooth' }
  },
})

// Actualizar meta tags después de cada navegación
router.afterEach((to) => {
  const lang = to.params.lang
  if (lang && ['es', 'ca', 'en'].includes(lang)) {
    updateMetaTags(lang, to.path)
  }

  // Notificar a Google Analytics (GA4) del cambio de página y título en SPA
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: to.fullPath,
    })
  }
})

export default router
