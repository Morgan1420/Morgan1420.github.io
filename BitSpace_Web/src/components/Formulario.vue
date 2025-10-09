<script>
export default {
  name: 'FormularioComponent'
}
</script>

<template>
  <div class="waitlist-container">
    <h2 class="title">Únete a nuestra lista de espera</h2>
    <form @submit.prevent="submitForm" class="waitlist-form">
      <input v-model="email" type="email" placeholder="Tu correo electrónico" required class="input-email" />
      <button type="submit" class="submit-btn" :disabled="loading">
        {{ loading ? 'Enviando...' : 'Unirme' }}
      </button>
    </form>

    <p v-if="message" :class="messageClass" class="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const SCRIPT_BASE = 'https://script.google.com/macros/s/AKfycbyiPoDCZKIAY0nMLcXIAfiAWbdfNLb2IgAWXmAYnGbTfxPzqvS0UaDiQAKgpcgKyt6uCA/exec'

const email = ref('')
const message = ref('')
const loading = ref(false)

const messageClass = computed(() =>
  message.value.includes('Gracias') || message.value.includes('añadido') ? 'success' : 'error'
)

function makeCallbackName() {
  return '__waitlistCB_' + Math.random().toString(36).slice(2)
}

const submitForm = () => {
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    message.value = 'Por favor, introduce un correo válido.'
    return
  }

  loading.value = true
  message.value = ''

  const cbName = makeCallbackName()
  // Timeout en caso de que no responda (limpia)
  const timeout = setTimeout(() => {
    cleanup()
    message.value = 'No se recibió respuesta del servidor.'
    loading.value = false
  }, 10000) // 10s

  // Define callback global
  window[cbName] = (res) => {
    clearTimeout(timeout)
    try {
      if (res.result === 'success') {
        message.value = '¡Gracias! Te hemos añadido a la lista de espera.'
        email.value = ''
      } else if (res.result === 'exists') {
        message.value = 'Ya estás en la lista de espera.'
      } else {
        message.value = res.message || 'Hubo un error en la solicitud.'
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
  margin: 4rem auto; /* Centrado y con margen superior e inferior para separarlo */
  padding: 2rem;
  text-align: center;
  background-color: #FFE4DD; /* Mismo color de fondo que el header */
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* Sombra a juego */
  font-family: sans-serif;
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
  border: 1px solid #FFD8CF;
  background-color: #fff;
  font-size: 1rem;
}

.input-email:focus {
  outline: none;
  border-color: #E57373;
  box-shadow: 0 0 0 3px rgba(229, 115, 115, 0.2);
}

.submit-btn {
  background: #E57373; /* Color que encaja con la paleta */
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
</style>
