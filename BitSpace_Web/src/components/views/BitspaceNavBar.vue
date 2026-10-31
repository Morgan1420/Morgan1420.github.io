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
        <a href="#team" class="nav-item" @click.prevent="scrollToSection('team')">
          {{ t('rebrand_nav_team') }}
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

      <!-- Mobile Hamburger Button -->
      <button
        type="button"
        class="mobile-hamburger"
        :class="{ 'is-active': isMobileMenuOpen }"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Obrir menú"
        @click="toggleMobileMenu"
      >
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>
    </div>

    <!-- Mobile Drawer & Overlay -->
    <teleport to="body">
      <transition name="drawer-fade">
        <div v-if="isMobileMenuOpen" class="mobile-drawer-overlay" @click="closeMobileMenu"></div>
      </transition>

      <transition name="drawer-slide">
        <aside
          v-if="isMobileMenuOpen"
          class="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegació"
        >
          <!-- Drawer Header -->
          <div class="drawer-header">
            <span class="drawer-brand">BitSpace</span>
            <button
              type="button"
              class="drawer-close-btn"
              aria-label="Tancar menú"
              @click="closeMobileMenu"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Drawer Navigation Items -->
          <nav class="drawer-nav">
            <a
              href="#showcase"
              class="drawer-nav-item"
              @click.prevent="handleMobileNavClick('showcase')"
            >
              <span class="drawer-item-label">{{ t('rebrand_nav_showcase') }}</span>
              <svg
                class="drawer-item-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
            <a
              href="#pillars"
              class="drawer-nav-item"
              @click.prevent="handleMobileNavClick('pillars')"
            >
              <span class="drawer-item-label">{{ t('rebrand_nav_pillars') }}</span>
              <svg
                class="drawer-item-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
            <a href="#team" class="drawer-nav-item" @click.prevent="handleMobileNavClick('team')">
              <span class="drawer-item-label">{{ t('rebrand_nav_team') }}</span>
              <svg
                class="drawer-item-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </a>
            <a
              :href="prototypeUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="drawer-nav-item drawer-nav-proto"
              @click="closeMobileMenu"
            >
              <span class="drawer-item-label">{{ t('rebrand_nav_prototype') }}</span>
              <svg
                class="drawer-item-external"
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

          <!-- Drawer Footer Area: Language Switcher & CTA -->
          <div class="drawer-footer">
            <div class="drawer-lang-section">
              <span class="drawer-lang-title">Idioma</span>
              <div class="drawer-lang-pills">
                <button
                  type="button"
                  class="drawer-lang-pill"
                  :class="{ active: currentLang === 'ca' }"
                  @click="setLanguage('ca')"
                >
                  Català
                </button>
                <button
                  type="button"
                  class="drawer-lang-pill"
                  :class="{ active: currentLang === 'es' }"
                  @click="setLanguage('es')"
                >
                  Español
                </button>
                <button
                  type="button"
                  class="drawer-lang-pill"
                  :class="{ active: currentLang === 'en' }"
                  @click="setLanguage('en')"
                >
                  English
                </button>
              </div>
            </div>

            <a
              href="#waitlist"
              class="drawer-cta-btn"
              @click.prevent="handleMobileNavClick('waitlist')"
            >
              <span>{{ t('rebrand_nav_waitlist') }}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </aside>
      </transition>
    </teleport>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'BitspaceNavBar',
})

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const prototypeUrl = 'https://prototype.bitspace.es'

const currentLang = computed(() => locale.value)

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  updateBodyScrollLock()
}

function closeMobileMenu() {
  if (!isMobileMenuOpen.value) return
  isMobileMenuOpen.value = false
  updateBodyScrollLock()
}

function updateBodyScrollLock() {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function handleMobileNavClick(id) {
  closeMobileMenu()
  scrollToSection(id)
}

function handleKeyDown(e) {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
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
  window.addEventListener('keydown', handleKeyDown)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeyDown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
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
  font-size: 1.7rem;
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
  color: #18181b;
  background: #ade5a8;
  font-weight: 800;
}

.lang-divider {
  opacity: 0.3;
}

/* CTA */
.btn-nav-cta {
  background: #ade5a8;
  color: #18181b;
  font-size: 0.88rem;
  font-weight: 800;
  padding: 0.55rem 1.15rem;
  border-radius: var(--radius-full);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(173, 229, 168, 0.45);
}

.btn-nav-cta:hover {
  background: #98de92;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(173, 229, 168, 0.6);
}

/* ========================================================
   MOBILE HAMBURGER & SLIDE-OVER DRAWER
   ======================================================== */
.mobile-hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: #ffffff;
  border: 1.5px solid var(--border-subtle);
  border-radius: var(--radius-full);
  cursor: pointer;
  padding: 0;
  box-shadow: var(--shadow-subtle);
  transition: all 0.25s ease;
}

.mobile-hamburger:hover {
  background: #fdfafc;
  transform: translateY(-1px);
}

.hamburger-bar {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-hamburger.is-active .hamburger-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.mobile-hamburger.is-active .hamburger-bar:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.mobile-hamburger.is-active .hamburger-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Drawer Overlay */
.mobile-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(24, 24, 27, 0.45);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 9998;
}

/* Mobile Drawer */
.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(340px, 85vw);
  background: #ffffff;
  z-index: 9999;
  box-shadow: -10px 0 40px rgba(24, 24, 27, 0.16);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.75rem;
  box-sizing: border-box;
  overflow-y: auto;
}

/* Drawer Header */
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border-subtle);
}

.drawer-brand {
  font-family: 'Baloo 2', sans-serif;
  font-weight: 800;
  font-size: 1.75rem;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.drawer-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: #fdfafc;
  border: 1.5px solid var(--border-subtle);
  border-radius: 50%;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.drawer-close-btn svg {
  width: 18px;
  height: 18px;
}

.drawer-close-btn:hover {
  background: #fff0f7;
  color: #db2777;
  border-color: #ffbcdf;
}

/* Drawer Nav Items */
.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 1.75rem 0;
}

.drawer-nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.95rem 1.15rem;
  border-radius: var(--radius-md);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  background: #fdfafc;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.drawer-nav-item:hover,
.drawer-nav-item:active {
  background: var(--brand-mint, #ade5a8);
  border-color: var(--brand-mint, #ade5a8);
  color: #18181b;
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(173, 229, 168, 0.35);
}

.drawer-nav-item:hover .drawer-item-arrow,
.drawer-nav-item:hover .drawer-item-external,
.drawer-nav-item:active .drawer-item-arrow,
.drawer-nav-item:active .drawer-item-external {
  color: #18181b;
}

.drawer-item-arrow {
  width: 18px;
  height: 18px;
  color: var(--text-muted);
}

.drawer-item-external {
  width: 16px;
  height: 16px;
  color: var(--text-muted);
}

/* Drawer Footer */
.drawer-footer {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-subtle);
}

.drawer-lang-section {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.drawer-lang-title {
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.drawer-lang-pills {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.drawer-lang-pill {
  padding: 0.55rem 0;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--border-subtle);
  background: #fdfafc;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.drawer-lang-pill:hover {
  color: var(--text-primary);
  border-color: rgba(24, 24, 27, 0.2);
}

.drawer-lang-pill.active {
  background: #ade5a8;
  border-color: #ade5a8;
  color: #18181b;
  box-shadow: 0 4px 14px rgba(173, 229, 168, 0.45);
  font-weight: 800;
}

/* Drawer CTA */
.drawer-cta-btn {
  background: #ade5a8;
  color: #18181b;
  font-weight: 800;
  font-size: 1rem;
  padding: 0.95rem 1.5rem;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(173, 229, 168, 0.45);
  transition: all 0.25s ease;
}

.drawer-cta-btn svg {
  width: 18px;
  height: 18px;
}

.drawer-cta-btn:hover {
  background: #98de92;
  box-shadow: 0 12px 28px rgba(173, 229, 168, 0.6);
  transform: translateY(-2px);
}

/* Drawer Transitions */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}

.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 860px) {
  .navbar-nav {
    display: none;
  }

  .navbar-actions {
    display: none;
  }

  .mobile-hamburger {
    display: flex;
  }

  .navbar-wrapper,
  .navbar-wrapper.is-scrolled {
    padding: 0.65rem 1rem;
    width: 100%;
    max-width: 100%;
    left: 0;
    right: 0;
    box-sizing: border-box;
  }

  .navbar-container {
    width: 100%;
    max-width: 100%;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
  }

  .navbar-brand {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .navbar-brand {
    font-size: 1.45rem;
  }
}
</style>
