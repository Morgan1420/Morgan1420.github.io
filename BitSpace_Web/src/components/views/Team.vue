<template>
    <div class="games-container">
        <div class="Team-header" ref="headerWrapper">
            <img class="Team-header-bit" id="team" src="@/assets/images/web_images/radioSVH.jpeg" alt="Bit_Team" />
            <h1 class="team-title">The BitSpace Team</h1>
        </div>

        <NavBar :is-over-carousel="isOverCarousel"></NavBar>

        <div class="member">
            <div class="member-image">
                <div class="imatge-with-bit">
                    <img class="imatge" src="@/assets/images/Equip/Gerard.png" alt="Gerard Garcia Gros" />
                    <img class="imatge_bit_right" src="@/assets/images/Bits_Background/Gerard_Bit_sin_fondo.png"
                        alt="Bit_Gerard" />
                </div>
            </div>
            <div class="member-text-fields">
                <div class="member-quick-facts">
                    <div class="member-name">Gerard Garcia Gros</div>
                    <div class="member-role">Co-Founder & Tech Lead</div>

                    <div class="member-social-links">
                        <a href="https://www.linkedin.com/in/gerard-garcia-gros/" target="_blank"
                            aria-label="LinkedIn de Gerard Garcia Gros">
                            <img src="@/assets/images/Web_icons/linkedin-reverse.png" alt="LinkedIn Icon"
                                class="social-icon">
                        </a>
                        <a href="https://github.com/GeriiGarcia" target="_blank"
                            aria-label="GitHub de Gerard Garcia Gros">
                            <img src="@/assets/images/Web_icons/github_icon.png" alt="GitHub Icon" class="social-icon">
                        </a>
                    </div>
                </div>
                <div class="member-studies"><b>Bio:</b> Futur enginyer de telecomunicacions i informàtica. Ocupat amb
                    MEMEnginys i projectes personals des de que va néixer. </div>
                <div class="member-description"><b>Forma de ser:</b> La productivitat de'n Gerard depèn proporcionalment
                    de la cobertura del tren.</div>
            </div>
        </div>

        <div class="member">
            <div class="member-image">
                <div class="imatge-with-bit">
                    <img class="imatge" src="@/assets/images/Equip/Jan.png" alt="Jan Moran Ricardo" />
                    <img class="imatge_bit_right" src="@/assets/images/Bits_Background/Bit_jan_llegint.png"
                        alt="Bit_Jan" />
                </div>
            </div>
            <div class="member-text-fields">
                <div class="member-quick-facts">
                    <div class="member-name">Jan Moran Ricardo</div>
                    <div class="member-role">Co-Founder & Finance Lead</div>

                    <div class="member-social-links">
                        <a href="https://www.linkedin.com/in/jan-moran/" target="_blank"
                            aria-label="LinkedIn de Jan Moran Ricardo">
                            <img src="@/assets/images/Web_icons/linkeding_icon.png" alt="LinkedIn Icon"
                                class="social-icon">
                        </a>
                        <a href="https://github.com/Morgan1420" target="_blank"
                            aria-label="GitHub de Jan Moran Ricardo">
                            <img src="@/assets/images/Web_icons/github_icon.png" alt="GitHub Icon" class="social-icon">
                        </a>
                    </div>
                </div>
                <div class="member-studies"><b>Bio:</b> Estudiant d'un doble grau en enginyeria, treballant en el sector
                    de l'espai des de 2024 i immers en l'emprenedoria des de 2025.</div>
                <div class="member-description"><b>Forma de ser:</b> En Jan és aquella persona que primer salta per la
                    finestra i desprès crea el paracaigudes.
                </div>
            </div>
        </div>

        <div class="member">
            <div class="member-image">
                <div class="imatge-with-bit">
                    <img class="imatge" src="@/assets/images/Equip/anulL.png" alt="Lluna Lara Valle" />
                    <img class="imatge_bit_right" src="@/assets/images/Bits_Background/Lluna_Bit_sin_fondo.png"
                        alt="Bit_Lluna" />
                </div>
            </div>
            <div class="member-text-fields">
                <div class="member-quick-facts">
                    <div class="member-name">Lluna Lara Valle</div>
                    <div class="member-role">Co-Founder & Health Lead</div>

                    <div class="member-social-links">
                        <a href="https://www.linkedin.com/in/lluna-lara-valle-4487a7259/" target="_blank"
                            aria-label="LinkedIn de Lluna Lara Valle">
                            <img src="@/assets/images/Web_icons/linkeding_icon.png" alt="LinkedIn Icon"
                                class="social-icon">
                        </a>
                    </div>
                </div>
                <div class="member-studies"><b>Bio:</b> Infermera, artista i futura cardiòloga. Sempre preocupada pels
                    demès, és
                    nota que d'ella origina la idea de BitSpace.</div>
                <div class="member-description"><b>Forma de ser:</b> La Lluna només està addicta a una pantalla, la del
                    Kindle.</div>
            </div>
        </div>


        <div class="Team-header" id="history" ref="headerWrapper">
            <img class="Team-header-bit" src="@/assets/images/web_images/premi_ifest.jpeg" alt="Bit_Jan" />
            <h1 class="team-title">La nostra història</h1>
        </div>

        <div class="slides-container">
            <button class="slide-arrow slide-arrow-left" @click="previousSlide" aria-label="Previous slide">
                ←
            </button>
            <div class="slides">
                <div class="slide" v-for="(slide, index) in slides" :key="index" v-show="index === currentSlide">
                    <div class="slide_image"><img :src="slide.image" alt="Slide Image" /></div>
                    <div class="slide_text">
                        <div class="slide_content_title">{{ slide.title }}</div>
                        <div class="slide_content_text">{{ slide.content }}</div>
                    </div>
                </div>
            </div>
            <button class="slide-arrow slide-arrow-right" @click="nextSlide" aria-label="Next slide">
                →
            </button>
        </div>

        <div class="slides-indicators">
            <button v-for="(slide, index) in slides" :key="index" class="indicator-dot"
                :class="{ active: index === currentSlide }" @click="currentSlide = index"
                :aria-label="`Go to slide ${index + 1}`"></button>
        </div>


    </div>
    <Footer></Footer>
</template>

<script>
import InfoSectionLeft from '../medium_components/InfoSectionLeft.vue';
import NavBar from '../medium_components/navBar.vue';
import Footer from '../medium_components/Footer.vue';

// Imatges
import image_ifest from '@/assets/images/web_images/premi_ifest.jpeg';
import image_lisboa from '@/assets/images/web_images/lisboa3.jpeg';
import image_radioSVH from '@/assets/images/web_images/radioSVH.jpeg';
import image_iaacerelate from '@/assets/images/web_images/iaacelerate1.jpeg';
export default {
    name: 'TeamView',
    components: {
        NavBar,
        InfoSectionLeft,
        Footer
    },
    data() {
        return {
            isOverCarousel: true,
            headerObserver: null,
            scrollY: 0,
            currentSlide: 0,
            slides: [
                {
                    image: image_ifest,
                    title: 'Guanyadors de l\'iFest !! 🏆',

                    content: 'El dia 13 de maig de 2024 vam presentar per primer cop BitSpace al públic, en concret a la gran final del concurs iFest, organitzat per la Generalitat de Catalunya.\n\nTot i ser una final complicada, amb molts equips molt potents, el nostre pitch fou prou impactant com per endur-nos el premi a casa.\n\nAquesta fita marca doncs la gènesi de BitSpace.'
                },
                {
                    image: image_lisboa,
                    title: 'Curs d\'acceleració Lisboa 🇵🇹',
                    content: 'BitSpace hauria pogut morir amb el concurs, però aquí agraïm molt que el premi d\'aquest fos una setmana d\'acceleració en un entorn tan creatiu i innovador com ho és Lisboa, Portugal.\n\nDurant el transcurs d\'aquesta setmana vam aprendre de forma intensiva les bases de l\'emprenedoria, per via de classes, mentories personalitzades o "sessions de networking" en vaixell per la desembocadura del Tejo.\n\nAquest viatge ens va donar les eines per seguir endavant amb BitSpace.'
                },
                {
                    image: image_radioSVH,
                    title: 'Aparicions en mitjans 📻',
                    content: 'Tornats de Lisboa i amb moltes idees vam començar a validar i desenvolupar BitSpace.\n\nLes nostres accions i fites no van passar desapercebudes i diferents mitjans de comunicació com ara la Ràdio de Sant Vicenç dels Horts, el butlletí de la Generalitat o les xarxes de comunicació de la UAB ens van fer difusió.\n\nBitSpace començà a agafar forma, però encara queda molta feina per fer.'
                },
                {
                    image: image_iaacerelate,
                    title: 'IA Accelerate 🚀',
                    content: 'Per mitjà d\'aquesta divulgació vam aconseguir entrar al curs d\'acceleració IA Accelerate.\n\nA aquest curs vàrem ampliar la base de coneixements adquirida a Lisboa i vam donar cos i pell al projecte, entre altres coses vam perfeccionar el pitch, crear un model de negoci sostenible i idear un pla de futur realista.\n\nA més, en aquest curs hem conegut i connectat amb moltes persones com nosaltres, principiants en el món de l\'emprenedoria i  amb un munt de ganes de millorar el món.'
                },
                {
                    image: image_radioSVH,
                    title: 'MWC Barcelona📱',
                    content: 'L\'IAAccelerate culmina doncs al MWC Barcelona 2025, on en Gerard realitzà un pitch davant d\'un gran nombre d\'inversors i empresaris que ens poden ajudar a impulsar el projecte.\n\nA més, com a membres de Emprèn UAB i de la xarxa RDI-IA, se\'ns van proporcionar diversos stands on poder presentar el nostre projecte durant un parell de dies.\n\nTot i això, no ens vàrem quedar quiets i vam buscar sinergies per tot el congrés durant tots els dies, va ser un no parar.'
                },
                {
                    image: image_radioSVH,
                    title: 'Plans a futur 🌌',
                    content: 'Avui en dia BitSpace segueix en fase de desenvolupament, amb un possible MVP preparat per llençar el juny, amb una primera versió pel setembre.\n\nSi voleu estar al corrent de l\'estat de BitSpace apunteu-vos a la llista d\'espera que trobareu en aquesta mateixa pàgina.\n\nI si teniu interès a participar més activament en el projecte estarem encantats d\'escoltar la vostra opinió :)'
                }
            ]
        };
    },
    methods: {
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        },
        previousSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        },
        handleScroll() {
            this.scrollY = window.scrollY;
            const firstHeaderImg = document.querySelector('.Team-header-bit');
            if (firstHeaderImg) {
                // Move at 50% of scroll speed (parallax effect) - only for the first header
                firstHeaderImg.style.transform = `translateY(${this.scrollY * 0.5}px)`;
            }
        }
    },
    mounted() {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            return;
        }

        this.headerObserver = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                this.isOverCarousel = !entry.isIntersecting;
            },
            {
                root: null,
                threshold: 0.1
            }
        );

        if (this.$refs.headerWrapper) {
            this.headerObserver.observe(this.$refs.headerWrapper);
        }

        // Add scroll listener for parallax effect
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        // Remove scroll listener
        window.removeEventListener('scroll', this.handleScroll);

        if (this.headerObserver && this.$refs.headerWrapper) {
            this.headerObserver.unobserve(this.$refs.headerWrapper);
        }
        if (this.headerObserver) {
            this.headerObserver.disconnect();
            this.headerObserver = null;
        }
    }
}
</script>

<style scoped>
.games-container {
    background-color: #FFE4DD;
    padding-bottom: 5vh;
}

h1,
#team,
#history {
    color: #333333;
}


.Team-header {
    position: relative;
    width: 100vw;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.Team-header-bit {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
    will-change: transform;
}

.team-title {
    padding-top: 10vh;
    position: relative;
    color: #ffffff;
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 800;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
}


/* MEMBER STYLE */
.member {
    width: 90%;
    padding-inline: 5%;
    padding-block: 5vh;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 20px;

    border-radius: 8px;
    color: #333333;
}


.imatge-with-bit {
    width: 15%;
    display: flex;
    flex-direction: column;
}

.imatge {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.imatge_bit_right {
    width: 125px;
    height: 125px;
    margin-top: -100px;
    margin-left: 100px;
}

.imatge_bit_left {
    width: 125px;
    height: auto;
    margin-top: -100px;
    margin-right: -100px;
}

.member-text-fields {
    width: 80%;
    padding-block: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.member-quick-facts {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: end;
    gap: 20px;
}

.member-name {
    height: 2.6rem;
    font-size: 2.3rem;
    font-weight: 600;
    text-align: center;
}

.member-role {
    height: 2.3rem;
    font-size: 2rem;
    font-weight: 400;
    color: #5c5c5c;
    font-style: italic;
}

.member-social-links {
    padding: 0;
    display: flex;
    flex-direction: row;
    gap: 15px;
}

.member-social-links a {
    margin-top: 5px;
    width: 40px;
    height: 40px;
    text-decoration: none;
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
    background: transparent !important;
    display: flex;
    align-items: center;
    justify-content: center;
}

.member-social-links a:focus,
.member-social-links a:focus-visible,
.member-social-links a:hover,
.member-social-links a:active {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
    background: transparent !important;
}

.member-social-links img {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
}

.member-social-links img:focus,
.member-social-links img:focus-visible,
.member-social-links img:hover,
.member-social-links img:active {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
}

.member-social-links a img {
    margin-top: 5px;
    width: 40px;
    height: 40px;
}

.member-studies {
    margin-top: 10px;
    font-size: 1.4rem;
    color: #333333;
}

.member-description {
    font-size: 1.4rem;
    color: #333333;
}

/* SLIDES CAROUSEL */
.slides-container {
    position: relative;
    width: 90%;

    margin-inline: 5vh;
    margin-top: 5vh;
    padding: 5vh 3%;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    background-color: #FFD8CF;

    border-radius: 12px;
}

.slides {
    position: relative;

    min-height: 400px;
    padding-inline: 4%;

    flex: 1;
    display: flex;
}

.slide {
    width: 100%;

    display: flex;
    flex-direction: row;
    gap: 6%;

    align-items: center;
    animation: fadeIn 0.5s ease-in-out;
}

.slide_image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.slide_text {
    height: 300px;
    object-fit: cover;

    display: flex;
    flex-direction: column;
    gap: 15px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.slide_image {
    width: 40%;
    min-width: 200px;
    height: 300px;
    background-color: #e0e0e0;
    border-radius: 8px;
    flex-shrink: 0;
}

.slide_text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.slide_content_title {
    font-size: 2rem;
    font-weight: 700;
    color: #333333;
}

.slide_content_text {
    font-size: 1.1rem;
    color: #555555;
    line-height: 1.6;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.slide-arrow {
    background: none;
    border: none;
    font-size: 3rem;
    color: #333333;
    cursor: pointer;
    padding: 10px 20px;
    transition: color 0.3s ease;
    outline: none !important;
    box-shadow: none !important;
}

.slide-arrow:hover {
    color: #666666;
}

.slide-arrow:focus,
.slide-arrow:focus-visible {
    outline: none !important;
    box-shadow: none !important;
}

.slide-arrow-left {
    order: -1;
}

.slide-arrow-right {
    order: 1;
}

/* SLIDES INDICATORS */
.slides-indicators {
    display: flex;
    justify-content: center;
    gap: 12px;
    padding: 20px 0;
}

.indicator-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #333333;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    outline: none !important;
    box-shadow: none !important;
}

.indicator-dot:hover {
    background-color: #ccc;
}

.indicator-dot.active {
    background-color: #333333;
    box-shadow: none !important;
}

.indicator-dot:focus,
.indicator-dot:focus-visible {
    outline: none !important;
    box-shadow: none !important;
}
</style>