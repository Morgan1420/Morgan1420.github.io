<template>
  <div class="waitlist-page">
    <!-- Minimal Header: No banners, no nav menus, just brand identity and language switcher -->
    <header class="waitlist-header">
      <router-link :to="`/${currentLang}`" class="header-brand" :aria-label="t('rebrand_waitlist_hero_back')">
        <img src="/logoBit.png" alt="BitSpace" class="header-logo" width="36" height="36" />
        <span class="brand-text">BitSpace</span>
      </router-link>

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
    </header>

    <!-- Main Standalone Hero Container -->
    <main class="waitlist-main">
      <div class="waitlist-container">
        <div class="waitlist-hero-card">
          <!-- Top Badge -->
          <div class="waitlist-badge">
            <span class="badge-dot"></span>
            <span>{{ t('rebrand_waitlist_hero_badge') }}</span>
          </div>

          <!-- Catchy Hero Title & Subtitle -->
          <h1 class="waitlist-title" v-html="t('rebrand_waitlist_hero_title')"></h1>
          <p class="waitlist-subtitle">{{ t('rebrand_waitlist_hero_subtitle') }}</p>

          <!-- Core Lead Capture Form -->
          <form class="waitlist-form" @submit.prevent="submitForm">
            <div class="input-wrap">
              <svg
                class="email-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                v-model="email"
                type="email"
                required
                :placeholder="t('rebrand_waitlist_placeholder')"
                class="waitlist-input"
                :disabled="loading"
                aria-label="Email"
                autocomplete="email"
              />
            </div>

            <div class="btn-bit-anchor">
              <!-- Perched Bit companion perched directly on top of the button -->
              <div class="bit-attached">
                <RiveCanvas
                  :src="respiracionRivUrl"
                  animation="respiracion"
                  state-machine="Idle"
                  fit="contain"
                  alignment="bottomCenter"
                  class="bit-rive"
                />
              </div>

              <button type="submit" class="waitlist-btn" :disabled="loading || !email">
                <span v-if="!loading">{{ t('rebrand_waitlist_btn') }}</span>
                <span v-else class="btn-spinner"></span>
                <svg
                  v-if="!loading"
                  class="btn-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </form>

          <!-- Feedback Alert Messages -->
          <transition name="fade">
            <div v-if="feedbackMessage" class="feedback-msg" :class="feedbackStatus" role="alert">
              <svg
                v-if="feedbackStatus === 'success'"
                class="feedback-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <svg
                v-else-if="feedbackStatus === 'exists'"
                class="feedback-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <svg
                v-else
                class="feedback-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{{ feedbackMessage }}</span>
            </div>
          </transition>

          <!-- Store Platform Pills -->
          <div class="platforms-note">
            <div class="platform-pill">
              <svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.77 1.05-1.84.93-2.91-.91.04-2.02.61-2.67 1.37-.58.68-1.09 1.77-.95 2.81 1.02.08 2.06-.5 2.69-1.27z"
                />
              </svg>
              <span>iOS App Store</span>
            </div>
            <div class="platform-pill">
              <svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M3.609 1.814L13.793 12 3.61 22.186a2.02 2.02 0 0 1-.22-.93V2.744c0-.348.08-.67.219-.93zm11.248 11.25l2.25 2.25-10.74 6.2a1.85 1.85 0 0 1-.72.22l9.21-8.67zm0-2.128L5.647 2.266c.22-.09.47-.14.72-.14l10.74 6.2-2.25 2.25zm1.414 1.064l2.87-1.657a1.99 1.99 0 0 1 0 3.314l-2.87-1.657z"
                />
              </svg>
              <span>Google Play</span>
            </div>
            <span class="platform-badge-soon">{{ t('rebrand_waitlist_platforms') }}</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Clean Minimal Footer -->
    <footer class="waitlist-footer">
      <router-link :to="`/${currentLang}`" class="footer-back-link">
        <svg class="back-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>{{ t('rebrand_waitlist_hero_back') }}</span>
      </router-link>
      <span class="footer-copy">© 2026 BitSpace</span>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import RiveCanvas from '@/components/common/RiveCanvas.vue'
import respiracionRivUrl from '@/assets/animations/respiracion.riv'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const SCRIPT_BASE =
  'https://script.google.com/macros/s/AKfycbyiPoDCZKIAY0nMLcXIAfiAWbdfNLb2IgAWXmAYnGbTfxPzqvS0UaDiQAKgpcgKyt6uCA/exec'
const LANG_STORAGE_KEY = 'bitspace_lang'

const currentLang = computed(() => {
  const lang = route.params.lang || locale.value
  return ['es', 'ca', 'en'].includes(lang) ? lang : 'ca'
})

function setLanguage(newLang) {
  if (newLang === currentLang.value) return
  locale.value = newLang
  try {
    localStorage.setItem(LANG_STORAGE_KEY, newLang)
  } catch {
    // localStorage unavailable
  }
  const currentPath = route.path
  const targetPath = currentPath.replace(/^\/(?:ca|es|en)/, `/${newLang}`)
  router.push(targetPath)
}

const email = ref('')
const loading = ref(false)
const feedbackKey = ref('')
const feedbackCustomMessage = ref('')
const feedbackStatus = ref('') // 'success' | 'exists' | 'error'
let activeCleanup = null

const feedbackMessage = computed(() => {
  if (feedbackKey.value) {
    return t(feedbackKey.value)
  }
  return feedbackCustomMessage.value
})

onUnmounted(() => {
  if (activeCleanup) {
    activeCleanup()
  }
})

function makeCallbackName() {
  return '__waitlistCB_' + Math.random().toString(36).slice(2)
}

function submitForm() {
  const cleanEmail = email.value.trim()
  if (!cleanEmail || loading.value) return

  loading.value = true
  feedbackKey.value = ''
  feedbackCustomMessage.value = ''

  if (activeCleanup) {
    activeCleanup()
  }

  const cbName = makeCallbackName()
  let script = null

  const cleanup = () => {
    try {
      delete window[cbName]
    } catch {
      window[cbName] = undefined
    }
    if (script && script.parentNode) {
      script.parentNode.removeChild(script)
    }
    activeCleanup = null
  }
  activeCleanup = cleanup

  const timeout = setTimeout(() => {
    cleanup()
    loading.value = false
    feedbackStatus.value = 'error'
    feedbackKey.value = 'rebrand_waitlist_error'
  }, 10000)

  window[cbName] = (res) => {
    clearTimeout(timeout)
    cleanup()
    loading.value = false

    if (res && res.result === 'success') {
      feedbackStatus.value = 'success'
      feedbackKey.value = 'rebrand_waitlist_success'
      email.value = ''
    } else if (res && res.result === 'exists') {
      feedbackStatus.value = 'exists'
      feedbackKey.value = 'rebrand_waitlist_exists'
    } else {
      feedbackStatus.value = 'error'
      if (res && res.message) {
        feedbackCustomMessage.value = res.message
      } else {
        feedbackKey.value = 'rebrand_waitlist_error'
      }
    }
  }

  script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = `${SCRIPT_BASE}?email=${encodeURIComponent(cleanEmail)}&callback=${cbName}`
  script.async = true
  script.onerror = () => {
    clearTimeout(timeout)
    cleanup()
    loading.value = false
    feedbackStatus.value = 'error'
    feedbackKey.value = 'rebrand_waitlist_error'
  }

  document.body.appendChild(script)
}
</script>

<style scoped>
.waitlist-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--bg-gradient);
  box-sizing: border-box;
}

/* Minimal Top Bar */
.waitlist-header {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.75rem 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 10;
}

.header-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.header-brand:hover {
  transform: translateY(-1px);
}

.header-logo {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.brand-text {
  font-family: 'Baloo 2', sans-serif;
  font-size: 1.55rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

/* Language Switcher */
.lang-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
}

.lang-btn {
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.2rem 0.35rem;
  border-radius: var(--radius-xs);
  transition: color 0.15s ease;
}

.lang-btn.active {
  color: var(--text-primary);
  background: rgba(173, 229, 168, 0.35);
}

.lang-btn:hover:not(.active) {
  color: var(--text-primary);
}

.lang-divider {
  font-size: 0.75rem;
  color: var(--border-subtle);
}

/* Main Hero Area */
.waitlist-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem 3rem;
  box-sizing: border-box;
}

.waitlist-container {
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
}

.waitlist-hero-card {
  background: #ffffff;
  padding: 3.75rem 3rem;
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--border-subtle);
  box-shadow: 0 24px 60px rgba(241, 178, 195, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Background glows */
.waitlist-hero-card::before {
  content: '';
  position: absolute;
  top: -60px;
  right: -60px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: var(--bit-mint-soft);
  filter: blur(50px);
  pointer-events: none;
}

.waitlist-hero-card::after {
  content: '';
  position: absolute;
  bottom: -60px;
  left: -60px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: var(--bit-pink-soft);
  filter: blur(50px);
  pointer-events: none;
}

/* Badge */
.waitlist-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.95rem;
  background: var(--bit-mint-soft);
  border: 1px solid rgba(173, 229, 168, 0.55);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 800;
  color: #15803d;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.7);
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.25);
    opacity: 0.75;
  }
}

/* Title & Subtitle */
.waitlist-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  font-weight: 800;
  line-height: 1.18;
  color: var(--text-primary);
  margin-bottom: 1.15rem;
  letter-spacing: -0.015em;
  max-width: 700px;
}

.waitlist-title :deep(.highlight) {
  color: #e879a9;
  background: transparent;
  display: inline-block;
}

.waitlist-subtitle {
  font-size: clamp(1.05rem, 2vw, 1.22rem);
  color: var(--text-secondary);
  max-width: 620px;
  margin: 0 auto 2.5rem;
  line-height: 1.65;
}

/* Form */
.waitlist-form {
  width: 100%;
  max-width: 520px;
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  margin-top: 1.25rem;
  position: relative;
  z-index: 2;
}

.input-wrap {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.email-icon {
  position: absolute;
  left: 1.25rem;
  width: 18px;
  height: 18px;
  color: var(--text-muted);
  pointer-events: none;
}

.waitlist-input {
  width: 100%;
  padding: 0.95rem 1.25rem 0.95rem 3rem;
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-primary);
  background: #fdfafc;
  border: 1.5px solid rgba(24, 24, 27, 0.12);
  border-radius: var(--radius-full);
  outline: none;
  transition: all 0.25s ease;
  box-sizing: border-box;
}

.waitlist-input:focus {
  border-color: var(--bit-pink);
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(241, 178, 195, 0.25);
}

.btn-bit-anchor {
  position: relative;
  display: inline-flex;
  justify-content: center;
}

.bit-attached {
  position: absolute;
  bottom: calc(100% - 14px);
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 80px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  filter: drop-shadow(0 6px 12px rgba(241, 178, 195, 0.45));
  pointer-events: none;
  z-index: 3;
}

.bit-rive {
  width: 100%;
  height: 100%;
}

.waitlist-btn {
  background: #ade5a8;
  color: #18181b;
  border: none;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 800;
  padding: 0.95rem 1.75rem;
  border-radius: var(--radius-full);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 22px rgba(173, 229, 168, 0.45);
}

.waitlist-btn:hover:not(:disabled) {
  background: #98de92;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(173, 229, 168, 0.6);
}

.waitlist-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.waitlist-btn:hover:not(:disabled) .btn-arrow {
  transform: translateX(3px);
}

.btn-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Feedback Messages */
.feedback-msg {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.65rem 1.25rem;
  border-radius: var(--radius-full);
  margin-bottom: 1.5rem;
}

.feedback-msg.success {
  background: var(--bit-mint-soft);
  color: #0f766e;
}

.feedback-msg.exists {
  background: #fef3c7;
  color: #92400e;
}

.feedback-msg.error {
  background: var(--bit-pink-soft);
  color: #b91c1c;
}

.feedback-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* Platforms Note */
.platforms-note {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.platform-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  background: #fdfafc;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  font-weight: 600;
  color: var(--text-secondary);
}

.platform-icon {
  width: 14px;
  height: 14px;
}

.platform-badge-soon {
  font-size: 0.82rem;
  color: var(--text-muted);
}

/* Minimal Footer */
.waitlist-footer {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem 2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.footer-back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--text-secondary);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.15s ease, transform 0.15s ease;
}

.footer-back-link:hover {
  color: var(--text-primary);
  transform: translateX(-2px);
}

.back-arrow {
  width: 15px;
  height: 15px;
}

.footer-copy {
  font-size: 0.82rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .waitlist-header {
    padding: 1.25rem 1.25rem 0.75rem;
  }

  .waitlist-main {
    padding: 1.5rem 1rem 2rem;
  }

  .waitlist-hero-card {
    padding: 2.75rem 1.25rem;
  }

  .waitlist-form {
    flex-direction: column;
    gap: 2.35rem; /* preserves space for the perched Bit on mobile */
  }

  .btn-bit-anchor {
    width: 100%;
  }

  .waitlist-btn {
    width: 100%;
    justify-content: center;
  }

  .waitlist-footer {
    padding: 1rem 1.25rem 1.75rem;
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
}
</style>
