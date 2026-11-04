// Generador automático de sitemap.xml y rutas estáticas para BitSpace
// Fuente de la verdad única: src/data/articles.js

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { ARTICLES } from '../src/data/articles.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const DIST_DIR = path.resolve(ROOT_DIR, 'dist')
const SITEMAP_PATH = path.resolve(ROOT_DIR, 'public/sitemap.xml')
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html')

if (!fs.existsSync(INDEX_HTML_PATH)) {
  console.error('❌ Error: dist/index.html no existe. Ejecuta vite build primero.')
  process.exit(1)
}

const baseTemplate = fs.readFileSync(INDEX_HTML_PATH, 'utf-8')

const DEFAULT_META = {
  ca: {
    title: 'BitSpace - Benestar Digital | Cuida la teva mascota digital',
    description:
      'Cuida la teva mascota digital i millora els teus hàbits de salut. BitSpace gamifica el teu descans, activitat física, lectura i concentració.',
  },
  es: {
    title: 'BitSpace - Bienestar Digital | Cuida tu mascota digital',
    description:
      'Cuida tu mascota digital y mejora tus hábitos de salud. BitSpace gamifica tu desconexión, deporte, lectura y concentración diaria.',
  },
  en: {
    title: 'BitSpace - Digital Wellbeing | Care for your digital pet',
    description:
      'Take care of your digital pet and build healthy habits. BitSpace gamifies your digital detox, fitness, reading and focus.',
  },
}

const HUB_META = {
  ca: {
    title: 'Recursos i Guies de Benestar Digital | BitSpace',
    description:
      "Articles, guies de desintoxicació digital, comparatives d'eines i tutorials per crear hàbits saludables amb la tecnologia.",
  },
  es: {
    title: 'Recursos y Guías de Bienestar Digital | BitSpace',
    description:
      'Artículos, guías de desintoxicación digital, comparativas de herramientas y tutoriales para crear hábitos saludables con la tecnología.',
  },
  en: {
    title: 'Digital Wellbeing Resources & Guides | BitSpace',
    description:
      'Articles, digital detox guides, tool comparisons, and step-by-step tutorials to build healthy habits with technology.',
  },
}

const languages = ['ca', 'es', 'en']
const routesToGenerate = []

// 1. Home routes
languages.forEach((lang) => {
  routesToGenerate.push({
    route: `/${lang}`,
    lang,
    title: DEFAULT_META[lang].title,
    description: DEFAULT_META[lang].description,
  })
})

// 2. Hub routes
languages.forEach((lang) => {
  routesToGenerate.push({
    route: `/${lang}/recursos`,
    lang,
    title: HUB_META[lang].title,
    description: HUB_META[lang].description,
  })
})

// 3. Articles
ARTICLES.forEach((article) => {
  languages.forEach((lang) => {
    const artTitle = article.title[lang] || article.title.es || article.title.ca
    const artDesc =
      (article.metaDescription &&
        (article.metaDescription[lang] ||
          article.metaDescription.es ||
          article.metaDescription.ca)) ||
      (article.summary && (article.summary[lang] || article.summary.ca)) ||
      ''

    routesToGenerate.push({
      route: `/${lang}/recursos/${article.slug}`,
      lang,
      title: `${artTitle} | BitSpace`,
      description: artDesc,
      heroImage: article.heroImage || null,
    })
  })
})

function injectMeta(html, { route, lang, title, description, heroImage }) {
  const canonicalUrl = `https://bitspace.es${route}`
  let modified = html

  modified = modified.replace(/<html\s+lang="[^"]*"/i, `<html lang="${lang}"`)
  modified = modified.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)

  if (description) {
    if (/<meta\s+name="description"[^>]*>/i.test(modified)) {
      modified = modified.replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="description" content="${description}" />`
      )
    }
  }

  if (/<meta\s+property="og:title"[^>]*>/i.test(modified)) {
    modified = modified.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${title}" />`
    )
  }
  if (description && /<meta\s+property="og:description"[^>]*>/i.test(modified)) {
    modified = modified.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${description}" />`
    )
  }
  if (/<meta\s+property="og:url"[^>]*>/i.test(modified)) {
    modified = modified.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    )
  }
  if (heroImage && /<meta\s+property="og:image"[^>]*>/i.test(modified)) {
    const fullImage = heroImage.startsWith('http')
      ? heroImage
      : `https://bitspace.es${heroImage}`
    modified = modified.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:image" content="${fullImage}" />`
    )
  }

  if (/<link\s+rel="canonical"[^>]*>/i.test(modified)) {
    modified = modified.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
  }

  // Actualizar etiquetas hreflang para que apunten a los idiomas hermanos de esta ruta exacta
  const languagesList = ['ca', 'es', 'en']
  languagesList.forEach((altLang) => {
    const altRoute = route.replace(/^\/(?:ca|es|en)/, `/${altLang}`)
    const altUrl = `https://bitspace.es${altRoute}`
    const hreflangRegex = new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${altLang}"\\s+href="[^"]*"\\s*\\/?>`, 'i')
    if (hreflangRegex.test(modified)) {
      modified = modified.replace(
        hreflangRegex,
        `<link rel="alternate" hreflang="${altLang}" href="${altUrl}" />`
      )
    }
  })

  // Actualizar x-default a la versión en catalán de esta ruta
  const caRoute = route.replace(/^\/(?:ca|es|en)/, '/ca')
  const xDefaultUrl = `https://bitspace.es${caRoute}`
  const xDefaultRegex = /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/i
  if (xDefaultRegex.test(modified)) {
    modified = modified.replace(
      xDefaultRegex,
      `<link rel="alternate" hreflang="x-default" href="${xDefaultUrl}" />`
    )
  }

  return modified
}

console.log('🚀 Generando rutas estáticas para GitHub Pages (SEO 200 OK)...')
routesToGenerate.forEach((r) => {
  const targetDir = path.join(DIST_DIR, r.route.replace(/^\//, ''))
  fs.mkdirSync(targetDir, { recursive: true })
  const outputHtml = injectMeta(baseTemplate, r)
  const outputPath = path.join(targetDir, 'index.html')
  fs.writeFileSync(outputPath, outputHtml, 'utf-8')
  console.log(`  ✓ ${r.route} -> ${path.relative(DIST_DIR, outputPath)}`)
})

// Sincronizar sitemap.xml dinámicamente según ARTICLES
const today = new Date().toISOString().split('T')[0]

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Catalan / Default Home -->
  <url>
    <loc>https://bitspace.es/ca</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ca" href="https://bitspace.es/ca"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://bitspace.es/es"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://bitspace.es/en"/>
  </url>
  
  <!-- Spanish Home -->
  <url>
    <loc>https://bitspace.es/es</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ca" href="https://bitspace.es/ca"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://bitspace.es/es"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://bitspace.es/en"/>
  </url>
  
  <!-- English Home -->
  <url>
    <loc>https://bitspace.es/en</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ca" href="https://bitspace.es/ca"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://bitspace.es/es"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://bitspace.es/en"/>
  </url>
  
  <!-- Root redirect -->
  <url>
    <loc>https://bitspace.es/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Recursos Hub CA -->
  <url>
    <loc>https://bitspace.es/ca/recursos</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="ca" href="https://bitspace.es/ca/recursos"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://bitspace.es/es/recursos"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://bitspace.es/en/recursos"/>
  </url>

  <!-- Recursos Hub ES -->
  <url>
    <loc>https://bitspace.es/es/recursos</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="ca" href="https://bitspace.es/ca/recursos"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://bitspace.es/es/recursos"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://bitspace.es/en/recursos"/>
  </url>

  <!-- Recursos Hub EN -->
  <url>
    <loc>https://bitspace.es/en/recursos</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="ca" href="https://bitspace.es/ca/recursos"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://bitspace.es/es/recursos"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://bitspace.es/en/recursos"/>
  </url>
`

ARTICLES.forEach((article) => {
  const artDate = article.publishDate || today
  languages.forEach((lang) => {
    sitemapXml += `  <url>
    <loc>https://bitspace.es/${lang}/recursos/${article.slug}</loc>
    <lastmod>${artDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
    <xhtml:link rel="alternate" hreflang="es" href="https://bitspace.es/es/recursos/${article.slug}"/>
    <xhtml:link rel="alternate" hreflang="ca" href="https://bitspace.es/ca/recursos/${article.slug}"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://bitspace.es/en/recursos/${article.slug}"/>
  </url>\n`
  })
})

sitemapXml += `</urlset>\n`

// Guardar en public/sitemap.xml y en dist/sitemap.xml
fs.writeFileSync(SITEMAP_PATH, sitemapXml, 'utf-8')
const distSitemapPath = path.join(DIST_DIR, 'sitemap.xml')
if (fs.existsSync(DIST_DIR)) {
  fs.writeFileSync(distSitemapPath, sitemapXml, 'utf-8')
}
console.log(`📄 Sitemap.xml actualizado automáticamente con ${ARTICLES.length} artículo(s).`)
