// Catálogo de Artículos y Recursos SEO/AEO para BitSpace
// Fundamentado en la investigación científica y el Brief oficial de BitSpace

import { ARTICLES_FUTUROS } from './articles_futuros.js'

export const ARTICLE_CATEGORIES = {
  comparativas: {
    id: 'comparativas',
    label: {
      es: 'Comparativas',
      ca: 'Comparatives',
      en: 'Comparisons',
    },
    description: {
      es: 'Análisis frente a otras herramientas del mercado para ayudarte a elegir con criterio.',
      ca: 'Anàlisi enfront d\'altres eines del mercat per ajudar-te a triar amb criteri.',
      en: 'In-depth comparisons against market tools to help you choose wisely.',
    },
  },
  guias: {
    id: 'guias',
    label: {
      es: 'Guías de Hábitos',
      ca: 'Guies d\'Hàbits',
      en: 'Habit Guides',
    },
    description: {
      es: 'Estrategias basadas en la psicología conductual y la neurociencia para recuperar tu tiempo.',
      ca: 'Estratègies basades en la psicologia conductual i la neurociència per recuperar el teu temps.',
      en: 'Strategies based on behavioral psychology and neuroscience to reclaim your time.',
    },
  },
  tutoriales: {
    id: 'tutoriales',
    label: {
      es: 'Tutoriales Paso a Paso',
      ca: 'Tutorials Pas a Pas',
      en: 'Step-by-Step Tutorials',
    },
    description: {
      es: 'Configuraciones técnicas y rutinas prácticas para reducir la fricción con tus dispositivos.',
      ca: 'Configuracions tècniques i rutines pràctiques per reduir la fricció amb els teus dispositius.',
      en: 'Technical configurations and practical routines to reduce friction with your devices.',
    },
  },
}

const INITIAL_ARTICLES = [
  // --------------------------------------------------------------------------
  // 1. COMPARATIVA: BitSpace vs Opal
  // --------------------------------------------------------------------------
  {
    slug: 'bitspace-vs-opal',
    category: 'comparativas',
    readTime: '7 min',
    publishDate: '2026-11-02',
    status: 'published',
    heroImage: '/images/articles/bitspace-vs-opal.jpg',
    heroImageAlt: {
      es: 'BitSpace vs Opal - Comparativa de Bienestar Digital',
      ca: 'BitSpace vs Opal - Comparativa de Benestar Digital',
      en: 'BitSpace vs Opal - Digital Wellbeing Comparison',
    },
    author: 'BitSpace Research Team',
    title: {
      es: 'BitSpace vs. Opal: ¿Bloqueo Rígido o Fricción Inteligente Gamificada?',
      ca: 'BitSpace vs. Opal: Bloqueig Rígid o Fricció Intel·ligent Gamificada?',
      en: 'BitSpace vs. Opal: Rigid Blocking vs. Gamified Smart Friction?',
    },
    summary: {
      es: 'Analizamos a fondo las diferencias entre el modelo de bloqueo estricto de Opal y el enfoque de hábitos adaptativos y mascota virtual de BitSpace.',
      ca: 'Analitzem a fons les diferències entre el model de bloqueig estricte d\'Opal i l\'enfocament d\'hàbits adaptatius i mascota virtual de BitSpace.',
      en: 'A deep-dive analysis comparing Opal\'s strict blocking approach with BitSpace\'s adaptive habits and virtual pet gamification.',
    },
    metaDescription: {
      es: 'Comparativa exhaustiva entre BitSpace y Opal. Descubre si te conviene un bloqueo estricto de pago o una alternativa con hábitos atómicos y mascota virtual.',
      ca: 'Comparativa exhaustiva entre BitSpace i Opal. Descobreix si et convé un bloqueig estricte de pagament o una alternativa amb hàbits atòmics i mascota virtual.',
      en: 'Detailed comparison between BitSpace and Opal. Find out if strict paywalled blocking or adaptive atomic habits with a virtual pet fits you better.',
    },
    scientificNote: {
      es: 'Estudios sobre autocontrol demuestran que la abstinencia forzada sin educación del impulso genera efecto rebote en más del 68% de los usuarios tras levantar el bloqueo.',
      ca: 'Estudis sobre autocontrol demostren que l\'abstinència forçada sense educació de l\'impuls genera efecte rebot en més del 68% dels usuaris un cop s\'aixeca el bloqueig.',
      en: 'Self-control studies show that forced abstinence without impulse retraining triggers a rebound binge in over 68% of users once the block lifts.',
    },
    tableData: {
      headers: {
        es: ['Característica', 'Opal', 'BitSpace'],
        ca: ['Característica', 'Opal', 'BitSpace'],
        en: ['Feature', 'Opal', 'BitSpace'],
      },
      rows: [
        {
          feature: {
            es: 'Filosofía de intervención',
            ca: 'Filosofia d\'intervenció',
            en: 'Intervention philosophy',
          },
          competitor: {
            es: 'Bloqueo estricto de VPN / DNS',
            ca: 'Bloqueig estricte de VPN / DNS',
            en: 'Strict VPN / DNS blocking',
          },
          bitspace: {
            es: 'Fricción conductual progresiva (Atomic Habits)',
            ca: 'Fricció conductual progressiva (Atomic Habits)',
            en: 'Progressive behavioral friction (Atomic Habits)',
          },
        },
        {
          feature: {
            es: 'Adaptabilidad de metas',
            ca: 'Adaptabilitat de metes',
            en: 'Goal adaptiveness',
          },
          competitor: {
            es: 'Rígida / Configuración manual',
            ca: 'Rígida / Configuració manual',
            en: 'Rigid / Manual setup',
          },
          bitspace: {
            es: 'Temporizadores adaptativos según tu historial real',
            ca: 'Temporitzadors adaptatius segons el teu historial real',
            en: 'Adaptive timers based on real usage history',
          },
        },
        {
          feature: {
            es: 'Gamificación y motivación',
            ca: 'Gamificació i motivació',
            en: 'Gamification & motivation',
          },
          competitor: {
            es: 'Puntaje numérico abstracto (Focus Score)',
            ca: 'Puntuació numèrica abstracta (Focus Score)',
            en: 'Abstract numerical Focus Score',
          },
          bitspace: {
            es: 'Mascota reactiva Bit, casa 2D personalizable y economía de recompensas',
            ca: 'Mascota reactiva Bit, casa 2D personalitzable i economia de recompenses',
            en: 'Reactive Bit pet, customizable 2D home & token economy',
          },
        },
        {
          feature: {
            es: 'Intervenciones antes de entrar',
            ca: 'Intervencions abans d\'entrar',
            en: 'Pre-access interventions',
          },
          competitor: {
            es: 'Cuenta atrás pasiva',
            ca: 'Compte enrere passiu',
            en: 'Passive countdown delay',
          },
          bitspace: {
            es: 'Pausa respiratoria obligatoria y escritura del motivo',
            ca: 'Pausa respiratòria obligatòria i escriptura del motiu',
            en: 'Mindful breathing pause and intention journaling',
          },
        },
        {
          feature: {
            es: 'Hábitos fuera de pantalla (offline)',
            ca: 'Hàbits fora de pantalla (offline)',
            en: 'Offline real-world habits',
          },
          competitor: {
            es: 'No monitoriza hábitos físicos',
            ca: 'No monitoritza hàbits físics',
            en: 'Does not track physical offline habits',
          },
          bitspace: {
            es: 'Registro de lectura, estudio y deporte que premian a tu Bit',
            ca: 'Registre de lectura, estudi i esport que premien el teu Bit',
            en: 'Logs reading, study, and fitness rewarding your Bit',
          },
        },
        {
          feature: {
            es: 'Modelo de precios',
            ca: 'Model de preus',
            en: 'Pricing model',
          },
          competitor: {
            es: 'Suscripción prémium elevada (~99 €/año)',
            ca: 'Subscripció prémium elevada (~99 €/any)',
            en: 'Expensive annual subscription (~$99/yr)',
          },
          bitspace: {
            es: 'Modelo ético accesible sin barreras abusivas',
            ca: 'Model ètic accessible sense barreres abusives',
            en: 'Accessible ethical model without abusive paywalls',
          },
        },
      ],
    },
    sections: {
      es: [
        {
          title: 'El dilema de los bloqueadores duros frente a la psicología humana',
          content: `Opal se ha consolidado en el ecosistema iOS como uno de los bloqueadores más populares. Su propuesta técnica es contundente: configurar perfiles de bloqueo que impiden físicamente abrir aplicaciones durante ventanas horarias determinadas. Sin embargo, cuando analizamos los patrones de abandono de los usuarios, surge un patrón constante: la **frustración por rigidez extrema**.
          
Cuando un sistema bloquea de golpe a un usuario que consume cuatro horas diarias de redes sociales, el cerebro experimenta un síndrome de privación inmediata. Al no haber un reentrenamiento del detonante neurológico, el usuario busca atajos, desactiva permisos de accesibilidad o termina desinstalando la aplicación para volver a su consumo habitual.`,
        },
        {
          title: 'La propuesta de BitSpace: Fricción progresiva y refuerzo positivo',
          content: `BitSpace parte de un pilar conceptual distinto fundamentado en la teoría de los hábitos atómicos (*Atomic Habits*): **no elimines el estímulo de golpe; añade fricción al hábito involuntario y recompensa la pausa consciente**.
          
En lugar de un muro infranqueable que genera rechazo, BitSpace implementa dos herramientas clave antes de abrir aplicaciones como Instagram o TikTok:
1. **Respirar antes de entrar:** Una animación respiratoria obligatoria que corta la inercia del movimiento automático de los dedos.
2. **Escribir antes de entrar:** Te exige redactar en una frase qué vienes a buscar específicamente, activando la corteza prefrontal y desactivando el piloto automático.
          
Además, tus progresos no son una fría gráfica estadística: se reflejan en el bienestar de **tu Bit**, una mascota virtual que vive en una habitación isométrica 2D y cuya felicidad depende directamente de tus decisiones digitales y tus hábitos en el mundo real.`,
        },
        {
          title: 'Veredicto: ¿Cuál deberías elegir?',
          content: `Si necesitas un cerrojo draconiano para una emergencia puntual y estás dispuesto a pagar una suscripción anual muy elevada, Opal puede servirte como medida de choque temporal. 
          
Si lo que buscas es **desarrollar una relación sana y duradera con la tecnología**, aprender a autorregularte sin castigos y disfrutar de un proceso gamificado que premie tus sesiones de estudio, deporte y lectura en el mundo real, **BitSpace** es la alternativa diseñada para ti.`,
        },
      ],
      ca: [
        {
          title: 'El dilema dels bloquejadors durs enfront de la psicologia humana',
          content: `Opal s'ha consolidat a l'ecosistema iOS com un dels bloquejadors més populars. La seva proposta tècnica és contundent: configurar perfils de bloqueig que impedeixen físicament obrir aplicacions durant finestres horàries determinades. No obstant això, quan analitzem els patrons d'abandonament dels usuaris, sorgeix un patró constant: la **frustració per rigidesa extrema**.
          
Quan un sistema bloqueja de cop un usuari que consumeix quatre hores diàries de xarxes socials, el cervell experimenta una privació immediata. Al no haver-hi un reentrenament del detonant neurològic, l'usuari busca dreceres, desactiva permisos o acaba desinstal·lant l'aplicació.`,
        },
        {
          title: 'La proposta de BitSpace: Fricció progressiva i reforç positiu',
          content: `BitSpace parteix d'un pilar conceptual diferent fonamentat en la teoria dels hàbits atòmics (*Atomic Habits*): **no eliminis l'estímul de cop; afegeix fricció a l'hàbit involuntari i recompensa la pausa conscient**.
          
En lloc d'un mur infranquejable que genera rebuig, BitSpace implementa dues eines clau abans d'obrir aplicacions com Instagram o TikTok:
1. **Respirar abans d'entrar:** Una pausa respiratòria que talla la inèrcia de l'obertura compulsiva.
2. **Escriure abans d'entrar:** T'exigeix redactar breument el motiu de la visita, activant la consciència activa.
          
A més, el teu progrés es reflecteix en el benestar del teu **Bit**, una mascota virtual que viu en una habitació isomètrica 2D i evoluciona amb els teus hàbits reals.`,
        },
        {
          title: 'Veredicte: Quina hauries de triar?',
          content: `Si necessites un bloqueig extrem puntual i el preu no és un problema, Opal pot oferir una solució temporal. Si busques **construir hàbits sostenibles en el temps**, integrar esport i lectura, i cuidar el teu descans sense frustració, **BitSpace** és la millor opció.`,
        },
      ],
      en: [
        {
          title: 'The hard-blocking dilemma versus human psychology',
          content: `Opal has established itself as a leading blocker on iOS with strict VPN-level app restrictions. However, behavioral data consistently points to a recurring failure mode: **extreme rigidity breeds abandonment**.
          
When an app abruptly cuts off access to platforms a user spends four hours a day browsing, the brain experiences withdrawal distress. Without rebuilding neurological self-regulation, users quickly bypass limits, toggle off permissions, or delete the app entirely.`,
        },
        {
          title: 'The BitSpace approach: Progressive friction and positive reinforcement',
          content: `BitSpace relies on behavioral economics and James Clear's Atomic Habits framework: **do not banish the stimulus abruptly; introduce mindful friction to the involuntary trigger and reward intentional pauses**.
          
Instead of a cold wall, BitSpace triggers mindful interventions prior to app launch:
1. **Breathe before entering:** A compulsory breathing circle to snap out of zombie scrolling.
2. **State your intention:** Prompting you to write why you need the app, bringing prefrontal awareness to reactive impulses.
          
Furthermore, your success directly cares for **your Bit**, your virtual pet in a 2D isometric room that thrives when you read, study, or exercise offline.`,
        },
        {
          title: 'Verdict: Which one should you pick?',
          content: `If you want a severe digital padlock and do not mind a hefty annual price tag, Opal offers brute-force blocking. If you wish to **build lasting digital autonomy**, balance study with fitness, and cultivate real-world habits gently, **BitSpace** is the clear winner.`,
        },
      ],
    },
    references: [
      'Vanden Abeele, M. M. (2021). Digital Wellbeing as a Dynamic Construct. Communication Theory.',
      'Clear, J. (2018). Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones.',
      'Centro de Salud Digital de Stanford (2025). Integrated Harm Framework (IHF).',
    ],
  },
]

// Obtener fecha actual en formato YYYY-MM-DD
export function getTodayDateString() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Catálogo completo de artículos
export const ALL_ARTICLES = [...INITIAL_ARTICLES, ...ARTICLES_FUTUROS]

// Artículos publicados (cuya fecha sea hoy o anterior, ordenados de más reciente a más antiguo)
export const ARTICLES = ALL_ARTICLES
  .filter((a) => a.publishDate <= getTodayDateString())
  .sort((a, b) => b.publishDate.localeCompare(a.publishDate))

// Artículos programados para próximas semanas
export const UPCOMING_ARTICLES = ALL_ARTICLES
  .filter((a) => a.publishDate > getTodayDateString())
  .sort((a, b) => a.publishDate.localeCompare(b.publishDate))

// Funciones de ayuda
export function getArticleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getArticlesByCategory(category) {
  if (!category || category === 'all') return ARTICLES
  return ARTICLES.filter((a) => a.category === category)
}

export function getRelatedArticles(currentSlug, limit = 2) {
  return ARTICLES.filter((a) => a.slug !== currentSlug).slice(0, limit)
}
