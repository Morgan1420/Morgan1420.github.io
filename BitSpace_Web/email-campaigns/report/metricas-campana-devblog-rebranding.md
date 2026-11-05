# Reporte de Métricas • Campaña DevBlog & Rebranding

Informe de rendimiento de la campaña de email marketing enviada a la waitlist de **BitSpace**.

---

## 📌 Ficha Técnica de la Campaña

| Parámetro | Detalle |
| :--- | :--- |
| **Campaña / Plantilla** | [`campana-devblog-rebranding.html`](../campana-devblog-rebranding.html) |
| **Asunto** | *Nuevo DevBlog y Rebranding en BitSpace* |
| **Remitente** | `BitSpace: Digital WellBeing <info@bitspace.es>` |
| **Fecha de Envío** | 2 de noviembre de 2026 (~14:51 - 14:52 UTC) |
| **Fecha de Corte de Métricas** | 4 de noviembre de 2026 (21:02 UTC) |
| **Archivo Fuente** | [`emails-sent-1793822564666.csv`](../emails-sent-1793822564666.csv) |

---

## 📊 Resumen Ejecutivo (Producción: N = 105)

> Se desglosan exclusivamente los **105 destinatarios reales** de producción (excluyendo los 29 envíos internos de prueba con prefijo `[PRUEBA]`).

| Métrica | Envíos / Total | Ratio | Benchmark Tech / SaaS | Estado |
| :--- | :---: | :---: | :---: | :---: |
| **Total Enviados** | 105 | 100.0% | — | — |
| **Entregados (Delivery Rate)** | 101 | **96.19%** | 97% – 99% | 🟢 Sólido |
| **Rebotes (Bounce Rate)** | 4 | **3.81%** | < 2.0% | 🟡 Requiere limpieza |
| **Aperturas Únicas (Open Rate)** | 39 | **38.61%** *(s/ entregados)* | 21% – 25% | 🚀 **+55% sobre la media** |
| **Clicks Totales (CTR)** | 11 | **10.89%** *(s/ entregados)* | 2.5% – 3.5% | 🔥 **x3 benchmark** |
| **Click-to-Open Rate (CTOR)** | 11 / 39 | **28.21%** *(s/ abiertos)* | 10% – 15% | 🎯 **Engagement sobresaliente** |

---

## 📈 Embudo de Conversión (Funnel)

```
[105] Enviados
  └── [101] Entregados (96.19%)
        ├── [39] Abiertos (38.61% s/ entregados)
        │     └── [11] Clickeados (28.21% CTOR)
        └── [62] Entregados sin apertura registrada (61.39%)
```

---

## ⏱️ Evolución Temporal (Primeras 48 Horas)

Comparativa entre el primer reporte (2 Nov, 16:06 UTC) y el estado a 48h (4 Nov, 21:02 UTC):

- **Aperturas**: Pasaron de 22 a **39** (+17 aperturas orgánicas tardías).
- **Clicks**: Pasaron de 6 a **11** (+5 clicks adicionales).
- **Conclusión**: La audiencia de la waitlist lee el contenido con cierto decalaje temporal, pero el contenido mantuvo tracción activa durante al menos dos días.

---

## 🎯 Leads Cualificados (11 Clicks en Producción)

Destinatarios que hicieron click en los enlaces del DevBlog y la web:

| Email | Dominio | Tipo de Cuenta |
| :--- | :--- | :--- |
| `claudia.larumbe@esade.edu` | `esade.edu` | Universitaria / Negocios |
| `marc.drinceanu@autonoma.cat` | `autonoma.cat` | Universitaria |
| `1749915@uab.cat` | `uab.cat` | Universitaria (Estudiante) |
| `gabriel.juan@uab.cat` | `uab.cat` | Universitaria |
| `javier.delrio@uab.cat` | `uab.cat` | Universitaria |
| `vdecubas@tecous.es` | `tecous.es` | Corporativa |
| `andreu.moran.r@gmail.com` | `gmail.com` | Personal |
| `polroca2001@gmail.com` | `gmail.com` | Personal |
| `ramongallinadcorti@gmail.com` | `gmail.com` | Personal |
| `maria.gros.garcia@gmail.com` | `gmail.com` | Personal |
| `aleixjb121@gmail.com` | `gmail.com` | Personal |

> **Observación clave**: Casi el 50% de los clicks provienen de dominios universitarios (`uab.cat`, `esade.edu`, `autonoma.cat`), confirmando una alta resonancia con estudiantes y jóvenes profesionales.

---

## ⚠️ Contactos Rebotados (Para Desactivar)

Los siguientes 4 correos generaron rebote permanente (`bounced`). Para proteger la reputación del remitente (`info@bitspace.es`), deben marcarse como `Inactivo` o `Baja` en la columna `Evento` de [`waitlist.csv`](../waitlist.csv):

1. `jan.moran.r2@gmail.com` (Posición #98)
2. `cbicuela101e@gmail.com` (Posición #64)
3. `simcodyt@gmail.com` (Posición #61)
4. `josemaria@escolajoanjuncadella.cat` (Posición #14)

---

## 🌐 Distribución por Proveedor de Correo

| Proveedor / Dominio | Total | Entregados | Abiertos | Clicks | Bounces |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `gmail.com` | 81 | 78 | 24 | 5 | 3 |
| `uab.cat` | 3 | 3 | 0 | 3 | 0 |
| `tecous.es` | 2 | 2 | 1 | 1 | 0 |
| `hotmail.com` | 2 | 2 | 0 | 0 | 0 |
| `autonoma.cat` | 1 | 1 | 0 | 1 | 0 |
| `esade.edu` | 1 | 1 | 0 | 1 | 0 |
| `escolajoanjuncadella.cat` | 1 | 0 | 0 | 0 | 1 |
| *Otros dominios individuales* | 14 | 14 | 3 | 0 | 0 |
