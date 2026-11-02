<template>
  <transition name="cookie-slide">
    <div
      v-if="isVisible"
      class="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Consentimiento de cookies"
    >
      <div class="cookie-card">
        <div class="cookie-content">
          <div class="cookie-text-block">
            <h3 class="cookie-title">
              {{ t('cookie_banner_title') }}
            </h3>
            <p class="cookie-description">
              {{ t('cookie_banner_text') }}
            </p>
          </div>
        </div>

        <div class="cookie-actions">
          <button
            type="button"
            class="cookie-btn cookie-btn-reject"
            @click="rejectCookies"
          >
            {{ t('cookie_banner_reject') }}
          </button>
          <button
            type="button"
            class="cookie-btn cookie-btn-accept"
            @click="acceptCookies"
          >
            {{ t('cookie_banner_accept') }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'CookieBanner',
})

const { t } = useI18n()
const STORAGE_KEY = 'bitspace_cookie_consent'
const isVisible = ref(false)

onMounted(() => {
  try {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) {
      isVisible.value = true
    }
  } catch {
    // Si localStorage no está disponible (modo privado estricto), mostramos el banner
    isVisible.value = true
  }
})

function saveConsent(value) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      status: value,
      timestamp: new Date().toISOString(),
    }))
  } catch {
    // Modo privado o cuota excedida
  }
  isVisible.value = false
}

function acceptCookies() {
  saveConsent('accepted')
}

function rejectCookies() {
  saveConsent('rejected')
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  z-index: 99999;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.cookie-card {
  pointer-events: auto;
  max-width: 780px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1.5px solid rgba(24, 24, 27, 0.08);
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  box-shadow:
    0 20px 45px -10px rgba(24, 24, 27, 0.14),
    0 8px 16px -6px rgba(241, 178, 195, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.75rem;
}

.cookie-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.cookie-text-block {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cookie-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 800;
  color: #18181b;
  letter-spacing: -0.01em;
}

.cookie-description {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.45;
  color: #52525b;
}

.cookie-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-shrink: 0;
}

.cookie-btn {
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.6rem 1.15rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  outline: none;
}

.cookie-btn-reject {
  background: transparent;
  color: #52525b;
  border: 1.5px solid rgba(24, 24, 27, 0.15);
}

.cookie-btn-reject:hover {
  background: rgba(24, 24, 27, 0.05);
  color: #18181b;
  border-color: rgba(24, 24, 27, 0.25);
}

.cookie-btn-accept {
  background: #ade5a8;
  color: #18181b;
  border: 1.5px solid #8fe087;
  box-shadow: 0 4px 14px rgba(173, 229, 168, 0.45);
}

.cookie-btn-accept:hover {
  background: #9bdc96;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(173, 229, 168, 0.6);
}

.cookie-btn:active {
  transform: translateY(0);
}

/* Animaciones de entrada/salida */
.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.cookie-slide-enter-from,
.cookie-slide-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}

/* Responsive móvil */
@media (max-width: 680px) {
  .cookie-banner {
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
  }

  .cookie-card {
    flex-direction: column;
    align-items: stretch;
    padding: 1.25rem;
    gap: 1.25rem;
  }

  .cookie-actions {
    width: 100%;
    justify-content: stretch;
  }

  .cookie-btn {
    flex: 1;
    text-align: center;
    padding: 0.75rem 1rem;
  }
}
</style>
