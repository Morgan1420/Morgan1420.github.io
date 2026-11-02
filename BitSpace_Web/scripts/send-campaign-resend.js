import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { Resend } from 'resend'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 1. Cargar clave API de Resend desde el entorno o archivo .env local
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env')
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...values] = trimmed.split('=')
        if (key && values.length > 0) {
          process.env[key.trim()] = values.join('=').trim()
        }
      }
    }
  }
}

loadEnv()

const apiKey = process.env.RESEND_API_KEY
if (!apiKey) {
  console.error('\n❌ ERROR: Falta la variable RESEND_API_KEY.')
  console.error('Crea un archivo .env en BitSpace_Web con: RESEND_API_KEY=re_tu_clave_aqui\n')
  process.exit(1)
}

const resend = new Resend(apiKey)

// 2. Cargar plantilla HTML base
const templatePath = path.resolve(__dirname, 'email-template-corporate.html')
const baseTemplate = fs.readFileSync(templatePath, 'utf8')

/**
 * Función para generar el HTML personalizado de cada usuario
 */
function renderEmail({ email, preheader, headline, introParagraphs, ctaText, ctaUrl }) {
  let html = baseTemplate

  if (email) {
    html = html.replace(/{{EMAIL}}/g, encodeURIComponent(email))
  }

  if (preheader) {
    html = html.replace(
      /<!-- Preheader invisible para bandeja de entrada -->[\s\S]*?<\/div>/,
      `<!-- Preheader invisible para bandeja de entrada -->\n  <div style="display: none; font-size: 1px; color: #f7f4f8; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">${preheader}</div>`
    )
  }

  if (headline) {
    html = html.replace(
      /<h1 class="headline"[^>]*>[\s\S]*?<\/h1>/,
      `<h1 class="headline" style="margin: 0 0 16px 0; color: #18181b; font-size: 30px; font-weight: 800; line-height: 36px; text-align: center; letter-spacing: -0.02em;">${headline}</h1>`
    )
  }

  if (introParagraphs && Array.isArray(introParagraphs)) {
    const paragraphsHtml = introParagraphs
      .map(
        (p) =>
          `<p style="margin: 0 0 20px 0; color: #52525b; font-size: 16px; line-height: 26px; text-align: center;">${p}</p>`
      )
      .join('\n')

    // Reemplaza los párrafos introductorios antes de la caja de hábitos
    html = html.replace(
      /<!-- SUBTÍTULO \/ INTRODUCCIÓN -->[\s\S]*?(?=<!-- CAJA HIGHLIGHT)/,
      `<!-- SUBTÍTULO / INTRODUCCIÓN -->\n${paragraphsHtml}\n\n                    `
    )
  }

  if (ctaText) {
    html = html.replace(
      /<a href="[^"]*" target="_blank" class="btn-cta"[^>]*>[\s\S]*?<\/a>/,
      `<a href="${ctaUrl || 'https://prototype.bitspace.es'}" target="_blank" class="btn-cta" style="display: inline-block; background-color: #ade5a8; color: #14532d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; text-decoration: none; padding: 14px 34px; border-radius: 9999px; border: 1.5px solid rgba(20, 83, 45, 0.15); box-shadow: 0 4px 14px rgba(173, 229, 168, 0.5);">${ctaText}</a>`
    )
  }

  return html
}

/**
 * Función principal para enviar un lote de correos de forma automatizada
 */
async function sendCampaign({ from, subject, recipients, campaignContent }) {
  console.log(`\n🚀 Iniciando envío de campaña: "${subject}"`)
  console.log(`📨 Remitente: ${from}`)
  console.log(`👥 Destinatarios totales: ${recipients.length}\n`)

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < recipients.length; i++) {
    const toEmail = recipients[i]
    console.log(`[${i + 1}/${recipients.length}] Enviando a: ${toEmail}...`)

    const htmlContent = renderEmail({
      email: toEmail,
      ...campaignContent,
    })

    const { data, error } = await resend.emails.send({
      from,
      to: [toEmail],
      subject,
      html: htmlContent,
      headers: {
        'List-Unsubscribe': `<https://bitspace.es/unsubscribe?email=${encodeURIComponent(toEmail)}>`,
      },
      tags: [
        { name: 'campaign', value: campaignContent.tag || 'waitlist-update' },
      ],
    })

    if (error) {
      console.error(`   ❌ Error al enviar a ${toEmail}:`, error.message)
      errorCount++
    } else {
      console.log(`   ✅ Entregado con ID: ${data?.id}`)
      successCount++
    }

    // Pequeña pausa de 120ms entre envíos para cumplir el límite de 10 req/s de Resend
    if (i < recipients.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 120))
    }
  }

  console.log('\n📊 Resumen de la campaña:')
  console.log(`   - Exitosos: ${successCount}`)
  console.log(`   - Fallidos: ${errorCount}\n`)
}

// -------------------------------------------------------------
// EJECUCIÓN (Ejemplo de prueba)
// -------------------------------------------------------------
// Para probar tu primer correo con el dominio de prueba de Resend:
//    node scripts/send-campaign-resend.js
// -------------------------------------------------------------
const IS_TEST = process.argv.includes('--test')

if (IS_TEST || process.argv.length === 2) {
  sendCampaign({
    // Mientras verificas bitspace.es en Resend, puedes usar 'onboarding@resend.dev':
    // Una vez verificado bitspace.es, cambia a: 'BitSpace <info@bitspace.es>'
    from: process.env.RESEND_FROM || 'BitSpace <onboarding@resend.dev>',
    subject: 'Tu mascota digital ya tiene casa • Prueba el nuevo prototipo',
    recipients: [
      // En modo test de resend.dev solo se puede enviar al correo con el que te registraste
      process.env.RESEND_TEST_EMAIL || 'delivered@resend.dev',
    ],
    campaignContent: {
      tag: 'lanzamiento-prototipo',
      preheader: 'Tu salud y tus hábitos diarios, ahora en un juego. Prueba el nuevo prototipo web.',
      headline: 'Tu mascota digital ya tiene casa',
      introParagraphs: [
        'Sabemos que cuidar de la salud mental, desconectar del móvil o encontrar hueco para hacer deporte cuesta. En BitSpace lo convertimos en un juego donde tu progreso en el mundo real hace crecer y evolucionar a tu propio <strong>Bit</strong>.',
        'Como estás en la lista de espera, queremos que seas de los primeros en probar la habitación interactiva antes del lanzamiento oficial en iOS y Android.',
      ],
      ctaText: 'Probar el prototipo web →',
      ctaUrl: 'https://prototype.bitspace.es',
    },
  })
}
