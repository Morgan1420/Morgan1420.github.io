<template>
    <div class="games-container">
        <div class="collaborate-header" ref="headerWrapper">
            <img class="collaborate-header-bit" id="collaborate" src="@/assets/images/web_images/lisboa3.jpeg"
                alt="Bit_Team" />
            <h1 class="collaborate-title">{{ t('collaborate_title') }}</h1>
        </div>

        <NavBar></NavBar>

        <div class="waiting-list" id="waiting-list">
            <h2>{{ t('waitlist_title') }}</h2>
            <p>{{ t('collaborate_waitlist_description_1') }}</p>
            <p>{{ t('collaborate_waitlist_description_2') }}</p>
            <Formulario id="waitlist" />
        </div>


        <div id="contact-us">
            <h2>{{ t('collaborate_contact_title') }}</h2>
            <p>{{ t('collaborate_contact_description') }}</p>
            <ContactForm />
        </div>


        <div class="opinion">
            <h2 id="surveys">{{ t('collaborate_opinion_title') }}</h2>
            <p>{{ t('collaborate_opinion_description') }}</p>

            <div class="opinion-game">
                <!-- Opinion Slides -->
                <div v-if="currentSlideIndex < slides.length" class="opinion-slide">
                    <div class="opinio-options">
                        <button v-if="!hasVoted" class="option-btn opció1" @click="selectOption(0)">
                            <div class="option-label">
                                <img class="option-img" :src=slides[currentSlideIndex].options[0].img alt="Bit_Team" />
                                <div>{{ slides[currentSlideIndex].options[0].label }}</div>
                            </div>
                        </button>
                        <div v-else class="option-result opció1">
                            <div class="result-text">{{ slides[currentSlideIndex].options[0].percentage }}%</div>
                            <div class="result-count">{{ slides[currentSlideIndex].options[0].label }}</div>
                        </div>

                        <button v-if="!hasVoted" class="option-btn opció2" @click="selectOption(1)">
                            <div class="option-label">
                                <img class="option-img" :src=slides[currentSlideIndex].options[1].img alt="Bit_Team" />
                                <div>{{ slides[currentSlideIndex].options[1].label }}</div>
                            </div>
                        </button>
                        <div v-else class="option-result opció2">
                            <div class="result-text">{{ slides[currentSlideIndex].options[1].percentage }}%</div>
                            <div class="result-count">{{ slides[currentSlideIndex].options[1].label }}</div>
                        </div>
                    </div>

                    <button v-if="hasVoted" class="next-btn" @click="nextSlide">Següent</button>
                </div>

                <!-- Enquestes Slide -->
                <div v-else class="enquestes-slide">
                    <div class="enquestes-content">
                        <h3>{{ t('collaborate_opinion_thanks') }}</h3>
                        <p>{{ t('collaborate_opinion_question') }}</p>
                        <a href="https://forms.gle/y2QSFbbpGMoVtNNK6" target="_blank" class="enquestes-link">{{
                            t('collaborate_opinion_link') }}</a>
                    </div>
                </div>
            </div>
        </div>


    </div>
    <Footer></Footer>
</template>

<script>
import NavBar from '../medium_components/navBar.vue';
import Formulario from '../complex_components/Formulario.vue';
import ContactForm from '../complex_components/ContactForm.vue';
import Footer from '../medium_components/Footer.vue';
import { useI18n } from 'vue-i18n'

// Imatges
import img_Bit23 from '@/assets/images/Bits_Background/Bit_23.png';
import img_Bit25 from '@/assets/images/Bits_Background/Bit_25.png';
import img_Bit18 from '@/assets/images/Bits_Background/Bit_18.png';
import img_Bit19 from '@/assets/images/Bits_Background/Bit_19.png';
import img_Bit24 from '@/assets/images/Bits_Background/Bit_24.png';
import img_Bit17 from '@/assets/images/Bits_Background/Bit_17.png';
import img_Bit20 from '@/assets/images/Bits_Background/Bit_20.png';
import img_Bit14 from '@/assets/images/Bits_Background/Bit_14.png';


export default {
    name: 'CollaborateView',
    components: {
        NavBar,
        Formulario,
        ContactForm,
        Footer
    },
    data() {
        const { t } = useI18n()
        return {
            t,
            scrollY: 0,
            currentSlideIndex: 0,
            hasVoted: false,
            slides: [
                {
                    id: 1,
                    question: "Quina és la teva opinió?",
                    options: [
                        { label: "Diable", img: img_Bit23, percentage: 24, votes: 24 },
                        { label: "Angelet", img: img_Bit25, percentage: 76, votes: 76 }
                    ]
                },
                {
                    id: 2,
                    question: "I en aquest cas?",
                    options: [
                        { label: "Princeseta", img: img_Bit18, percentage: 66, votes: 66 },
                        { label: "Sireneta", img: img_Bit19, percentage: 33, votes: 33 }
                    ]
                },
                {
                    id: 3,
                    question: "I en aquest cas?",
                    options: [
                        { label: "Vaqueta", img: img_Bit24, percentage: 52, votes: 52 },
                        { label: "Porquet", img: img_Bit17, percentage: 48, votes: 48 }
                    ]
                },
                {
                    id: 4,
                    question: "I en aquest cas?",
                    options: [
                        { label: "Fantasmeta", img: img_Bit20, percentage: 38, votes: 38 },
                        { label: "Carbassó", img: img_Bit14, percentage: 62, votes: 62 }
                    ]
                },
            ]
        };
    },
    methods: {
        handleScroll() {
            this.scrollY = window.scrollY;
            const headerImg = document.querySelector('.collaborate-header-bit');
            if (headerImg) {
                // Move at 50% of scroll speed (parallax effect)
                headerImg.style.transform = `translateY(${this.scrollY * 0.5}px)`;
            }
        },
        selectOption(optionIndex) {
            this.hasVoted = true;
        },
        nextSlide() {
            this.currentSlideIndex++;
            this.hasVoted = false;
        }
    },
    mounted() {
        // Add scroll listener for parallax effect
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        // Remove scroll listener
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<style scoped>
.games-container {
    background-color: #FFE4DD;
    padding-bottom: 5vh;
}

.collaborate-header {
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

.collaborate-header-bit {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
    will-change: transform;
}

.collaborate-title {
    padding-top: 10vh;
    position: relative;
    color: #ffffff;
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 800;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
    color: #ffffff;
}

.waiting-list,
.opinion {
    width: 90%;
    padding-inline: 5%;
    padding-block: 2%;

    color: #333;
}

.opinion {
    background-color: #FFE4DD;
}

.waiting-list h2,
.opinion h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: bold;
}

.waiting-list p,
.opinion p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    line-height: 1.5;
}

/* Opinion Game Styles */
.opinion-game {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.opinion-slide {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.opinio-options {
    padding-inline: 10%;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;

}

.option-btn {
    flex: 1;
    min-height: 200px;
    max-width: 400px;
    padding: 1rem;

    background-color: #fff;

    border: 3px solid #E57373;
    border-radius: 12px;

    cursor: pointer;

    font-size: 1.1rem;
    font-weight: bold;
    transition: all 0.3s ease;
    color: #333;
}

.option-btn:hover {
    height: fit-content;
    background-color: #ffe4dd;
    transform: scale(1.05);
}

.option-btn:active {
    transform: scale(0.98);
}

.option-label {
    display: flex;
    flex-direction: column;
    gap: 20px;

    align-items: center;
    justify-content: center;
    height: 150px;
}

.option-img {
    max-height: 70%;
}

.option-result {
    flex: 1;
    min-width: 150px;
    max-width: 300px;
    padding: 3rem;
    background-color: rgba(229, 115, 115, 0.1);
    border: 3px solid #E57373;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.result-text {
    font-size: 2.5rem;
    font-weight: bold;
    color: #E57373;
}

.result-count {
    font-size: 1rem;
    color: #666;
}

.opció1,
.opció2 {
    display: flex;
    align-items: center;
    justify-content: center;
}

.next-btn {
    align-self: center;
    padding: 0.85rem 2rem;
    background-color: #E57373;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 1rem;
}

.next-btn:hover {
    background-color: #d85a5a;
}

.enquestes-slide {
    width: 80%;
    height: fit-content;

    display: flex;
    justify-content: center;

    background-color: #fff;
    border: 3px solid #E57373;
    border-radius: 12px;
    padding: 3rem 2rem;
    text-align: center;
}

.enquestes-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.enquestes-content h3 {
    font-size: 1.8rem;
    margin-top: 0rem;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: bold;
}

.enquestes-content p {
    font-size: 1.1rem;
    color: #666;
}

.enquestes-link {
    display: inline-block;
    padding: 0.85rem 2rem;
    background-color: #E57373;
    color: #fff;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.enquestes-link:hover {
    background-color: #d85a5a;
}

#contact-us {
    width: 90%;
    padding-inline: 5%;
    padding-block: 4%;
    background-color: #FFD8CF;


}

#contact-us h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: #333;
}

#contact-us p {
    font-size: 1.1rem;
    color: #333;
    margin-bottom: 1rem;
}
</style>