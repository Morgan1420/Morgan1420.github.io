import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import readline from 'node:readline/promises'
import { fileURLToPath } from 'node:url'
import { Resend } from 'resend'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 1. Cargar clave API de Resend desde el archivo .env en BitSpace_Web
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
const IS_DRY_RUN = process.argv.includes('--dry-run')
const IS_TEST2 = process.argv.includes('--test2')
const IS_TEST = process.argv.includes('--test') || IS_TEST2
const TEST_EMAIL = 'gerardgarciagros@gmail.com'
const TEST2_EMAILS = ['gerardgarciagros@gmail.com', 'jan.moran.r@gmail.com', 'llunalara73@gmail.com']

if (!apiKey && !IS_DRY_RUN) {
  console.error('\n❌ ERROR: Falta la variable RESEND_API_KEY.')
  console.error('Crea un archivo .env en BitSpace_Web con: RESEND_API_KEY=re_tu_clave_aqui\n')
  process.exit(1)
}

const resend = apiKey ? new Resend(apiKey) : null

// Función auxiliar para extraer argumentos con valor: --flag valor o --flag=valor
function getArgValue(flag) {
  const argWithEqual = process.argv.find((a) => a.startsWith(`${flag}=`))
  if (argWithEqual) {
    return argWithEqual.split('=')[1]
  }
  const idx = process.argv.indexOf(flag)
  if (idx !== -1 && idx < process.argv.length - 1) {
    return process.argv[idx + 1]
  }
  return null
}

const customCampaignArg =
  getArgValue('--campaign') ||
  getArgValue('-c') ||
  getArgValue('--template') ||
  getArgValue('-t')
const customSubjectArg = getArgValue('--subject') || getArgValue('-s')
const customScheduleArg = getArgValue('--schedule')

// 2. Comprobar que se ha especificado la campaña obligatoriamente (sin valor por defecto)
if (!customCampaignArg) {
  const availableHtmlFiles = fs
    .readdirSync(__dirname)
    .filter((f) => f.endsWith('.html'))

  console.error('\n❌ ERROR: Debes indicar obligatoriamente la campaña a enviar.')
  console.error('No hay campaña por defecto. Usa el flag --campaign <archivo> (o -c <archivo>).\n')
  console.error('Campañas disponibles en email-campaigns/:')
  availableHtmlFiles.forEach((file) => console.error(`  - ${file}`))
  console.error('\nEjemplo de uso:')
  console.error('  node email-campaigns/send-campaign.js --campaign campana-devblog-rebranding.html --dry-run\n')
  process.exit(1)
}

// 3. Rutas de archivos
const csvPath = fs.existsSync(path.resolve(__dirname, 'waitlist.csv'))
  ? path.resolve(__dirname, 'waitlist.csv')
  : path.resolve(__dirname, 'waitlist.example.csv')

const possiblePaths = [
  path.resolve(process.cwd(), customCampaignArg),
  path.resolve(__dirname, customCampaignArg),
  path.resolve(__dirname, `${customCampaignArg}.html`),
]
const found = possiblePaths.find((p) => fs.existsSync(p))

if (!found) {
  console.error(`\n❌ ERROR: No se encontró la campaña HTML indicada: "${customCampaignArg}"`)
  console.error(`Rutas buscadas:\n${possiblePaths.map((p) => ` - ${p}`).join('\n')}\n`)
  process.exit(1)
}

const templatePath = found
const baseTemplate = fs.readFileSync(templatePath, 'utf8')

/**
 * Parsea el CSV considerando comas o tabuladores y líneas vacías
 * Columnas esperadas: Email, Fecha Alta, Estado, Evento
 */
function parseWaitlistCsv(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0)

  if (lines.length <= 1) {
    return []
  }

  // Detectar separador (coma o tabulador)
  const headerLine = lines[0]
  const separator = headerLine.includes('\t') ? '\t' : ','

  const headers = headerLine.split(separator).map((h) => h.trim().toLowerCase())
  const emailIdx = headers.findIndex((h) => h.includes('email') || h.includes('correo'))
  const eventIdx = headers.findIndex((h) => h.includes('evento'))
  const fallbackEventIdx = eventIdx !== -1 ? eventIdx : headers.findIndex((h) => h.includes('estado'))

  const effectiveEmailIdx = emailIdx !== -1 ? emailIdx : 0
  const effectiveEventIdx = fallbackEventIdx !== -1 ? fallbackEventIdx : 3

  // Mapa para rastrear el último evento por email (soporta Event Sourcing Alta/Baja)
  const userStatusMap = new Map()

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(separator).map((c) => c.trim().replace(/^["']|["']$/g, ''))
    const rawEmail = cols[effectiveEmailIdx]
    if (!rawEmail || !rawEmail.includes('@')) continue

    const email = rawEmail.toLowerCase()
    const rawEvent = (cols[effectiveEventIdx] || '').toLowerCase()

    // Determinamos si el usuario no debe recibir envíos (Baja, Inactivo, etc.)
    const isExcluded =
      rawEvent.includes('baja') ||
      rawEvent.includes('inactiv') ||
      rawEvent.includes('desuscrit') ||
      rawEvent.includes('unsub') ||
      rawEvent.includes('cancel')

    userStatusMap.set(email, {
      email,
      active: !isExcluded,
      lastEvent: cols[effectiveEventIdx] || 'Alta',
    })
  }

  // Retornar solo usuarios activos
  const activeRecipients = []
  const unsubscribedRecipients = []

  for (const record of userStatusMap.values()) {
    if (record.active) {
      activeRecipients.push(record.email)
    } else {
      unsubscribedRecipients.push(record.email)
    }
  }

  return { activeRecipients, unsubscribedRecipients }
}



/**
 * Envío de campaña masiva
 */
async function runCampaign() {
  console.log('====================================================')
  console.log('       BITSPACE • EMAIL CAMPAIGN SENDER             ')
  console.log('====================================================')

  if (IS_TEST2) {
    console.log(`🧪 [MODO TEST2 ACTIVO - Envío de prueba al equipo]`)
    console.log(`🎯 Destinatarios: ${TEST2_EMAILS.join(', ')}\n`)
  } else if (IS_TEST) {
    console.log(`🧪 [MODO TEST ACTIVO - Envío individual de prueba]`)
    console.log(`🎯 Destinatario único: ${TEST_EMAIL}\n`)
  }

  console.log(`📄 Leyendo archivo CSV: ${path.basename(csvPath)}`)
  console.log(`🎨 Plantilla HTML: ${path.basename(templatePath)}`)
  const { activeRecipients, unsubscribedRecipients } = parseWaitlistCsv(csvPath)

  console.log(`\n📊 Análisis del CSV:`)
  console.log(`   - Correos activos en la lista: ${activeRecipients.length}`)
  console.log(`   - Correos descartados (Baja / Inactivo): ${unsubscribedRecipients.length}`)

  if (unsubscribedRecipients.length > 0) {
    console.log(`   🚫 Descartados detectados: ${unsubscribedRecipients.join(', ')}`)
  }

  // Destinatarios efectivos según si es modo test, test2 o masivo
  let recipientsToSend = activeRecipients
  if (IS_TEST2) {
    recipientsToSend = TEST2_EMAILS
  } else if (IS_TEST) {
    recipientsToSend = [TEST_EMAIL]
  }

  if (recipientsToSend.length === 0) {
    console.log('\n⚠️ No hay destinatarios activos para enviar. Finalizando.')
    return
  }

  // Configuración de la Campaña actual
  // 1. Remitente: desde .env o cabecera
  const fromSender = process.env.RESEND_FROM || 'BitSpace: Digital WellBeing <info@bitspace.es>'

  // 2. Asunto: Si se pasa por flag -s/--subject se usa ese.
  // Si no, se extrae directamente del <title> de la plantilla HTML cargada.
  const htmlTitleMatch = baseTemplate.match(/<title>([^<]+)<\/title>/i)
  const baseSubject = customSubjectArg || (htmlTitleMatch ? htmlTitleMatch[1].trim() : 'Novedades de BitSpace')
  const subject = IS_TEST ? `[PRUEBA] ${baseSubject}` : baseSubject

  if (IS_DRY_RUN) {
    console.log('\n🧪 [MODO DRY-RUN ACTIVADO - No se enviará ningún correo real]')
    console.log(`Asunto: "${subject}"`)
    console.log(`Remitente: "${fromSender}"`)
    console.log(`Plantilla: ${path.basename(templatePath)}`)
    if (customScheduleArg) {
      console.log(`⏰ Programación (scheduledAt): "${customScheduleArg}"`)
    }
    console.log('Destinatarios que recibirían el correo:')
    recipientsToSend.forEach((email, i) => console.log(`   ${i + 1}. ${email}`))
    console.log('\n✅ Simulación completada con éxito. Para enviar de verdad, quita el flag --dry-run.')
    return
  }

  // Confirmación expresa obligatoria cuando NO es modo test ni dry-run
  if (!IS_TEST) {
    const actionWord = customScheduleArg ? 'PROGRAMAR' : 'enviar'
    console.log(`\n⚠️  ATENCIÓN: Estás a punto de ${actionWord} una campaña REAL a ${recipientsToSend.length} destinatarios.`)
    console.log(`   - Remitente:    "${fromSender}"`)
    console.log(`   - Asunto:       "${subject}"`)
    console.log(`   - Plantilla:    "${path.basename(templatePath)}"`)
    if (customScheduleArg) {
      console.log(`   - Programado:   "${customScheduleArg}" (se enviará automáticamente en la fecha indicada)`)
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    const promptText = customScheduleArg
      ? `\n¿Confirmas PROGRAMAR el envío masivo para "${customScheduleArg}"? Escribe "SI" para proceder: `
      : '\n¿Confirmas el envío masivo INMEDIATO? Escribe "SI" para proceder (o Enter para cancelar): '

    const answer = await rl.question(promptText)
    rl.close()

    if (answer.trim().toUpperCase() !== 'SI') {
      console.log('\n🛑 Acción CANCELADA por el usuario. No se ha enviado ni programado ningún correo.\n')
      process.exit(0)
    }

    console.log('\n🔒 Confirmación recibida. Procediendo...\n')
  }

  const logAction = customScheduleArg ? 'programación' : 'envío'
  console.log(`\n🚀 Iniciando ${logAction} con Resend (${recipientsToSend.length} ${recipientsToSend.length === 1 ? 'correo' : 'correos'})...`)
  if (customScheduleArg) {
    console.log(`⏰ Hora de entrega programada: "${customScheduleArg}"`)
  }
  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < recipientsToSend.length; i++) {
    const toEmail = recipientsToSend[i]
    console.log(`[${i + 1}/${recipientsToSend.length}] ${customScheduleArg ? 'Programando' : 'Enviando'} a: ${toEmail}...`)

    // Inyectar el email de desuscripción único del usuario en el HTML de la campaña
    const userHtml = baseTemplate.replace(/{{EMAIL}}/g, encodeURIComponent(toEmail))

    // Generar versión en texto plano automática a partir del HTML de la campaña para filtros antispam
    const plainText = userHtml
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '$2 ($1)')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<li[^>]*>/gi, '• ')
      .replace(/<\/li>/gi, '\n')
      .replace(/<\/h[1-6]>/gi, '\n\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&bull;/g, '•')
      .replace(/&rarr;/g, '→')
      .replace(/&nbsp;/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim()

    const payload = {
      from: fromSender,
      to: [toEmail],
      subject,
      html: userHtml,
      text: plainText,
      headers: {
        'List-Unsubscribe': `<https://bitspace.es/unsubscribe?email=${encodeURIComponent(toEmail)}>`,
      },
    }

    if (customScheduleArg) {
      payload.scheduledAt = customScheduleArg
    }

    const { data, error } = await resend.emails.send(payload)

    if (error) {
      console.error(`   ❌ Error: ${error.message}`)
      errorCount++
    } else {
      console.log(`   ✅ ${customScheduleArg ? 'Programado' : 'Enviado'} (ID: ${data?.id})`)
      successCount++
    }

    // Pausa de 120ms para respetar el límite de 10 peticiones/segundo de Resend
    if (i < activeRecipients.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 120))
    }
  }

  console.log('\n====================================================')
  console.log(`🏁 Proceso finalizado: ${successCount} ${customScheduleArg ? 'programados' : 'enviados'}, ${errorCount} errores.`)
  if (customScheduleArg) {
    console.log(`ℹ️  Puedes revisar o cancelar correos programados en el Dashboard de Resend.`)
  }
  console.log('====================================================\n')
}

runCampaign()
