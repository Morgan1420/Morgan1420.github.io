import { createRouter, createWebHistory } from 'vue-router'
import BitspaceHome from '../components/BitspaceHome.vue'
import CreaTuBit from '../components/complex_components/CreaTuBit.vue'
import Games from '../components/views/Games.vue'
import Team from '../components/views/Team.vue'
import Collaborate from '../components/views/Collaborate.vue'
import LanguageWrapper from './LanguageWrapper.vue' // 1. Importa el nuevo componente
import i18n from '../i18n'

// SEO Meta Tags per idioma
const getPageMeta = (lang) => {
  const meta = {
    ca: {
      title: 'BitSpace - Salut Digital | Cuida la teva mascota digital',
      description:
        "BitSpace és una aplicació mòbil que t'ajuda a millorar els teus hàbits de salut cuidant una mascota digital. Millora el teu benestar mentre el teu Bit creix feliç.",
      ogTitle: 'BitSpace - Salut Digital | Cuida la teva mascota digital',
      ogDescription:
        'Millora els teus hàbits de salut cuidant una mascota digital. El teu Bit actuarà com a mirall de la teva salut i benestar.',
    },
    es: {
      title: 'BitSpace - Salud Digital | Cuida tu mascota digital',
      description:
        'BitSpace es una aplicación móvil que te ayuda a mejorar tus hábitos de salud cuidando una mascota digital. Mejora tu bienestar mientras tu Bit crece feliz.',
      ogTitle: 'BitSpace - Salud Digital | Cuida tu mascota digital',
      ogDescription:
        'Mejora tus hábitos de salud cuidando una mascota digital. Tu Bit actuará como un espejo de tu salud y bienestar.',
    },
    en: {
      title: 'BitSpace - Digital Health | Take care of your digital pet',
      description:
        'BitSpace is a mobile app that helps you improve your health habits by caring for a digital pet. Improve your wellbeing while your Bit grows happily.',
      ogTitle: 'BitSpace - Digital Health | Take care of your digital pet',
      ogDescription:
        'Improve your health habits by caring for a digital pet. Your Bit acts as a mirror of your health and wellbeing.',
    },
  }
  return meta[lang] || meta.ca
}

const updateMetaTags = (lang) => {
  const meta = getPageMeta(lang)

  // Update title
  document.title = meta.title

  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', meta.description)
  }

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
    ogUrl.setAttribute('content', `https://bitspace.es/${lang}`)
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
    twitterUrl.setAttribute('content', `https://bitspace.es/${lang}`)
  }

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) {
    canonical.setAttribute('href', `https://bitspace.es/${lang}`)
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
        updateMetaTags(lang)
        return next()
      }
      return next({ path: '/ca' }) // Redirigir a Català por defecto si el idioma no es válido
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: BitspaceHome,
      },
      {
        path: 'games',
        name: 'Games',
        component: Games,
      },
      {
        path: 'team',
        name: 'Team',
        component: Team,
      },
      {
        path: 'collaborate',
        name: 'Collaborate',
        component: Collaborate,
      },
      {
        path: 'crea-tu-bit',
        name: 'CreaTuBit',
        component: CreaTuBit,
      },
    ],
  },
  {
    path: '/',
    redirect: '/ca', // Redirigir la raíz al idioma por defecto (Català)
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
    updateMetaTags(lang)
  }
})

export default router
