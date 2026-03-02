<script>
export default {
  name: 'FormularioComponent'
}
</script>

<template>
  <div class="waitlist-container">
    <h2 class="title">{{ t('waitlist_title') }}</h2>
    <form @submit.prevent="submitForm" class="waitlist-form">
      <input v-model="email" type="email" :placeholder="t('waitlist_email_placeholder')" required class="input-email" />
      <button type="submit" class="submit-btn" :disabled="loading">
        {{ loading ? t('waitlist_button_loading') : t('waitlist_button_submit') }}
      </button>
      <p class="text-legal">En unir-te a la waitlist, acceptes la nostra Política de Privacitat. Podràs donar-te de
        baixa
        en qualsevol moment fent clic a l'enllaç que trobaràs al final de cada correu.</p>
    </form>

    <p v-if="message" :class="messageClass" class="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const SCRIPT_BASE = 'https://script.google.com/macros/s/AKfycbyiPoDCZKIAY0nMLcXIAfiAWbdfNLb2IgAWXmAYnGbTfxPzqvS0UaDiQAKgpcgKyt6uCA/exec'

const email = ref('')
const message = ref('')
const loading = ref(false)

const messageClass = computed(() =>
  message.value.includes(t('waitlist_success_added')) ||
    message.value.includes(t('waitlist_error_exists')) ? 'success' : 'error'
)

function makeCallbackName() {
  return '__waitlistCB_' + Math.random().toString(36).slice(2)
}

const submitForm = () => {
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    message.value = t('waitlist_error_invalid_email')
    return
  }

  loading.value = true
  message.value = ''

  const cbName = makeCallbackName()
  // Timeout en caso de que no responda (limpia)
  const timeout = setTimeout(() => {
    cleanup()
    message.value = t('waitlist_error_no_response')
    loading.value = false
  }, 10000) // 10s

  // Define callback global
  window[cbName] = (res) => {
    clearTimeout(timeout)
    try {
      if (res.result === 'success') {
        message.value = t('waitlist_success_added')
        email.value = ''
      } else if (res.result === 'exists') {
        message.value = t('waitlist_error_exists')
      } else {
        message.value = res.message || t('waitlist_error_generic')
      }
    } finally {
      cleanup()
      loading.value = false
    }
  }

  // Inserta el script JSONP
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = `${SCRIPT_BASE}?email=${encodeURIComponent(email.value)}&callback=${cbName}`
  script.async = true

  // Limpiar función
  function cleanup() {
    try { delete window[cbName] } catch { window[cbName] = undefined }
    if (script.parentNode) script.parentNode.removeChild(script)
  }

  document.body.appendChild(script)
}
</script>

<style scoped>
.waitlist-container {
  max-width: 500px;
  margin: 4rem auto;
  padding: 2rem;

  background-color: #fae4de;
  border: 10px solid #f8d1c6;
  border-radius: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  font-family: sans-serif;
  text-align: center;
  animation: grow 2s ease-in-out infinite;
}

@keyframes grow {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.03);
  }
}

.title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: bold;
}

.waitlist-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-email {
  padding: 0.85rem 1rem;
  border-radius: 8px;
  background-color: #fff;
  font-size: 1rem;
  border-width: 0;
  border-style: solid;
}

.input-email:focus {
  outline: none;
  border-width: 3px;
  border-color: #E57373;
}

.submit-btn {
  background: #E57373;
  /* Color que encaja con la paleta */
  color: #fff;
  padding: .85rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background: #d85a5a;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.message {
  margin-top: 1rem;
  font-weight: 500;
  font-size: 1rem;
}

.success {
  color: #2e8b57;
}

.error {
  color: #d9534f;
}

.text-legal {
  font-size: x-small;
  color: #555;
}
</style>
