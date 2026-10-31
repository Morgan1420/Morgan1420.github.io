<template>
  <header class="navbar-wrapper" :class="{ 'is-scrolled': isScrolled }">
    <div class="navbar-container">
      <!-- Logo Brand -->
      <a href="#hero" class="navbar-brand" @click.prevent="scrollToSection('hero')">
        <span class="brand-text">BitSpace</span>
      </a>

      <!-- Navigation Links -->
      <nav class="navbar-nav">
        <a href="#showcase" class="nav-item" @click.prevent="scrollToSection('showcase')">
          {{ t('rebrand_nav_showcase') }}
        </a>
        <a href="#pillars" class="nav-item" @click.prevent="scrollToSection('pillars')">
          {{ t('rebrand_nav_pillars') }}
        </a>
        <a
          :href="prototypeUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-item nav-proto"
        >
          {{ t('rebrand_nav_prototype') }}
          <svg
            class="external-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </nav>

      <!-- Right Actions: Language Switcher + CTA -->
      <div class="navbar-actions">
        <!-- Language Selector -->
        <div class="lang-switch">
          <button
            type="button"
            class="lang-btn"
            :class="{ active: currentLang === 'ca' }"
            @click="setLanguage('ca')"
            aria-label="Català"
          >
            CA
          </button>
          <span class="lang-divider">/</span>
          <button
            type="button"
            class="lang-btn"
            :class="{ active: currentLang === 'es' }"
            @click="setLanguage('es')"
            aria-label="Español"
          >
            ES
          </button>
          <span class="lang-divider">/</span>
          <button
            type="button"
            class="lang-btn"
            :class="{ active: currentLang === 'en' }"
            @click="setLanguage('en')"
            aria-label="English"
          >
            EN
          </button>
        </div>

        <!-- Waitlist CTA Button -->
        <a href="#waitlist" class="btn-nav-cta" @click.prevent="scrollToSection('waitlist')">
          {{ t('rebrand_nav_waitlist') }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const isScrolled = ref(false)
const prototypeUrl = 'https://prototype.bitspace.es'

const currentLang = computed(() => locale.value)

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function setLanguage(lang) {
  if (locale.value === lang) return
  locale.value = lang
  try {
    localStorage.setItem('bitspace_lang', lang)
  } catch {
    // localStorage no disponible
  }

  // Actualizar ruta si contiene prefijo :lang
  const currentPath = route.path
  const segments = currentPath.split('/').filter(Boolean)
  if (segments.length > 0 && ['ca', 'es', 'en'].includes(segments[0])) {
    segments[0] = lang
    router.push('/' + segments.join('/'))
  } else {
    router.push('/' + lang)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.25rem 1.5rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.navbar-wrapper.is-scrolled {
  padding: 0.75rem 1.5rem;
}

.navbar-container {
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1.25rem;
  background: var(--bg-surface-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid var(--border-subtle);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-subtle);
  transition: all 0.3s ease;
}

.navbar-wrapper.is-scrolled .navbar-container {
  box-shadow: 0 8px 30px rgba(24, 24, 27, 0.08);
  border-color: rgba(24, 24, 27, 0.12);
  background: rgba(255, 255, 255, 0.88);
}

/* Brand */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 1.35rem;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

/* Nav links */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-item {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-secondary);
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  text-decoration: none;
}

.nav-item:hover {
  background: var(--brand-mint, #ade5a8);
  color: #18181b;
}

.nav-proto {
  color: var(--text-primary);
}

.nav-proto:hover {
  background: var(--brand-mint, #ade5a8);
  color: #18181b;
}

.external-icon {
  width: 13px;
  height: 13px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.nav-item:hover .external-icon {
  opacity: 1;
}

/* Actions */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.lang-switch {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
}

.lang-btn {
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.2rem 0.3rem;
  border-radius: var(--radius-xs);
  transition: all 0.2s ease;
}

.lang-btn:hover {
  color: var(--text-primary);
}

.lang-btn.active {
  color: var(--text-primary);
  background: rgba(241, 178, 195, 0.25);
  font-weight: 800;
}

.lang-divider {
  opacity: 0.3;
}

/* CTA */
.btn-nav-cta {
  background: var(--text-primary);
  color: var(--bg-surface);
  font-size: 0.88rem;
  font-weight: 700;
  padding: 0.55rem 1.15rem;
  border-radius: var(--radius-full);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.btn-nav-cta:hover {
  background: #27272a;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(24, 24, 27, 0.2);
}

/* Responsive */
@media (max-width: 860px) {
  .navbar-nav {
    display: none;
  }

  .navbar-wrapper {
    padding: 0.75rem 1rem;
  }
}

@media (max-width: 480px) {
  .btn-nav-cta {
    padding: 0.45rem 0.85rem;
    font-size: 0.8rem;
  }

  .navbar-brand {
    font-size: 1.2rem;
  }
}
</style>
