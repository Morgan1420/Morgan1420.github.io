import { createI18n } from 'vue-i18n'

const messages = {
  ca: {
    // SEO Meta
    meta_title: 'BitSpace - Salut Digital | Cuida la teva mascota digital',
    meta_description:
      "BitSpace és una aplicació mòbil que t'ajuda a millorar els teus hàbits de salut cuidant una mascota digital. Millora el teu benestar mentre el teu Bit creix feliç.",

    welcome: 'Benvingut a BitSpace',
    what_is_bitspace: 'Què és BitSpace?',
    what_is_bitspace_text:
      "BitSpace és un <b>entorn virtual</b> accessible via aplicació mòbil que es basa a <b>cuidar mascotes digitals</b> (els 'Bits'), de forma similar a jocs com Pou o Tamagotchi. <br><br> El teu bit actuarà com a mirall de la teva salut: la seva felicitat i benestar estan directament lligats als teus hàbits de cura personal en el món real. <br><br> L'objectiu és simple: <b>En cuidar la teva mascota t'estàs cuidant a tu mateix</b>.",
    how_it_works: 'Com funciona?',
    how_it_works_text:
      "Quan et descarregues BitSpace, a part del nom i l'edat, se't demanarà que indiquis <b>quin aspecte de la teva vida vols millorar</b>. <br><br> Podràs triar entre una multitud d'àrees com ara: millorar l'us del telèfon mòbil, fer més esport, millorar els teus hàbits d'estudi o convertir-te en un lector habitual. <br><br> A partir d'aquí, <b>BitSpace et proposarà reptes i activitats diàries</b> relacionades amb l'àrea que has escollit, ajudant-te a establir i mantenir hàbits saludables.",
    what_about_bits: 'I els Bits que fan?',
    what_about_bits_text:
      'Els Bits són les teves mascotes digitals, i <b>la seva felicitat depèn de tu</b>. <br><br> Si compleixes els teus reptes diaris, el teu Bit estarà content, creixerà i et donarà recompenses per personalitzar el seu entorn. <br><br> Però si no compleixes els teus reptes, el teu Bit es posarà trist i malalt, reflectint la importància de cuidar-se a un mateix.',
    what_about_space: "I la part de 'Space' vol dir res?",
    what_about_space_text:
      "Si! Per 'Space' ens referim a l'espai on viurà el teu Bit. Ja que els Bits no viuen en un fons blanc, no, <b>viuran en una casa</b>! <br><br> Aquesta casa serà el teu espai segur, un lloc on podràs relaxar-te i veure el teu progrés. <br><br> Evidentment tant la casa com el bit es podran personalitzar al teu gust, creant mica en mica la teva nova forma de ser.",
    team_title: "L'equip darrere de BitSpace",
    equip_title: "L'Equip de BitSpace",
    member_jan_name: 'Jan Moran Ricardo',
    member_jan_role: 'Co-Founder & Finance Lead',
    member_gerard_name: 'Gerard Garcia Gros',
    member_gerard_role: 'Co-Founder & Tech Lead',
    member_lluna_name: 'Lluna Lara Valle',
    member_lluna_role: 'Co-Founder & Health Expert',
    member_suzana_name: 'Suzana Jeal',
    member_suzana_role: 'AI Specialist',
    collaborate_title: 'Col·labora amb nosaltres!',
    collaborate_text_1:
      'El vostre feedback és important! Així que, si podeu, respongueu a les enquestes. Nosaltres us ho agrairem ;)',
    collaborate_text_2:
      '<b>ENQUESTA GENERAL:</b> <a id="enllaç-enquestes" href="https://forms.gle/y2QSFbbpGMoVtNNK6" target="_blank" rel="noopener noreferrer">https://forms.gle/y2QSFbbpGMoVtNNK6</a>',
    collaborate_text_3:
      "Forma part del canvi i contacta'ns per saber com pots col·laborar a través del nostre correu electrònic: info{'@'}bitspace.es",
    footer_logo_text: 'BitSpace: Digital Health',
    footer_contact_title: 'Contacta amb nosaltres',
    footer_social_title: 'Segueix-nos a',
    waitlist_title: "Uneix-te a la nostra llista d'espera",
    footer_rights: 'Tots els drets reservats',
    waitlist_email_placeholder: 'El teu correu electrònic',
    waitlist_button_submit: 'Unir-me',
    waitlist_button_loading: 'Enviant...',
    waitlist_error_invalid_email: 'Si us plau, introdueix un correu vàlid.',
    waitlist_error_no_response: 'No es va rebre resposta del servidor.',
    waitlist_success_added: "Gràcies! T'hem afegit a la llista d'espera.",
    waitlist_error_exists: "Ja estàs a la llista d'espera.",
    waitlist_error_generic: 'Hi va haver un error en la sol·licitud.',
    carousel_button_surveys: '!! Respongueu a les ENQUESTES !!',
    carousel_button_waitlist: "!! Apunta't a la LLISTA D'ESPERA !!",
    create_your_bit: 'Crea el teu Bit',
    choose_outfit: 'Tria la teva roba',
    choose_hair: 'Tria el teu cabell',
    team_page_title: "L'equip de BitSpace",
    team_history_title: 'La nostra história',
    member_gerard_bio:
      'Futur enginyer de telecomunicacions i informàtica. Ocupat amb MEMEnginys i projectes personals des de que va néixer.',
    member_gerard_desc:
      "La productivitat de'n Gerard depèn proporcionalment de la cobertura del tren.",
    member_jan_bio:
      "Estudiant d'un doble grau en enginyeria, treballant en el sector de l'espai des de 2024 i immers en l'emprenedoria des de 2025.",
    member_jan_desc:
      'En Jan és aquella persona que primer salta per la finestra i desprès crea el paracaigudes.',
    member_lluna_bio:
      "Infermera, artista i futura cardiòloga. Sempre preocupada pels demès, és nota que d'ella origina la idea de BitSpace.",
    member_lluna_desc: 'La Lluna només està addicta a una pantalla, la del Kindle.',
    history_slide_1_title: "Guanyadors de l'iFest !! 🏆",
    history_slide_1_content:
      'El dia 13 de maig de 2024 vam presentar per primer cop BitSpace al públic, en concret a la gran final del concurs iFest, organitzat per la Generalitat de Catalunya.\n\nTot i ser una final complicada, amb molts equips molt potents, el nostre pitch fou prou impactant com per endur-nos el premi a casa.\n\nAquesta fita marca doncs la gènesi de BitSpace.',
    history_slide_2_title: "Curs d'acceleració Lisboa 🇵🇹",
    history_slide_2_content:
      "BitSpace hauria pogut morir amb el concurs, però aquí agraïm molt que el premi d'aquest fos una setmana d'acceleració en un entorn tan creatiu i innovador com ho és Lisboa, Portugal.\n\nDurant el transcurs d'aquesta setmana vam aprendre de forma intensiva les bases de l'emprenedoria, per via de classes, mentories personalitzades o \"sessions de networking\" en vaixell per la desembocadura del Tejo.\n\nAquest viatge ens va donar les eines per seguir endavant amb BitSpace.",
    history_slide_3_title: 'Aparicions en mitjans 📻',
    history_slide_3_content:
      'Tornats de Lisboa i amb moltes idees vam començar a validar i desenvolupar BitSpace.\n\nLes nostres accions i fites no van passar desapercebudes i diferents mitjans de comunicació com ara la Ràdio de Sant Vicenç dels Horts, el butlletí de la Generalitat o les xarxes de comunicació de la UAB ens van fer difusió.\n\nBitSpace començà a agafar forma, però encara queda molta feina per fer.',
    history_slide_4_title: 'IA Accelerate 🚀',
    history_slide_4_content:
      "Per mitjà d'aquesta divulgació vam aconseguir entrar al curs d'acceleració IA Accelerate.\n\nA aquest curs vàrem ampliar la base de coneixements adquirida a Lisboa i vam donar cos i pell al projecte, entre altres coses vam perfeccionar el pitch, crear un model de negoci sostenible i idear un pla de futur realista.\n\nA més, en aquest curs hem conegut i connectat amb moltes persones com nosaltres, principiants en el món de l'emprenedoria i  amb un munt de ganes de millorar el món.",
    history_slide_5_title: 'MWC Barcelona📱',
    history_slide_5_content:
      "L'IAAccelerate culmina doncs al MWC Barcelona 2025, on en Gerard realitzà un pitch davant d'un gran nombre d'inversors i empresaris que ens poden ajudar a impulsar el projecte.\n\nA més, com a membres de Emprèn UAB i de la xarxa RDI-IA, se'ns van proporcionar diversos stands on poder presentar el nostre projecte durant un parell de dies.\n\nTot i això, no ens vàrem quedar quiets i vam buscar sinergies per tot el congrés durant tots els dies, va ser un no parar.",
    history_slide_6_title: 'Plans a futur 🌌',
    history_slide_6_content:
      "Avui en dia BitSpace segueix en fase de desenvolupament, amb un possible MVP preparat per llençar el juny, amb una primera versió pel setembre.\n\nSi voleu estar al corrent de l'estat de BitSpace apunteu-vos a la llista d'espera que trobareu en aquesta mateixa pàgina.\n\nI si teniu interès a participar més activament en el projecte estarem encantats d'escoltar la vostra opinió :)",
    // MWC section
    mwc_title: "Visita'ns al MWC Barcelona",
    mwc_day1_title: 'Dimarts 3 - PITCH',
    mwc_day1_desc: 'Vine a escoltar el nostre pitch:',
    mwc_day1_location: 'CATALONIA - Hall 8.1',
    mwc_day1_time: '14:30 - 16:00',

    mwc_day2_title: 'Dimecres 4 - STAND',
    mwc_day2_desc: 'Passa a saludar-nos i a fer networking!',
    mwc_day2_location: 'HALL: 8.0 STAND: 8.0B13.1',
    mwc_day2_time: '14:30 - 16:00',

    mwc_day3_title: 'Dijous 4 - STAND TOT EL DIA',
    mwc_day3_desc: 'Passa a saludar-nos i a fer networking!',
    mwc_day3_location: 'HALL 8.1 STAND 8.1C43.7',
    mwc_day3_time: 'TOT EL DIA !!',
    // Collaborate Page
    collaborate_title: 'Col·labora amb nosaltres!',
    collaborate_opinion_subtitle: "Quina t'agrada més?",
    collaborate_waitlist_description_1:
      "Actualment, BitSpace està en fase de desenvolupament i, per tant, no el trobareu disponible enlloc. Per tal doncs d'estar al corrent tant de l'estat del projecte i ser notificat quan aquest surti al mercat et recomanem que t'uneixis a la llista d'espera!",
    collaborate_waitlist_description_2:
      "A més, totes les persones que estiguin a la llista d'espera per a quan llancem el producte passaran a ser prèmium directament, sense pagar ni un euro!",
    collaborate_contact_title: 'Contacta amb nosaltres',
    collaborate_contact_description:
      'Si tens qualsevol dubte, opinió o si vols anotar una reunió amb nosaltres, pots fer-ho a través del formulari de contacte a continuació:',
    collaborate_opinion_title: 'Comparteix la teva opinió!',
    collaborate_opinion_description:
      'Opinions és el que més valorem a la fase on ens trobem, així que us hem preparat aquest joc i un formulari molt breu que ens ajudarà moltíssim i només requereix de 2 minuts del vostre temps.',
    collaborate_opinion_thanks: 'Gràcies per compartir la teva opinió!',
    collaborate_opinion_question: 'Vols fer més enquestes?',
    collaborate_opinion_link: 'Respon les nostres enquestes',
    // Contact Form
    contact_form_topic_label: 'Tema *',
    contact_form_concept_label: 'Concepte *',
    contact_form_message_label: 'Missatge *',
    contact_form_email_label: 'E-mail (Opcional però recomanat)',
    contact_form_topic_doubt: 'Dubte',
    contact_form_topic_opinion: 'Opinió',
    contact_form_topic_meeting: 'Reunió',
    contact_form_topic_offer: 'Oferta',
    contact_form_topic_other: 'Altra',
    contact_form_submit: 'Enviar Missatge',
    contact_form_sending: 'Enviant...',
    contact_form_validation_error: 'Si us plau, completa tots els camps requerits.',
    contact_form_success: 'Missatge enviat amb èxit! Ens posarem en contacte aviat.',
    contact_form_error:
      'Hi ha hagut un error en enviar el missatge. Si us plau, intenta-ho més tard.',
    contact_form_connection_error:
      'Error de connexió. Si us plau, intenta-ho més tard o envia un correu a info@bitspace.es directament.',
    contact_form_privacy:
      "La teva informació es tractarà de manera confidencial i només s'utilitzarà per respondre a la teva consulta.",
    // Games Page
    games_title: 'Jocs',
    prototype_title: 'Prova el Prototip',
    prototype_access: 'Accés al prototip',
    /* Nav bar labels */
    nav_games: 'Jocs',
    nav_prototype: 'Prototip',
    nav_create_your_bit: 'Crea el teu Bit',
    nav_bid_your_bit: 'Crea el teu Bit?',
    nav_team: 'Equip',
    nav_history: 'Història',
    nav_collaborate: 'Col·labora',
    nav_waiting_list: "Llista d'espera",
    nav_contact_us: 'Contacta',
    nav_change_language: 'Canviar idioma',
    nav_logo_aria: 'Tornar a la pàgina inicial de BitSpace',
    nav_change_to_ca: 'Canviar a Català',
    nav_change_to_en: 'Switch to English',
    nav_change_to_es: 'Cambiar a Español',
    nav_lang_label_ca: 'CAT',
    nav_lang_label_en: 'ENG',
    nav_lang_label_es: 'ESP',
  },
  es: {
    // SEO Meta
    meta_title: 'BitSpace - Salud Digital | Cuida tu mascota digital',
    meta_description:
      'BitSpace es una aplicación móvil que te ayuda a mejorar tus hábitos de salud cuidando una mascota digital. Mejora tu bienestar mientras tu Bit crece feliz.',

    welcome: 'Bienvenido a BitSpace',
    what_is_bitspace: '¿Qué es BitSpace?',
    what_is_bitspace_text:
      "BitSpace es un <b>entorno virtual</b> accesible vía aplicación móvil que se basa en <b>cuidar mascotas digitales</b> (los 'Bits'), de forma similar a juegos como Pou o Tamagotchi. <br><br> Tu bit actuará como un espejo de tu salud: su felicidad y bienestar están directamente ligados a tus hábitos de cuidado personal en el mundo real. <br><br> El objetivo es simple: <b>Al cuidar de tu mascota, te estás cuidando a ti mismo</b>.",
    how_it_works: '¿Cómo funciona?',
    how_it_works_text:
      'Cuando te descargas BitSpace, además del nombre y la edad, se te pedirá que indiques <b>qué aspecto de tu vida quieres mejorar</b>. <br><br> Podrás elegir entre una multitud de áreas como: mejorar el uso del teléfono móvil, hacer más deporte, mejorar tus hábitos de estudio o convertirte en un lector habitual. <br><br> A partir de ahí, <b>BitSpace te propondrá retos y actividades diarias</b> relacionadas con el área que has escogido, ayudándote a establecer y mantener hábitos saludables.',
    what_about_bits: '¿Y los Bits qué hacen?',
    what_about_bits_text:
      'Los Bits son tus mascotas digitales, y <b>su felicidad depende de ti</b>. <br><br> Si cumples tus retos diarios, tu Bit estará contento, crecerá y te dará recompensas para personalizar su entorno. <br><br> Pero si no cumples tus retos, tu Bit se pondrá triste y enfermo, reflejando la importancia de cuidarse a uno mismo.',
    what_about_space: "¿Y la parte de 'Space' significa algo?",
    what_about_space_text:
      "¡Sí! Por 'Space' nos referimos al espacio donde vivirá tu Bit. Porque los Bits no viven en un fondo blanco, no, ¡<b>vivirán en una casa</b>! <br><br> Esta casa será tu espacio seguro, un lugar donde podrás relajarte y ver tu progreso. <br><br> Evidentemente, tanto la casa como el bit se podrán personalizar a tu gusto, creando poco a poco tu nueva forma de ser.",
    team_title: 'El equipo detrás de BitSpace',
    equip_title: 'El Equipo de BitSpace',
    member_jan_name: 'Jan Moran Ricardo',
    member_jan_role: 'Co-Founder & Finance Lead',
    member_gerard_name: 'Gerard Garcia Gros',
    member_gerard_role: 'Co-Founder & Tech Lead',
    member_lluna_name: 'Lluna Lara Valle',
    member_lluna_role: 'Co-Founder & Health Expert',
    member_suzana_name: 'Suzana Jeal',
    member_suzana_role: 'AI specialist',
    collaborate_title: '¡Colabora con nosotros!',
    collaborate_text_1:
      '¡Tu feedback es importante! Si puedes, responde a las encuestas. Te lo agradeceremos ;)',
    collaborate_text_2:
      '<b>ENCUESTA GENERAL:</b> <a id="enllaç-enquestes" href="https://forms.gle/y2QSFbbpGMoVtNNK6" target="_blank" rel="noopener noreferrer">https://forms.gle/y2QSFbbpGMoVtNNK6</a>',
    collaborate_text_3:
      "Forma parte del cambio y contáctanos para saber cómo puedes colaborar a través de nuestro correo electrónico: info{'@'}bitspace.es",
    footer_logo_text: 'BitSpace: Digital Health',
    footer_contact_title: 'Contacta con nosotros',
    footer_social_title: 'Síguenos en',
    footer_rights: 'Todos los derechos reservados',
    waitlist_title: 'Únete a nuestra lista de espera',
    waitlist_email_placeholder: 'Tu correo electrónico',
    waitlist_button_submit: 'Unirme',
    waitlist_button_loading: 'Enviando...',
    waitlist_error_invalid_email: 'Por favor, introduce un correo válido.',
    waitlist_error_no_response: 'No se recibió respuesta del servidor.',
    waitlist_success_added: '¡Gracias! Te hemos añadido a la lista de espera.',
    waitlist_error_exists: 'Ya estás en la lista de espera.',
    waitlist_error_generic: 'Hubo un error en la solicitud.',
    carousel_button_surveys: '!! Responde a las ENCUESTAS !!',
    carousel_button_waitlist: '!! Apúntate a la LISTA DE ESPERA !!',
    create_your_bit: 'Crea tu Bit',
    choose_outfit: 'Elige tu ropa',
    choose_hair: 'Elige tu pelo',
    team_page_title: 'The BitSpace Team',
    team_history_title: 'Nuestra historia',
    member_gerard_bio:
      'Futuro ingeniero de telecomunicaciones e informática. Ocupado con MEMEnginys y proyectos personales desde que nació.',
    member_gerard_desc:
      'La productividad de Gerard depende proporcionalmente de la cobertura del tren.',
    member_jan_bio:
      'Estudiante de un doble grado en ingeniería, trabajando en el sector espacial desde 2024 e inmerso en el emprendimiento desde 2025.',
    member_jan_desc:
      'Jan es esa persona que primero salta por la ventana y después crea el paracaídas.',
    member_lluna_bio:
      'Enfermera, artista y futura cardióloga. Siempre preocupada por los demás, se nota que de ella origina la idea de BitSpace.',
    member_lluna_desc: 'Lluna solo está adicta a una pantalla, la del Kindle.',
    history_slide_1_title: '¡¡Ganadores del iFest !! 🏆',
    history_slide_1_content:
      'El día 13 de mayo de 2024 presentamos por primera vez BitSpace al público, concretamente en la gran final del concurso iFest, organizado por la Generalitat de Catalunya.\n\nA pesar de ser una final complicada, con muchos equipos muy potentes, nuestro pitch fue lo suficientemente impactante como para llevarnos el premio a casa.\n\nEste hito marca por lo tanto la génesis de BitSpace.',
    history_slide_2_title: 'Curso de aceleración Lisboa 🇵🇹',
    history_slide_2_content:
      'BitSpace habría podido morir con el concurso, pero aquí agradecemos mucho que el premio de este fuera una semana de aceleración en un entorno tan creativo e innovador como lo es Lisboa, Portugal.\n\nDurante el transcurso de esa semana aprendimos de forma intensiva los fundamentos del emprendimiento, a través de clases, mentorías personalizadas o "sesiones de networking" en barco por el estuario del Tejo.\n\nEste viaje nos dio las herramientas para seguir adelante con BitSpace.',
    history_slide_3_title: 'Apariciones en medios 📻',
    history_slide_3_content:
      'De vuelta de Lisboa con muchas ideas comenzamos a validar y desarrollar BitSpace.\n\nNuestras acciones e hitos no pasaron desapercibidos y diferentes medios de comunicación como la Radio de Sant Vicenç dels Horts, el boletín de la Generalitat o las redes de comunicación de la UAB nos hicieron difusión.\n\nBitSpace comenzó a tomar forma, pero aún queda mucho trabajo por hacer.',
    history_slide_4_title: 'IA Accelerate 🚀',
    history_slide_4_content:
      'Por medio de esta divulgación conseguimos entrar al curso de aceleración IA Accelerate.\n\nEn este curso ampliamos la base de conocimientos adquirida en Lisboa y dimos cuerpo y forma al proyecto, entre otras cosas perfeccionamos el pitch, creamos un modelo de negocio sostenible y diseñamos un plan de futuro realista.\n\nAdemás, en este curso conocimos y conectamos con muchas personas como nosotros, principiantes en el mundo del emprendimiento y con ganas de mejorar el mundo.',
    history_slide_5_title: 'MWC Barcelona📱',
    history_slide_5_content:
      'IA Accelerate culmina en el MWC Barcelona 2025, donde Gerard realizó un pitch ante un gran número de inversores y empresarios que pueden ayudarnos a impulsar el proyecto.\n\nAdemás, como miembros de Emprèn UAB y de la red RDI-IA, se nos proporcionaron varios stands donde poder presentar nuestro proyecto durante un par de días.\n\nPero no nos quedamos quietos y buscamos sinergias por todo el congreso durante todos los días, fue un no parar.',
    history_slide_6_title: 'Planes a futuro 🌌',
    history_slide_6_content:
      'Hoy en día BitSpace sigue en fase de desarrollo, con un posible MVP listo para lanzar en junio, con una primera versión en septiembre.\n\nSi queréis estar al corriente del estado de BitSpace apuntaos a la lista de espera que encontraréis en esta misma página.\n\nY si tenéis interés en participar más activamente en el proyecto estaremos encantados de escuchar vuestra opinión :)',
    // MWC section
    mwc_title: 'Visítanos en el MWC Barcelona',
    mwc_day1_title: 'Martes 3 - PITCH',
    mwc_day1_desc: 'Ven a escuchar nuestro pitch:',
    mwc_day1_location: 'CATALONIA - Hall 8.1',
    mwc_day1_time: '14:30 - 16:00',

    mwc_day2_title: 'Miércoles 4 - STAND',
    mwc_day2_desc: '¡Pasa a saludarnos y hacer networking!',
    mwc_day2_location: 'HALL: 8.0 STAND: 8.0B13.1',
    mwc_day2_time: '14:30 - 16:00',

    mwc_day3_title: 'Jueves 4 - STAND TODO EL DÍA',
    mwc_day3_desc: '¡Pasa a saludarnos y hacer networking!',
    mwc_day3_location: 'HALL 8.1 STAND 8.1C43.7',
    mwc_day3_time: '¡TODO EL DÍA!!',
    // Collaborate Page
    collaborate_title: '¡Colabora con nosotros!',
    collaborate_opinion_subtitle: '¿Cuál te gusta más?',
    collaborate_waitlist_description_1:
      'Actualmente, BitSpace está en fase de desarrollo y, por lo tanto, no lo encontrarás disponible en ningún lugar. Para poder estar al tanto del estado del proyecto y ser notificado cuando este salga al mercado te recomendamos que te unas a la lista de espera.',
    collaborate_waitlist_description_2:
      'Además, todas las personas que estén en la lista de espera cuando lancemos el producto pasarán a ser premium directamente, ¡sin pagar ni un euro!',
    collaborate_contact_title: 'Contáctanos',
    collaborate_contact_description:
      'Si tienes alguna duda, opinión o si quieres agendar una reunión con nosotros, puedes hacerlo a través del formulario de contacto a continuación:',
    collaborate_opinion_title: '¡Comparte tu opinión!',
    collaborate_opinion_description:
      'Las opiniones son lo que más valoramos en la fase en la que nos encontramos, así que te hemos preparado este juego y un formulario muy breve que nos ayudará muchísimo y solo requiere 2 minutos de tu tiempo.',
    collaborate_opinion_thanks: '¡Gracias por compartir tu opinión!',
    collaborate_opinion_question: '¿Quieres hacer más encuestas?',
    collaborate_opinion_link: 'Responde nuestras encuestas',
    // Contact Form
    contact_form_topic_label: 'Tema *',
    contact_form_concept_label: 'Concepto *',
    contact_form_message_label: 'Mensaje *',
    contact_form_email_label: 'E-mail (Opcional pero recomendado)',
    contact_form_topic_doubt: 'Duda',
    contact_form_topic_opinion: 'Opinión',
    contact_form_topic_meeting: 'Reunión',
    contact_form_topic_offer: 'Oferta',
    contact_form_topic_other: 'Otra cosa',
    contact_form_submit: 'Enviar Mensaje',
    contact_form_sending: 'Enviando...',
    contact_form_validation_error: 'Por favor, completa todos los campos requeridos.',
    contact_form_success: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.',
    contact_form_error: 'Ha habido un error al enviar el mensaje. Por favor, inténtalo más tarde.',
    contact_form_connection_error:
      'Error de conexión. Por favor, inténtalo más tarde o envía un correo a info@bitspace.es directamente.',
    contact_form_privacy:
      'Tu información será tratada de manera confidencial y solo se utilizará para responder tu consulta.',
    // Games Page
    games_title: 'Juegos',
    prototype_title: 'Prueba el Prototipo',
    prototype_access: 'Acceso al prototipo',
    /* Nav bar labels */
    nav_games: 'Juegos',
    nav_prototype: 'Prototipo',
    nav_create_your_bit: 'Crea tu Bit',
    nav_bid_your_bit: '¿Crea tu Bit?',
    nav_team: 'Equipo',
    nav_history: 'Historia',
    nav_collaborate: 'Colabora',
    nav_waiting_list: 'Lista de espera',
    nav_contact_us: 'Contacta',
    nav_change_language: 'Cambiar idioma',
    nav_logo_aria: 'Volver a la página principal de BitSpace',
    nav_change_to_ca: 'Cambiar a Català',
    nav_change_to_en: 'Switch to English',
    nav_change_to_es: 'Cambiar a Español',
    nav_lang_label_ca: 'CAT',
    nav_lang_label_en: 'ENG',
    nav_lang_label_es: 'ESP',
  },
  en: {
    // SEO Meta
    meta_title: 'BitSpace - Digital Health | Take care of your digital pet',
    meta_description:
      'BitSpace is a mobile app that helps you improve your health habits by caring for a digital pet. Improve your wellbeing while your Bit grows happily.',

    welcome: 'Welcome to BitSpace',
    what_is_bitspace: 'What is BitSpace?',
    what_is_bitspace_text:
      "BitSpace is a <b>virtual environment</b> accessible via mobile app focused on <b>caring for digital pets</b> (the 'Bits'), similar to games like Pou or Tamagotchi. <br><br> Your bit acts as a mirror of your wellbeing: its happiness and health are directly tied to your real-life self-care habits. <br><br> The goal is simple: <b>By caring for your pet, you are taking care of yourself</b>.",
    how_it_works: 'How it works',
    how_it_works_text:
      "When you download BitSpace, besides your name and age, you'll be asked which area of your life you want to improve. <br><br> You can choose from areas like: better phone usage, exercising more, improving study habits or becoming a regular reader. <br><br> From there, <b>BitSpace will suggest daily challenges and activities</b> related to the area you picked, helping you create and maintain healthy habits.",
    what_about_bits: 'What do the Bits do?',
    what_about_bits_text:
      "Bits are your digital pets, and <b>their happiness depends on you</b>. <br><br> When you complete your daily challenges, your Bit will be happier, grow, and reward you with items to personalize its environment. <br><br> But if you don't complete challenges, your Bit will become sad and ill, reflecting the importance of self-care.",
    what_about_space: "What does the 'Space' part mean?",
    what_about_space_text:
      "The 'Space' is the place where your Bit lives. Bits won't live on a blank background — they will live in a home! <br><br> This home is your safe space where you can relax and watch your progress. <br><br> Both the house and the bit can be customized to your taste, shaping your new little world.",
    team_title: 'The team behind BitSpace',
    equip_title: 'The BitSpace Team',
    member_jan_name: 'Jan Moran Ricardo',
    member_jan_role: 'Co-Founder & Finance Lead',
    member_gerard_name: 'Gerard Garcia Gros',
    member_gerard_role: 'Co-Founder & Tech Lead',
    member_lluna_name: 'Lluna Lara Valle',
    member_lluna_role: 'Co-Founder & Health Expert',
    member_suzana_name: 'Suzana Jeal',
    member_suzana_role: 'AI specialist',
    collaborate_title: 'Collaborate with us!',
    collaborate_text_1:
      'Your feedback is important! If you can, please answer the surveys. We appreciate it ;)',
    collaborate_text_2:
      '<b>GENERAL SURVEY:</b> <a id="enllaç-enquestes" href="https://forms.gle/y2QSFbbpGMoVtNNK6" target="_blank" rel="noopener noreferrer">https://forms.gle/y2QSFbbpGMoVtNNK6</a>',
    collaborate_text_3:
      "Be part of the change and contact us to learn how to collaborate via email: info{'@'}bitspace.es",
    footer_logo_text: 'BitSpace: Digital Health',
    footer_contact_title: 'Contact us',
    footer_social_title: 'Follow us on',
    footer_rights: 'All rights reserved',
    waitlist_title: 'Join our waitlist',
    waitlist_email_placeholder: 'Your email',
    waitlist_button_submit: 'Join',
    waitlist_button_loading: 'Sending...',
    waitlist_error_invalid_email: 'Please enter a valid email.',
    waitlist_error_no_response: 'No response from server.',
    waitlist_success_added: 'Thanks! You were added to the waitlist.',
    waitlist_error_exists: 'You are already on the waitlist.',
    waitlist_error_generic: 'There was an error with the request.',
    carousel_button_surveys: '!! Answer the SURVEYS !!',
    carousel_button_waitlist: '!! Join the WAITLIST !!',
    create_your_bit: 'Create your Bit',
    choose_outfit: 'Choose your outfit',
    choose_hair: 'Choose your hair',
    team_page_title: 'The BitSpace Team',
    team_history_title: 'Our History',
    member_gerard_bio:
      'Future engineer of telecommunications and computer science. Busy with MEMEnginys and personal projects since birth.',
    member_gerard_desc: "Gerard's productivity depends proportionally on train coverage.",
    member_jan_bio:
      'Student of a double degree in engineering, working in the space sector since 2024 and immersed in entrepreneurship since 2025.',
    member_jan_desc:
      'Jan is that person who first jumps out the window and then creates the parachute.',
    member_lluna_bio:
      'Nurse, artist and future cardiologist. Always concerned about others, it shows that the idea of BitSpace originates from her.',
    member_lluna_desc: "Lluna is only addicted to one screen, the Kindle's.",
    history_slide_1_title: 'iFest Winners !! 🏆',
    history_slide_1_content:
      'On May 13, 2024, we presented BitSpace to the public for the first time, specifically in the grand final of the iFest competition, organized by the Generalitat de Catalunya.\n\nDespite being a complicated final, with many very strong teams, our pitch was impactful enough to take home the prize.\n\nThis milestone therefore marks the genesis of BitSpace.',
    history_slide_2_title: 'Lisbon Acceleration Course 🇵🇹',
    history_slide_2_content:
      'BitSpace could have died with the competition, but we greatly appreciate that the prize was a week of acceleration in such a creative and innovative environment as Lisbon, Portugal.\n\nDuring the course of that week we learned intensively the basics of entrepreneurship through classes, personalized mentoring or "networking sessions" on a boat on the Tagus estuary.\n\nThis trip gave us the tools to move forward with BitSpace.',
    history_slide_3_title: 'Media Appearances 📻',
    history_slide_3_content:
      'Back from Lisbon with many ideas we began to validate and develop BitSpace.\n\nOur actions and milestones did not go unnoticed and various media outlets such as Sant Vicenç dels Horts Radio, the Generalitat bulletin or the UAB communication networks gave us coverage.\n\nBitSpace began to take shape, but there is still much work to be done.',
    history_slide_4_title: 'IA Accelerate 🚀',
    history_slide_4_content:
      'Through this coverage we managed to enter the IA Accelerate acceleration course.\n\nIn this course we expanded the knowledge base acquired in Lisbon and gave shape to the project, among other things we perfected the pitch, created a sustainable business model and designed a realistic future plan.\n\nMoreover, in this course we met and connected with many people like us, beginners in the world of entrepreneurship and eager to improve the world.',
    history_slide_5_title: 'MWC Barcelona📱',
    history_slide_5_content:
      "IA Accelerate culminates at MWC Barcelona 2025, where Gerard gave a pitch before a large number of investors and entrepreneurs who can help us drive the project forward.\n\nAlso, as members of Emprèn UAB and the RDI-IA network, we were provided with several stands where we could present our project for a couple of days.\n\nBut we didn't stay still and we looked for synergies throughout the congress during all the days, it was non-stop.",
    history_slide_6_title: 'Future Plans 🌌',
    history_slide_6_content:
      "Today BitSpace is still in development phase, with a possible MVP ready to launch in June, with a first version in September.\n\nIf you want to stay up to date on BitSpace's status, sign up for the waitlist that you will find on this page.\n\nAnd if you are interested in participating more actively in the project we will be delighted to hear your opinion :)",
    // MWC section
    mwc_title: 'Visit us at MWC Barcelona',
    mwc_day1_title: 'Tuesday 3 - PITCH',
    mwc_day1_desc: 'Come listen to our pitch:',
    mwc_day1_location: 'CATALONIA - Hall 8.1',
    mwc_day1_time: '14:30 - 16:00',

    mwc_day2_title: 'Wednesday 4 - STAND',
    mwc_day2_desc: 'Stop by to say hi and network!',
    mwc_day2_location: 'HALL: 8.0 STAND: 8.0B13.1',
    mwc_day2_time: '14:30 - 16:00',

    mwc_day3_title: 'Thursday 4 - STAND ALL DAY',
    mwc_day3_desc: 'Stop by to say hi and network!',
    mwc_day3_location: 'HALL 8.1 STAND 8.1C43.7',
    mwc_day3_time: 'ALL DAY!!',
    // Collaborate Page
    collaborate_waitlist_description_1:
      "Currently, BitSpace is in development phase and therefore you won't find it available anywhere. To stay informed about the project status and be notified when it launches, we recommend you join the waitlist!",
    collaborate_waitlist_description_2:
      'Also, everyone on the waitlist when we launch will automatically become premium members, no charge at all!',
    collaborate_contact_title: 'Contact Us',
    collaborate_opinion_subtitle: 'Which one do you prefer?',
    collaborate_contact_description:
      'If you have any questions, feedback, or want to schedule a meeting with us, you can do so through the contact form below:',
    collaborate_opinion_title: 'Share Your Opinion!',
    collaborate_opinion_description:
      "Your feedback is what we value most at this stage, so we've prepared this game and a quick survey that will help us tremendously and only takes 2 minutes of your time.",
    collaborate_opinion_thanks: 'Thanks for sharing your opinion!',
    collaborate_opinion_question: 'Want to take more surveys?',
    collaborate_opinion_link: 'Answer our surveys',
    // Contact Form
    contact_form_topic_label: 'Topic *',
    contact_form_concept_label: 'Concept *',
    contact_form_message_label: 'Message *',
    contact_form_email_label: 'E-mail (Optional but recommended)',
    contact_form_topic_doubt: 'Question',
    contact_form_topic_opinion: 'Opinion',
    contact_form_topic_meeting: 'Meeting',
    contact_form_topic_offer: 'Offer',
    contact_form_topic_other: 'Other',
    contact_form_submit: 'Send Message',
    contact_form_sending: 'Sending...',
    contact_form_validation_error: 'Please fill in all required fields.',
    contact_form_success: "Message sent successfully! We'll get back to you soon.",
    contact_form_error: 'There was an error sending your message. Please try again later.',
    contact_form_connection_error:
      'Connection error. Please try again later or email info@bitspace.es directly.',
    contact_form_privacy:
      'Your information will be treated confidentially and only used to respond to your inquiry.',
    // Games Page
    games_title: 'Games',
    prototype_title: 'Try the Prototype',
    prototype_access: 'Open prototype',
    /* Nav bar labels */
    nav_games: 'Games',
    nav_prototype: 'Prototype',
    nav_create_your_bit: 'Create your Bit',
    nav_bid_your_bit: 'Build your Bit?',
    nav_team: 'Team',
    nav_history: 'History',
    nav_collaborate: 'Collaborate',
    nav_waiting_list: 'Waiting list',
    nav_contact_us: 'Contact us',
    nav_change_language: 'Change language',
    nav_logo_aria: 'Return to the BitSpace homepage',
    nav_change_to_ca: 'Canviar a Català',
    nav_change_to_en: 'Switch to English',
    nav_change_to_es: 'Cambiar a Español',
    nav_lang_label_ca: 'CAT',
    nav_lang_label_en: 'ENG',
    nav_lang_label_es: 'ESP',
  },
}

const i18n = createI18n({
  locale: 'ca',
  fallbackLocale: 'ca',
  messages,
  legacy: false,
  warnHtmlMessage: false,
})

export default i18n
