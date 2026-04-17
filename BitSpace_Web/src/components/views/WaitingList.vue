<template>
    <section id="cta" class="cta-section">
        <div class="cta-glow"></div>

        <div class="section-inner text-center cta-content">
            <div class="section-badge">✨ Aviat disponible ✨</div>
            <span class="cta-mascot">🌟</span>

            <h2 class="section-title">Preparat per adoptar<br />el teu primer Bit?</h2>

            <p class="section-subtitle">
                Uneix-te a la llista d'espera i sigues dels primers a descobrir BitSpace.
            </p>

            <form class="waitlist-form" @submit.prevent="submitForm">
                <input v-model="email" type="email" :placeholder="t('waitlist_email_placeholder')"
                    :class="{ confirmed: isConfirmed }" aria-label="Correu electrònic" required />

                <button type="submit" :class="{ joined: isConfirmed }" :disabled="loading">
                    {{ loading ? t('waitlist_button_loading') : isConfirmed ? 'Fet!' : t('waitlist_button_submit') }}
                </button>
            </form>

            <p v-if="message" :class="messageClass" class="waitlist-message">{{ message }}</p>

            <p class="cta-note">Sense spam. Sense caps condicions. Seràs el primer a saber-ho.</p>

            <div class="store-btns">
                <a href="#" class="store-btn" aria-label="Disponible a l'App Store">
                    <span class="store-icon">🍎</span>
                    <div>
                        <small>Disponible aviat a</small>
                        <big>App Store</big>
                    </div>
                </a>

                <a href="#" class="store-btn" aria-label="Disponible a Google Play">
                    <span class="store-icon">▶</span>
                    <div>
                        <small>Disponible aviat a</small>
                        <big>Google Play</big>
                    </div>
                </a>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const SCRIPT_BASE =
    'https://script.google.com/macros/s/AKfycbyiPoDCZKIAY0nMLcXIAfiAWbdfNLb2IgAWXmAYnGbTfxPzqvS0UaDiQAKgpcgKyt6uCA/exec'

const email = ref('')
const message = ref('')
const loading = ref(false)
const confirmedEmail = ref('')

const isConfirmed = computed(() =>
    (message.value.includes(t('waitlist_success_added')) || message.value.includes(t('waitlist_error_exists'))) &&
    email.value.trim() === confirmedEmail.value
)

const messageClass = computed(() =>
    message.value.includes(t('waitlist_success_added')) || message.value.includes(t('waitlist_error_exists'))
        ? 'success'
        : 'error'
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
    const timeout = setTimeout(() => {
        cleanup()
        message.value = t('waitlist_error_no_response')
        loading.value = false
    }, 10000)

    window[cbName] = (res) => {
        clearTimeout(timeout)
        try {
            if (res.result === 'success') {
                message.value = t('waitlist_success_added')
                confirmedEmail.value = email.value.trim()
            } else if (res.result === 'exists') {
                message.value = t('waitlist_error_exists')
                confirmedEmail.value = email.value.trim()
            } else {
                message.value = res.message || t('waitlist_error_generic')
                confirmedEmail.value = ''
            }
        } finally {
            cleanup()
            loading.value = false
        }
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `${SCRIPT_BASE}?email=${encodeURIComponent(email.value)}&callback=${cbName}`
    script.async = true

    function cleanup() {
        try {
            delete window[cbName]
        } catch {
            window[cbName] = undefined
        }

        if (script.parentNode) {
            script.parentNode.removeChild(script)
        }
    }

    document.body.appendChild(script)
}
</script>

<style>
@font-face {
    font-family: 'Nunito';
    src: url('../../assets/fonts/nunito/static/Nunito-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Nunito';
    src: url('../../assets/fonts/nunito/static/Nunito-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Baloo 2';
    src: url('../../assets/fonts/baloo-2/static/Baloo2-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Baloo 2';
    src: url('../../assets/fonts/baloo-2/static/Baloo2-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Press Start 2P';
    src: url('../../assets/fonts/press-start-2p/PressStart2P-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@keyframes blob-float {

    0%,
    100% {
        transform: translateY(0) rotate(-2deg);
    }

    50% {
        transform: translateY(-18px) rotate(2deg);
    }
}

.cta-section {
    background: var(--navy);
    color: white;
    text-align: center;
    position: relative;
    overflow: hidden;
    padding: 6rem 2rem;
}

.cta-glow {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(circle at 30% 50%, rgba(192, 132, 252, 0.15) 0%, transparent 60%),
        radial-gradient(circle at 70% 50%, rgba(244, 114, 182, 0.1) 0%, transparent 60%);
    pointer-events: none;
}

.cta-content {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
}

.section-inner {
    max-width: 1100px;
    margin: 0 auto;
}

.text-center {
    text-align: center;
}

.section-badge {
    font-family: 'Press Start 2P', monospace;
    font-size: 0.6rem;
    background: rgba(196, 181, 253, 0.1);
    color: var(--purple);
    border: 1px solid rgba(196, 181, 253, 0.3);
    padding: 0.4rem 0.9rem;
    border-radius: 6px;
    display: inline-block;
    letter-spacing: 0.05em;
}

.cta-mascot {
    font-size: 5rem;
    display: block;
    margin: 1.5rem 0;
    animation: blob-float 4s ease-in-out infinite;
    filter: drop-shadow(0 10px 30px rgba(192, 132, 252, 0.4));
}

.section-title {
    color: white;
    font-family: 'Baloo 2', cursive;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 800;
    line-height: 1.2;
    margin: 0;
}

.section-subtitle {
    color: rgba(255, 255, 255, 0.6);
    margin: 1rem auto 2.5rem;
    max-width: 580px;
    font-family: 'Nunito', sans-serif;
    font-size: 1.05rem;
    font-weight: 500;
}

.waitlist-form {
    display: flex;
    gap: 0.75rem;
    max-width: 480px;
    margin: 0 auto 2rem;
    flex-wrap: wrap;
    justify-content: center;
}

.waitlist-form input {
    flex: 1;
    min-width: 240px;
    padding: 0.85rem 1.5rem;
    border-radius: 50px;
    border: 2px solid rgba(196, 181, 253, 0.3);
    background: rgba(255, 255, 255, 0.07);
    color: white;
    font-size: 1rem;
    font-family: 'Nunito', sans-serif;
    outline: none;
    transition:
        border-color 0.2s,
        background 0.2s;
}

.waitlist-form input::placeholder {
    color: rgba(255, 255, 255, 0.35);
}

.waitlist-form input:focus {
    border-color: var(--purple);
    background: rgba(255, 255, 255, 0.1);
}

.waitlist-form input.confirmed,
.waitlist-form input.confirmed:focus {
    border-color: #10b981;
}

.waitlist-form button {
    background: linear-gradient(135deg, var(--purple-deep), var(--neon-pink));
    color: white;
    border: none;
    padding: 0.85rem 2rem;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 700;
    font-family: 'Baloo 2', cursive;
    cursor: pointer;
    transition:
        transform 0.2s,
        box-shadow 0.2s,
        background 0.2s;
    box-shadow: 0 8px 24px rgba(192, 132, 252, 0.35);
}

.waitlist-form button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(192, 132, 252, 0.5);
}

.waitlist-form button.joined {
    background: linear-gradient(135deg, #10b981, #059669);
}

.waitlist-form button:disabled {
    opacity: 0.85;
    cursor: not-allowed;
}

.waitlist-message {
    margin: 0 auto 1.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    font-family: 'Nunito', sans-serif;
}

.waitlist-message.success {
    color: #86efac;
}

.waitlist-message.error {
    color: #fca5a5;
}

.cta-note {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.35);
    margin: 0 0 2.5rem;
    font-family: 'Nunito', sans-serif;
}

.store-btns {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.store-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    font-family: 'Baloo 2', cursive;
    font-weight: 700;
    transition:
        background 0.2s,
        transform 0.2s;
    text-decoration: none;
}

.store-btn:hover {
    background: rgba(255, 255, 255, 0.14);
    transform: translateY(-2px);
}

.store-btn small {
    display: block;
    font-size: 0.65rem;
    font-weight: 400;
    opacity: 0.7;
    font-family: 'Nunito', sans-serif;
}

.store-btn big {
    display: block;
    font-size: 1rem;
}

.store-icon {
    font-size: 1.75rem;
}

@media (max-width: 600px) {
    .cta-section {
        padding: 4rem 1.5rem;
    }
}
</style>
