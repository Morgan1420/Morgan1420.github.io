# Campañas de Email • BitSpace

En esta carpeta organizas y ejecutas los envíos de correos masivos a la lista de espera con **Resend**.

---

## 📁 Estructura de archivos

```text
email-campaigns/
├── template-base.html        # Plantilla corporativa HTML (Logo estirado, mascota Bit y enlace de baja)
├── waitlist.csv              # Tu archivo CSV descargado de Google Sheets (ignorado por Git por privacidad)
├── waitlist.example.csv      # Ejemplo de referencia con las 4 columnas
├── send-campaign.js          # Script ejecutor que lee el CSV, descarta bajas y envía por Resend
└── README.md                 # Esta guía de uso
```

---

## 📊 Formato del archivo `waitlist.csv`

El archivo exportado desde tu Google Sheets debe tener las 4 columnas:
```csv
Email,Fecha Alta,Estado,Evento
usuario1@gmail.com,2026-10-15 10:30:00,1,Alta
usuario2@hotmail.com,2026-10-16 14:20:00,2,Alta
usuario3@yahoo.es,2026-10-17 09:15:00,1,Baja
```

### Reglas automáticas de filtrado:
- Si el **último evento** de un email es `Baja`, `Desuscrito` o `Cancelado`, el script **lo omite automáticamente** (no le envía nada).
- Si un usuario tiene múltiples filas (por ejemplo se dio de alta, luego baja, y luego alta otra vez), el script evalúa el **estado más reciente**.
- Elimina correos duplicados para que nadie reciba el mismo email dos veces.

---

## 🚀 Cómo enviar una campaña

1. Descarga tu hoja de Google Sheets en formato CSV:
   - En Google Sheets: **Archivo &rarr; Descargar &rarr; Valores separados por comas (.csv)**.
   - Guárdalo en esta carpeta con el nombre exacto: `waitlist.csv`.

2. **Flag obligatorio `--campaign` o `-c`**:
   No existe una campaña por defecto por seguridad. Siempre debes indicar qué plantilla HTML quieres utilizar (ej: `campana-devblog-rebranding.html`).

3. Ejecuta un **simulacro en seco** (Dry-run, no envía correos, solo comprueba quién lo recibiría):
   ```bash
   node email-campaigns/send-campaign.js --campaign campana-devblog-rebranding.html --dry-run
   ```

4. **Prueba enviándotelo solo a ti (`gerardgarciagros@gmail.com`)**:
   ```bash
   node email-campaigns/send-campaign.js --campaign campana-devblog-rebranding.html --test
   ```

5. **Prueba enviándotelo a ti y a Jan (`gerardgarciagros@gmail.com` y `jan.moran.r@gmail.com`)**:
   ```bash
   node email-campaigns/send-campaign.js --campaign campana-devblog-rebranding.html --test2
   ```
   *(También puedes combinarlo con `--dry-run`: `node email-campaigns/send-campaign.js -c campana-devblog-rebranding.html --test2 --dry-run`)*

6. **Cambiar el asunto directamente por terminal (`--subject` o `-s`)**:
   *(Por defecto toma el `<title>` del HTML, pero puedes sobrescribirlo)*:
   ```bash
   node email-campaigns/send-campaign.js --campaign campana-devblog-rebranding.html --subject "¡Nuevo DevBlog de BitSpace!" --test
   ```

6. **Programar el envío para una fecha u hora futura (`--schedule`)**:
   Gracias al soporte nativo de Resend, puedes programar la entrega para que se ejecute automáticamente desde sus servidores en la nube sin depender de tu máquina:
   ```bash
   # Lenguaje natural (ej. mañana a las 10:00)
   node email-campaigns/send-campaign.js --campaign campana-devblog-rebranding.html --schedule "tomorrow at 10am"

   # O fecha exacta (ISO 8601 UTC)
   node email-campaigns/send-campaign.js --campaign campana-devblog-rebranding.html --schedule "2026-11-02T10:00:00Z"
   ```
   *(Siempre te solicitará confirmación expresa escribiendo `SI` antes de encolarlos en Resend)*.

7. Ejecuta el **envío masivo a toda la lista**:
   ```bash
   node email-campaigns/send-campaign.js --campaign campana-devblog-rebranding.html
   ```
   > ⚠️ **Mecanismo de seguridad obligatorio**: Al ejecutar un envío real (sin `--test` ni `--dry-run`), el script se detiene, te muestra el remitente, asunto y número de destinatarios, y te pedirá escribir expresamente `SI` para continuar. Si presionas Enter o cualquier otra tecla, el envío se cancela de inmediato sin mandar nada.

---

## 🔒 Privacidad y Seguridad (RGPD)
- Los archivos `*.csv` de esta carpeta están añadidos al `.gitignore` para que las direcciones de correo de tus usuarios **nunca** se suban a GitHub.
- Cada correo enviado incluye en el pie su enlace único de desuscripción: `https://bitspace.es/unsubscribe?email=...` y la cabecera estándar `List-Unsubscribe`.
