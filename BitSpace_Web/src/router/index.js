import { createRouter, createWebHistory } from 'vue-router'
import BitspaceHome from '../components/BitspaceHome.vue'
import LanguageWrapper from './LanguageWrapper.vue' // 1. Importa el nuevo componente
import i18n from '../i18n'

const routes = [
  {
    path: '/:lang',
    component: LanguageWrapper, // 2. Úsalo aquí
    beforeEnter: (to, from, next) => {
      const lang = to.params.lang
      if (['es', 'ca'].includes(lang)) {
        if (i18n.global.locale.value !== lang) {
          i18n.global.locale.value = lang
        }
        return next()
      }
      return next({ path: '/es' }) // Redirigir a español por defecto si el idioma no es válido
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: BitspaceHome
      }
    ]
  },
  {
    path: '/',
    redirect: '/es' // Redirigir la raíz al idioma por defecto
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
