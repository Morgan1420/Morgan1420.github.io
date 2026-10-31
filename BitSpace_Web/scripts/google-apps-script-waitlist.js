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

    if (action === 'unsubscribe') {
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
