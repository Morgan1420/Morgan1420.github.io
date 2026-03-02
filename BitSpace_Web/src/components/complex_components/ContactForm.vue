<template>
    <div class="contact-container">
        <h2 class="title">{{ t('collaborate_contact_title') }}</h2>
        <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-2-inputs">
                <div class="form-group" id="tema-select">
                    <label for="about">{{ t('contact_form_topic_label') }}</label>
                    <select v-model="form.about" id="about" required class="form-input">
                        <option value="Dubte">{{ t('contact_form_topic_doubt') }}</option>
                        <option value="Opinió">{{ t('contact_form_topic_opinion') }}</option>
                        <option value="Reunió">{{ t('contact_form_topic_meeting') }}</option>
                        <option value="Oferta">{{ t('contact_form_topic_offer') }}</option>
                        <option value="Altra">{{ t('contact_form_topic_other') }}</option>
                    </select>
                </div>


                <div class="form-group">
                    <label for="concept">{{ t('contact_form_concept_label') }}</label>
                    <input v-model="form.concept" type="text" id="concept" required class="form-input" />
                </div>
            </div>

            <div class="form-group">
                <label for="email">{{ t('contact_form_email_label') }}</label>
                <input v-model="form.email" type="email" id="email" :placeholder="t('waitlist_email_placeholder')"
                    class="form-input" />
            </div>

            <div class="form-group">
                <label for="message">{{ t('contact_form_message_label') }}</label>
                <textarea v-model="form.message" id="message" :placeholder="getPlaceholder()" required rows="6"
                    class="form-input"></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="loading">
                {{ loading ? t('contact_form_sending') : t('contact_form_submit') }}
            </button>

            <p v-if="message" :class="messageClass" class="message">{{ message }}</p>
            <p class="text-legal">{{ t('contact_form_privacy') }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = ref({
    about: 'Dubte',
    concept: '',
    email: '',
    message: ''
})

const message = ref('')
const loading = ref(false)

const messageClass = computed(() =>
    message.value.includes('èxit') ? 'success' : 'error'
)

const getPlaceholder = () => {
    const placeholders = {
        'Dubte': 'Bon dia equip de BitSpace he vist la vostra web i tenia un dubte sobre...',
        'Reunió': 'Bon dia equip de BitSpace he vist la vostra web i m\'agradaria agendar una reunió per...',
        'Opinió': 'Bon dia equip de BitSpace, he vist la vostra web i m\'agradaria donar-vos la meva opinió sobre...',
        'Oferta': 'Bon dia equip de BitSpace, m\'interessa col·laborar amb vosaltres...',
        'Altra': 'Bon dia equip de BitSpace...'
    }
    return placeholders[form.value.about] || 'Escriu aquí el teu missatge...'
}

const submitForm = async () => {
    // Basic validation
    if (!form.value.about || !form.value.concept || !form.value.message) {
        message.value = t('contact_form_validation_error')
        return
    }

    loading.value = true
    message.value = ''

    try {
        // Use default email if not provided
        const returnEmail = form.value.email || 'info@bitspace.es'

        // Prepare email content
        const emailContent = `
Tema: ${form.value.about}
Concepte: ${form.value.concept}
Email del remitent: ${returnEmail}

Missatge:
${form.value.message}

---
Aquest correu ha estat enviat desde BitSpace Web.
    `.trim()

        // Send email using EmailJS
        // Note: You'll need to set up EmailJS and replace these IDs with your own
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service_id: 'service_0vz1wog',
                template_id: 'template_m6sf0ic',
                user_id: '8c0LFeFax1fR98y9J',
                template_params: {
                    to_email: 'info@bitspace.es',
                    from_email: returnEmail,
                    from_name: form.value.concept,
                    subject: `[${form.value.about}] ${form.value.concept}`,
                    message: emailContent,
                    reply_to: returnEmail
                }
            })
        })

        if (response.ok) {
            message.value = t('contact_form_success')

            // Reset form
            form.value = {
                about: 'Dubte',
                concept: '',
                email: '',
                message: ''
            }
        } else {
            message.value = t('contact_form_error')
        }
    } catch (error) {
        console.error('Error sending email:', error)
        message.value = t('contact_form_connection_error')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.contact-container {
    width: 75%;
    margin: 3rem auto;
    padding: 2rem;
    background-color: #fae4de;
    border: 10px solid #f8d1c6;
    border-radius: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: sans-serif;
}

.title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #333;
    font-weight: bold;
    text-align: center;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-2-inputs {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.form-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    font-weight: 600;
    color: #333;
    font-size: 0.95rem;
}

#tema-select {
    width: 20%;
}

.form-input {
    padding: 0.85rem 1rem;
    border-radius: 8px;
    background-color: #fff;
    font-size: 1rem;
    border: 2px solid transparent;
    font-family: inherit;
    transition: border-color 0.3s;
}

.form-input:focus {
    outline: none;
    border-color: #E57373;
}

textarea.form-input {
    resize: vertical;
    font-family: inherit;
}

.submit-btn {
    background: #E57373;
    color: #fff;
    padding: 0.85rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: background-color 0.3s;
    margin-top: 1rem;
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
    text-align: center;
    padding: 0.75rem;
    border-radius: 8px;
}

.success {
    color: #2e8b57;
    background-color: rgba(46, 139, 87, 0.1);
}

.error {
    color: #d9534f;
    background-color: rgba(217, 83, 79, 0.1);
}

.text-legal {
    font-size: 0.85rem;
    color: #666;
    text-align: center;
    margin-top: 1rem;
}

@media (max-width: 768px) {
    .contact-container {
        margin: 2rem auto;
        padding: 1.5rem;
    }

    .title {
        font-size: 1.5rem;
    }

    .form-input {
        font-size: 16px;
    }
}
</style>
