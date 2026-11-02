/* eslint-disable */
/**
 * Google Apps Script - Waitlist BitSpace
 * Modelo Event Sourcing para Time-Series (Gráfica de usuarios acumulados)
 *
 * Estructura de la hoja:
 * Col A: Email
 * Col B: Fecha (Timestamp)
 * Col C: Total Usuarios (Conteo acumulado que alimenta la gráfica)
 * Col D: Tipo de Evento ('Alta' | 'Baja')
 */

function doGet(e) {
  return handleRequest(e ? e.parameter : {}, false)
}

function doPost(e) {
  var params = {}

  if (e) {
    if (e.parameter) {
      params = Object.assign({}, e.parameter)
    }

    if (e.postData && e.postData.contents) {
      var ctype = (e.postData.type || '').toLowerCase()
      if (ctype.indexOf('application/json') !== -1) {
        try {
          var jsonData = JSON.parse(e.postData.contents || '{}')
          params = Object.assign(params, jsonData)
        } catch (err) {
          // Ignorar si no se puede parsear
        }
      } else if (ctype.indexOf('application/x-www-form-urlencoded') !== -1) {
        e.postData.contents.split('&').forEach(function (p) {
          var parts = p.split('=')
          params[decodeURIComponent(parts[0] || '')] = decodeURIComponent(parts[1] || '')
        })
      }
    }
  }

  return handleRequest(params, true)
}

function handleRequest(params, isPost) {
  var sheetName = 'Waitlist BitSpace'
  var callback = params.callback
  var action = (params.action || 'register').toLowerCase().trim()
  var email = params.email
  var result = {}

  // 1. Adquirir bloqueo con LockService para evitar condiciones de carrera por concurrencia
  var lock = LockService.getScriptLock()
  try {
    lock.waitLock(10000) // 10 segundos de espera máxima
  } catch (lockErr) {
    return createResponse(
      { result: 'error', message: 'El servidor está ocupado. Inténtalo de nuevo en unos segundos.' },
      callback,
      isPost
    )
  }

  try {
    if (!email || typeof email !== 'string' || email.trim() === '') {
      throw new Error('El correo electrónico no es válido.')
    }

    var cleanEmail = email.trim()
    var lowerEmail = cleanEmail.toLowerCase()

    var ss = SpreadsheetApp.getActiveSpreadsheet()
    var sheet = ss.getSheetByName(sheetName)
    if (!sheet) {
      throw new Error("La hoja '" + sheetName + "' no fue encontrada.")
    }

    // Inicializar cabeceras si la hoja está totalmente vacía
    if (sheet.getLastRow() < 1) {
      sheet.appendRow(['Email', 'Fecha', 'Estado', 'Evento'])
    } else {
      // Asegurar que la columna D tenga cabecera si aún no la tiene
      if (sheet.getLastColumn() < 4 || sheet.getRange(1, 4).getValue() === '') {
        sheet.getRange(1, 4).setValue('Evento')
      }
    }

    var lastRow = sheet.getLastRow()
    var rowData = []
    var currentCount = 0
    var emailLatestEvent = {} // email -> 'Alta' | 'Baja'

    if (lastRow >= 2) {
      var colsToRead = Math.max(sheet.getLastColumn(), 4)
      rowData = sheet.getRange(2, 1, lastRow - 1, colsToRead).getValues()

      for (var i = 0; i < rowData.length; i++) {
        var row = rowData[i]
        var eEmail = String(row[0] || '').toLowerCase().trim()
        var eCount = Number(row[2])
        var eType = String(row[3] || 'Alta').trim()

        if (!isNaN(eCount) && row[2] !== '') {
          currentCount = eCount
        }

        if (eEmail) {
          emailLatestEvent[eEmail] = eType
        }
      }
    }

    var isCurrentlyActive = emailLatestEvent[lowerEmail] === 'Alta'

    // Acción 1: Valoración / Feedback (5 estrellas del email)
    if (action === 'feedback') {
      var rating = String(params.rating || '').trim()
      var feedbackSheetName = 'Feedback Rebranding'
      var feedbackSheet = ss.getSheetByName(feedbackSheetName)

      if (!feedbackSheet) {
        feedbackSheet = ss.insertSheet(feedbackSheetName)
        feedbackSheet.appendRow(['Fecha', 'Email', 'Puntuación (1-5)'])
        feedbackSheet.getRange(1, 1, 1, 3).setFontWeight('bold')
      }

      feedbackSheet.appendRow([new Date(), cleanEmail, rating])

      // Retorno visual amigable cuando el usuario hace clic desde el correo
      if (!isPost && !callback) {
        var thankYouHtml =
          '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
          '<title>¡Gracias por tu valoración! - BitSpace</title>' +
          '<style>' +
          'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #fcfbf9; color: #18181b; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }' +
          '.card { background: #ffffff; border-radius: 24px; padding: 40px 28px; max-width: 440px; width: 100%; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1.5px solid #f4f4f5; }' +
          '.stars { font-size: 32px; margin-bottom: 16px; letter-spacing: 2px; }' +
          'h1 { font-size: 22px; font-weight: 800; margin: 0 0 10px 0; color: #18181b; letter-spacing: -0.02em; }' +
          'p { font-size: 15px; line-height: 24px; color: #52525b; margin: 0 0 24px 0; }' +
          '.btn { display: inline-block; background-color: #ade5a8; color: #18181b; font-weight: 700; font-size: 15px; padding: 12px 28px; border-radius: 999px; text-decoration: none; box-shadow: 0 4px 14px rgba(173, 229, 168, 0.4); }' +
          '</style></head><body>' +
          '<div class="card">' +
          '<div class="stars">⭐ ' + rating + ' / 5</div>' +
          '<h1>¡Muchas gracias por tu opinión!</h1>' +
          '<p>Hemos guardado tu valoración. Tu opinión es clave para seguir dando forma a BitSpace.</p>' +
          '<a class="btn" href="https://bitspace.es" target="_top">Ir a BitSpace.es &rarr;</a>' +
          '</div></body></html>'

        return HtmlService.createHtmlOutput(thankYouHtml).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      }

      result = {
        result: 'success',
        message: 'Feedback registrado correctamente.',
        rating: rating,
      }
    } else if (action === 'lang') {
      // Acción 2: Preferencia de idioma para futuros correos
      var langCode = String(params.lang || 'es').toLowerCase().trim()
      var langNames = { ca: 'Català', es: 'Español', en: 'English' }
      var selectedLangName = langNames[langCode] || 'Español'

      // Asegurar cabecera en Columna E (Idioma) si no existe
      var langColIndex = 5
      if (sheet.getLastColumn() < langColIndex || sheet.getRange(1, langColIndex).getValue() === '') {
        sheet.getRange(1, langColIndex).setValue('Idioma')
        sheet.getRange(1, langColIndex).setFontWeight('bold')
      }

      // Buscar si el usuario ya existe en la lista para actualizar su preferencia
      var updated = false
      if (lastRow >= 2) {
        for (var rowIdx = 2; rowIdx <= lastRow; rowIdx++) {
          var rowEmail = String(sheet.getRange(rowIdx, 1).getValue() || '').toLowerCase().trim()
          if (rowEmail === lowerEmail) {
            sheet.getRange(rowIdx, langColIndex).setValue(selectedLangName)
            updated = true
          }
        }
      }

      // Si por alguna razón no estaba en la hoja, lo registramos con su idioma
      if (!updated) {
        var newCount = currentCount + 1
        sheet.appendRow([cleanEmail, new Date(), newCount, 'Alta', selectedLangName])
      }

      if (!isPost && !callback) {
        var i18nTexts = {
          ca: {
            titleTag: 'Preferència d\'idioma desada - BitSpace',
            heading: 'Idioma actualitzat',
            desc: 'Hem desat la teva preferència: <strong>Català</strong>. Rebràs les properes novetats en aquest idioma.',
            btnText: 'Anar a BitSpace.es &rarr;',
          },
          es: {
            titleTag: 'Preferencia de idioma guardada - BitSpace',
            heading: 'Idioma actualizado',
            desc: 'Hemos guardado tu preferencia: <strong>Español</strong>. Recibirás las próximas novedades en este idioma.',
            btnText: 'Ir a BitSpace.es &rarr;',
          },
          en: {
            titleTag: 'Language preference saved - BitSpace',
            heading: 'Language updated',
            desc: 'We have saved your preference: <strong>English</strong>. You will receive upcoming news in this language.',
            btnText: 'Go to BitSpace.es &rarr;',
          },
        }

        var t = i18nTexts[langCode] || i18nTexts.es

        var langHtml =
          '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
          '<title>' + t.titleTag + '</title>' +
          '<style>' +
          'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #fcfbf9; color: #18181b; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }' +
          '.card { background: #ffffff; border-radius: 24px; padding: 40px 28px; max-width: 440px; width: 100%; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1.5px solid #f4f4f5; }' +
          '.icon { font-size: 32px; margin-bottom: 16px; }' +
          'h1 { font-size: 22px; font-weight: 800; margin: 0 0 10px 0; color: #18181b; letter-spacing: -0.02em; }' +
          'p { font-size: 15px; line-height: 24px; color: #52525b; margin: 0 0 24px 0; }' +
          '.btn { display: inline-block; background-color: #ade5a8; color: #18181b; font-weight: 700; font-size: 15px; padding: 12px 28px; border-radius: 999px; text-decoration: none; box-shadow: 0 4px 14px rgba(173, 229, 168, 0.4); }' +
          '</style></head><body>' +
          '<div class="card">' +
          '<div class="icon">🌐</div>' +
          '<h1>' + t.heading + '</h1>' +
          '<p>' + t.desc + '</p>' +
          '<a class="btn" href="https://bitspace.es" target="_top">' + t.btnText + '</a>' +
          '</div></body></html>'

        return HtmlService.createHtmlOutput(langHtml).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      }

      result = {
        result: 'success',
        message: 'Preferencia de idioma actualizada.',
        lang: selectedLangName,
      }
    } else if (action === 'unsubscribe') {
      // Caso 1: Nunca se ha registrado
      if (!emailLatestEvent[lowerEmail]) {
        result = {
          result: 'not_found',
          message: 'El correo electrónico no se encuentra registrado en la lista de espera.',
        }
      }
      // Caso 2: Ya estaba dado de baja previamente
      else if (emailLatestEvent[lowerEmail] === 'Baja') {
        result = {
          result: 'already_unsubscribed',
          message: 'Este correo electrónico ya estaba dado de baja previamente.',
        }
      }
      // Caso 3: Está activo -> Registrar nuevo evento de Baja (resta 1 al contador)
      else {
        var newCount = Math.max(0, currentCount - 1)
        sheet.appendRow([cleanEmail, new Date(), newCount, 'Baja'])
        result = {
          result: 'success',
          message: 'Te has desuscrito correctamente de la lista de espera.',
        }
      }
    } else {
      // Acción de Registro / Suscripción (action === 'register' o por defecto)
      // Caso A: Ya está activo en la lista
      if (isCurrentlyActive) {
        result = {
          result: 'exists',
          message: 'Este correo electrónico ya se encuentra registrado en la lista de espera.',
        }
      }
      // Caso B: Nuevo usuario o usuario que se había dado de baja y vuelve (suma 1 al contador)
      else {
        var newCount = currentCount + 1
        sheet.appendRow([cleanEmail, new Date(), newCount, 'Alta'])
        result = { result: 'success' }
      }
    }
  } catch (err) {
    result = { result: 'error', message: err.message }
  } finally {
    try {
      lock.releaseLock()
    } catch (e) {
      // Ignorar si el lock ya expiró
    }
  }

  return createResponse(result, callback, isPost)
}

function createResponse(result, callback, isPost) {
  var jsonString = JSON.stringify(result)

  if (callback && !isPost) {
    // JSONP para peticiones directas desde el navegador evitando bloqueos CORS
    var jsOutput = callback + '(' + jsonString + ');'
    return ContentService.createTextOutput(jsOutput).setMimeType(
      ContentService.MimeType.JAVASCRIPT
    )
  }

  return ContentService.createTextOutput(jsonString)
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
}
