<template>
  <div class="unsubscribe-page">
    <!-- Main Navigation Bar -->
    <BitspaceNavBar />

    <main class="unsubscribe-main">
      <div class="unsubscribe-container">
        <div class="unsubscribe-card">
          <!-- Animated Mascot Bit -->
          <div class="bit-container">
            <RiveCanvas
              :src="respiracionRivUrl"
              animation="respiracion"
              state-machine="Idle"
              fit="contain"
              alignment="bottomCenter"
              class="bit-rive"
            />
          </div>

          <!-- Headings -->
          <h1 class="unsub-title">{{ t('rebrand_unsub_title') }}</h1>
          <p class="unsub-subtitle">{{ t('rebrand_unsub_subtitle') }}</p>

          <!-- Form: visible unless already unsubscribed successfully -->
          <form
            v-if="feedbackStatus !== 'success'"
            class="unsub-form"
            @submit.prevent="submitUnsubscribe"
          >
            <label for="unsub-email" class="unsub-label">
              {{ t('rebrand_unsub_confirm_label') }}
            </label>

            <div class="input-wrap">
              <svg
                class="email-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                id="unsub-email"
                v-model="email"
                type="email"
                required
                :placeholder="t('rebrand_unsub_placeholder')"
                class="unsub-input"
                :disabled="loading"
                autocomplete="email"
              />
            </div>

            <button
              type="submit"
              class="unsub-btn"
              :disabled="loading || !email.trim()"
            >
              <span v-if="!loading">{{ t('rebrand_unsub_btn') }}</span>
              <span v-else class="btn-spinner"></span>
              <svg
                v-if="!loading"
                class="btn-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>

          <!-- Feedback Messages -->
          <transition name="fade">
            <div
              v-if="feedbackMessage"
              class="feedback-msg"
              :class="feedbackStatus"
            >
              <!-- Success Icon -->
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

              <!-- Warning / Info Icon -->
              <svg
                v-else-if="feedbackStatus === 'already' || feedbackStatus === 'not_found'"
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

              <!-- Error Icon -->
              <svg
                v-else
                class="feedback-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>

              <span>{{ feedbackMessage }}</span>
            </div>
          </transition>

          <!-- Back to Home Action -->
          <router-link :to="`/${currentLang}`" class="back-home-link">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="back-icon"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>{{ t('rebrand_unsub_back_home') }}</span>
          </router-link>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <BitspaceFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BitspaceNavBar from '@/components/views/BitspaceNavBar.vue'
import BitspaceFooter from '@/components/views/BitspaceFooter.vue'
import RiveCanvas from '@/components/common/RiveCanvas.vue'
import respiracionRivUrl from '@/assets/animations/respiracion.riv'

defineOptions({
  name: 'UnsubscribeView',
})

const { t, locale } = useI18n()
const route = useRoute()

const SCRIPT_BASE =
  'https://script.google.com/macros/s/AKfycbyiPoDCZKIAY0nMLcXIAfiAWbdfNLb2IgAWXmAYnGbTfxPzqvS0UaDiQAKgpcgKyt6uCA/exec'

const email = ref('')
const loading = ref(false)
const feedbackKey = ref('')
const feedbackCustomMessage = ref('')
const feedbackStatus = ref('') // 'success' | 'already' | 'not_found' | 'error'
let activeCleanup = null

const currentLang = computed(() => locale.value || 'ca')

const feedbackMessage = computed(() => {
  if (feedbackKey.value) {
    return t(feedbackKey.value)
  }
  return feedbackCustomMessage.value
})

onMounted(() => {
  // Pre-fill email from query param (?email=...)
  if (route.query && route.query.email) {
    const queryEmail = String(route.query.email).trim()
    if (queryEmail) {
      email.value = queryEmail
    }
  }
})

onUnmounted(() => {
  if (activeCleanup) {
    activeCleanup()
  }
})

function makeCallbackName() {
  return '__unsubCB_' + Math.random().toString(36).slice(2)
}

function submitUnsubscribe() {
  const cleanEmail = email.value.trim()
  if (!cleanEmail || loading.value) return

  loading.value = true
  feedbackKey.value = ''
  feedbackCustomMessage.value = ''
  feedbackStatus.value = ''

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
    feedbackKey.value = 'rebrand_unsub_error'
  }, 10000)

  window[cbName] = (res) => {
    clearTimeout(timeout)
    cleanup()
    loading.value = false

    if (res && res.result === 'success') {
      feedbackStatus.value = 'success'
      feedbackKey.value = 'rebrand_unsub_success'
    } else if (res && (res.result === 'already_unsubscribed' || res.result === 'already')) {
      feedbackStatus.value = 'already'
      feedbackKey.value = 'rebrand_unsub_already'
    } else if (res && (res.result === 'not_found' || res.result === 'notfound')) {
      feedbackStatus.value = 'not_found'
      feedbackKey.value = 'rebrand_unsub_not_found'
    } else {
      feedbackStatus.value = 'error'
      feedbackKey.value = 'rebrand_unsub_error'
    }
  }

  script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = `${SCRIPT_BASE}?action=unsubscribe&email=${encodeURIComponent(
    cleanEmail
  )}&callback=${cbName}`
  script.async = true
  script.onerror = () => {
    clearTimeout(timeout)
    cleanup()
    loading.value = false
    feedbackStatus.value = 'error'
    feedbackKey.value = 'rebrand_unsub_error'
  }

  document.body.appendChild(script)
}
</script>

<style scoped>
.unsubscribe-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #faf8fa;
}

.unsubscribe-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 1.5rem 5rem;
}

.unsubscribe-container {
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
}

.unsubscribe-card {
  background: #ffffff;
  padding: 3.5rem 2.5rem;
  border-radius: var(--radius-xl, 32px);
  border: 1.5px solid var(--border-subtle, rgba(24, 24, 27, 0.08));
  box-shadow: 0 24px 60px rgba(241, 178, 195, 0.22);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Subtle background accent glow */
.unsubscribe-card::before {
  content: '';
  position: absolute;
  top: -60px;
  right: -60px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: var(--bit-mint-soft, #eaf8e7);
  filter: blur(40px);
  pointer-events: none;
}

.unsubscribe-card::after {
  content: '';
  position: absolute;
  bottom: -60px;
  left: -60px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: var(--bit-pink-soft, #fdedf1);
  filter: blur(40px);
  pointer-events: none;
}


.bit-container {
  width: 110px;
  height: 95px;
  margin-bottom: 1rem;
  filter: drop-shadow(0 8px 16px rgba(241, 178, 195, 0.35));
  position: relative;
  z-index: 2;
}

.bit-rive {
  width: 100%;
  height: 100%;
}

.unsub-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  font-weight: 800;
  line-height: 1.2;
  color: var(--text-primary, #18181b);
  margin-bottom: 0.85rem;
  position: relative;
  z-index: 2;
}

.unsub-subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary, #52525b);
  max-width: 520px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  position: relative;
  z-index: 2;
}

/* Form */
.unsub-form {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
}

.unsub-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary, #52525b);
  text-align: left;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.email-icon {
  position: absolute;
  left: 1.25rem;
  width: 18px;
  height: 18px;
  color: var(--text-muted, #a1a1aa);
  pointer-events: none;
}

.unsub-input {
  width: 100%;
  padding: 0.95rem 1.25rem 0.95rem 3rem;
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-primary, #18181b);
  background: #fdfafc;
  border: 1.5px solid rgba(24, 24, 27, 0.12);
  border-radius: var(--radius-full, 9999px);
  outline: none;
  transition: all 0.25s ease;
}

.unsub-input:focus {
  border-color: #f1b2c3;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(241, 178, 195, 0.25);
}

.unsub-btn {
  background: #f1b2c3;
  color: #18181b;
  border: none;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 800;
  padding: 0.95rem 1.75rem;
  border-radius: var(--radius-full, 9999px);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 22px rgba(241, 178, 195, 0.45);
}

.unsub-btn:hover:not(:disabled) {
  background: #ea9fb4;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(241, 178, 195, 0.6);
}

.unsub-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.unsub-btn:hover:not(:disabled) .btn-arrow {
  transform: translateX(3px);
}

.btn-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(24, 24, 27, 0.25);
  border-top-color: #18181b;
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
  gap: 0.65rem;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.85rem 1.35rem;
  border-radius: var(--radius-full, 9999px);
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  text-align: left;
  line-height: 1.4;
}

.feedback-msg.success {
  background: var(--bit-mint-soft, #eaf8e7);
  color: #0f766e;
}

.feedback-msg.already {
  background: #fef3c7;
  color: #92400e;
}

.feedback-msg.not_found {
  background: #fee2e2;
  color: #991b1b;
}

.feedback-msg.error {
  background: var(--bit-pink-soft, #fdedf1);
  color: #b91c1c;
}

.feedback-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Back Link */
.back-home-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-secondary, #52525b);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full, 9999px);
  transition: all 0.2s ease;
  position: relative;
  z-index: 2;
}

.back-home-link:hover {
  color: var(--text-primary, #18181b);
  background: rgba(24, 24, 27, 0.04);
}

.back-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.back-home-link:hover .back-icon {
  transform: translateX(-3px);
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

@media (max-width: 640px) {
  .unsubscribe-main {
    padding: 6.5rem 1rem 3.5rem;
  }

  .unsubscribe-card {
    padding: 2.5rem 1.5rem;
  }
}
</style>
