<template>
    <div class="opinion">
        <h2 id="surveys">{{ t('collaborate_opinion_title') }}</h2>
        <p>{{ t('collaborate_opinion_description') }}</p>
        <h3 class="opinion-subtitle">{{ t('collaborate_opinion_subtitle') }}</h3>

        <div class="opinion-game">
            <!-- Opinion Slides -->
            <div v-if="currentSlideIndex < slides.length" class="opinion-slide">
                <div class="opinio-options">
                    <button v-if="!hasVoted" class="option-btn opció1" @click="selectOption(0)">
                        <div class="option-label">
                            <img class="option-img" :src="slides[currentSlideIndex].options[0].img" alt="Bit_Team" />
                            <div>{{ slides[currentSlideIndex].options[0].label }}</div>
                        </div>
                    </button>
                    <div v-else class="option-result opció1">
                        <div class="result-text">{{ slides[currentSlideIndex].options[0].percentage }}%</div>
                        <div class="result-count">{{ slides[currentSlideIndex].options[0].label }}</div>
                    </div>

                    <button v-if="!hasVoted" class="option-btn opció2" @click="selectOption(1)">
                        <div class="option-label">
                            <img class="option-img" :src="slides[currentSlideIndex].options[1].img" alt="Bit_Team" />
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
</template>

<script setup>
import { ref } from 'vue'
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

const { t } = useI18n()

const currentSlideIndex = ref(0)
const hasVoted = ref(false)

const slides = [
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

const selectOption = (optionIndex) => {
    hasVoted.value = true
}

const nextSlide = () => {
    currentSlideIndex.value++
    hasVoted.value = false
}
</script>

<style scoped>
.opinion {
    width: 90%;
    padding-inline: 5%;
    padding-block: 2%;

    color: #333;
    background-color: #FFE4DD;
}

.opinion h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: bold;
}

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

.opinion-subtitle {
    font-size: 1.5rem;
    margin-top: 4rem;
    margin-bottom: 1rem;
    font-weight: bold;
    text-align: center;
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
</style>
