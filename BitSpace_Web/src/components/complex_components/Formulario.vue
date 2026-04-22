<script>
export default {
  name: 'FormularioComponent'
}
</script>

<template>
  <main class="sant-jordi-main">
    <img src="@/assets/images/sant-jordi-bg.png" alt="Sant Jordi's Day illustration with red roses and an antique book"
      class="bg-image" />
    <div class="bg-gradient-linear"></div>
    <div class="bg-gradient-radial"></div>

    <section class="content-section">
      <div class="content-wrapper">

        <div v-if="!isMobile()" style="margin-top: 10rem;">
          <br><br><br><br><br>
        </div>



        <p class="subtitle">23 d'Abril · Catalunya</p>

        <h1 v-if="!isMobile()" class="title">
          Uneix-te a la
          <em>Waitlist</em>
        </h1>

        <!-- <p class="description">
          {{ t('waitlist_sant_jordi_desc') || "Join the waitlist and celebrate Sant Jordi's Day with us — stories, roses, and something new in bloom." }}
        </p> -->

        <form @submit.prevent="submitForm" class="waitlist-form">
          <input v-model="email" type="email" required
            :placeholder="t('waitlist_email_placeholder') || 'your@email.com'" class="input-email" />
          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? t('waitlist_button_loading') : (t('waitlist_button_submit') || 'Join the waitlist') }}
          </button>
        </form>

        <div aria-live="polite" class="message-container">
          <p v-if="message" :class="messageClass" class="message">{{ message }}</p>
        </div>

        <div v-if="!isMobile()">
          <br><br><br><br><br><br><br><br><br><br><br><br></br>
          <p class="footer-text">Bona diada de Sant Jordi</p>
        </div>

        <div v-else>
          <br>
          <p class="footer-text">Bona diada de Sant Jordi</p>
        </div>
        
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Reactividad para detectar si es móvil
const windowWidth = ref(window.innerWidth)
const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => window.addEventListener('resize', updateWidth))
onBeforeUnmount(() => window.removeEventListener('resize', updateWidth))

const isMobile = () => {
  return windowWidth.value <= 640
}

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
/* CSS Variables */
.sant-jordi-main {
  --background: 36 38% 96%;
  --foreground: 0 35% 15%;
  --rose: 352 68% 42%;
  --rose-deep: 352 70% 28%;
  --parchment: 38 45% 92%;
  --gold: 38 60% 52%;
  --ink: 20 30% 12%;
  --primary-foreground: 210 40% 98%;

  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: sans-serif;
}

@media (max-width: 640px) {
  .sant-jordi-main {
    min-height: auto;
    /* Dejamos que la altura se adapte al contenido */
  }
}

.bg-image {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

@media (max-width: 640px) {
  .bg-image {

    /* En móvil (pantalla vertical), cover recorta los lados. 
       Podemos mover el foco (ej: 70% center) para mostrar más de la parte derecha de la foto,
       o usar 'contain' si prefieres que no se recorte nada (aunque dejará espacios). */
    object-position: 50% center;
  }
}

.bg-gradient-linear {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, hsla(var(--background), 0.4), hsla(var(--background), 0.2), hsla(var(--background), 0.8));
}

.bg-gradient-radial {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 30%, hsla(var(--rose-deep), 0.35) 100%);
}

.content-section {
  position: relative;
  z-index: 10;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
}

@media (max-width: 640px) {
  .content-section {
    min-height: auto;
    /* Ajuste automático a su contenido */
    padding: 3rem 1.5rem;
    /* Ajuste de padding para dejar un margen agradable */
  }
}

.content-wrapper {
  width: 100%;
  max-width: 36rem;
  text-align: center;
}

.subtitle {
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.35em;
  color: hsl(var(--rose-deep));
}

.title {
  font-family: serif;
  font-size: 3rem;
  line-height: 1.1;
  color: hsl(var(--ink));
  margin: 0;
}

@media (min-width: 640px) {
  .title {
    font-size: 3.75rem;
  }
}

@media (min-width: 768px) {
  .title {
    font-size: 4.5rem;
  }
}

.title em {
  color: hsl(var(--rose));
  font-style: italic;
}

.description {
  margin: 1.5rem auto 0;
  max-width: 28rem;
  font-size: 1rem;
  color: hsla(var(--ink), 0.75);
  line-height: 1.5;
}

@media (min-width: 640px) {
  .description {
    font-size: 1.125rem;
  }
}

.waitlist-form {
  margin: 2.5rem auto 0;
  display: flex;
  width: 100%;
  max-width: 28rem;
  flex-direction: column;
  gap: 0.75rem;
  border-radius: 1rem;
  border: 1px solid hsla(var(--rose), 0.2);
  background-color: hsla(var(--background), 0.7);
  padding: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

@media (min-width: 640px) {
  .waitlist-form {
    flex-direction: row;
  }
}

.input-email {
  flex: 1;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  color: hsl(var(--ink));
  outline: none;
}

.input-email::placeholder {
  color: hsla(var(--ink), 0.5);
}

.submit-btn {
  background-color: hsl(var(--rose));
  color: hsl(var(--primary-foreground));
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.submit-btn:hover:not(:disabled) {
  background-color: hsl(var(--rose-deep));
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.message-container {
  margin-top: 1rem;
  min-height: 1.5rem;
  font-size: 0.875rem;
  color: hsla(var(--ink), 0.75);
}

.message {
  margin: 0;
}

.success {
  color: hsl(var(--rose));
}

.error {
  color: hsl(var(--rose-deep));
}

.footer-text {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: hsla(var(--ink), 0.5);
}
</style>
