<template>
    <section id="team">
        <div class="section-inner">
            <div class="section-header text-center animate-on-scroll">
                <div class="section-badge"><b>✦</b> L'equip <b>✦</b></div>
                <h2 class="section-title">Tres ments, una visio</h2>
                <p class="section-subtitle">
                    Un equip multidisciplinar que equilibra la viabilitat tecnica, la sostenibilitat
                    financera i el rigor cientific.
                </p>
            </div>


            <div class="team-grid">
                <div class="team-card animate-on-scroll">
                    <a class="hidden-link" href="https://www.linkedin.com/in/jan-moran/" target="_blank"
                        rel="noopener noreferrer">
                        <div class="imatge-with-bit">
                            <img class="imatge" :src="Img_Jan" alt="Jan Moran Ricardo" />
                            <img class="imatge_bit_right" :src="Bit_Jan" alt="Bit_Jan" />
                        </div>
                    </a>
                    <div class="info-membre">
                        <h3 class="nom">Jan Moran Ricardo</h3>
                        <div class="team-role">Finance Lead</div>
                    </div>
                </div>
                <div class="team-card animate-on-scroll" style="transition-delay: 0.2s">
                    <a class="hidden-link" href="https://www.linkedin.com/in/gerard-garcia-gros/" target="_blank"
                        rel="noopener noreferrer">
                        <div class="imatge-with-bit">
                            <img class="imatge" :src="Img_Gerard" alt="Gerard Garcia" />
                            <img class="imatge_bit_right" :src="Bit_Gerard" alt="Bit_Gerard" />
                        </div>
                    </a>
                    <div class="info-membre">
                        <h3 class="nom">Gerard Garcia Gros</h3>
                        <div class="team-role">Tech Lead</div>
                    </div>
                </div>
                <div class="team-card animate-on-scroll" style="transition-delay: 0.3s">
                    <a class="hidden-link" href="https://www.linkedin.com/in/lluna-lara-valle/" target="_blank"
                        rel="noopener noreferrer">
                        <div class="imatge-with-bit">
                            <img class="imatge" :src="Img_Lluna" alt="Lluna Lara" />
                            <img class="imatge_bit_right" :src="Bit_Lluna" alt="Bit_Lluna" />
                        </div>
                    </a>
                    <div class="info-membre">
                        <h3 class="nom">Lluna Lara Valle</h3>
                        <div class="team-role">Health Expert</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

import Img_Jan from '@/assets/images/Equip/Jan.png'
import Bit_Jan from '@/assets/images/Bits_Background/Bit_jan_llegint.png'
import Img_Gerard from '@/assets/images/Equip/Gerard.png'
import Bit_Gerard from '@/assets/images/Bits_Background/Gerard_Bit_sin_fondo.png'
import Img_Lluna from '@/assets/images/Equip/anulL.png'
import Bit_Lluna from '@/assets/images/Bits_Background/Lluna_Bit_sin_fondo.png'

let observer = null

onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('visible'), 60)
                    observer?.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.12 }
    )

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer?.observe(el))
})

onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700&family=Press+Start+2P&display=swap');

section {
    padding: 6rem 2rem;
}

.section-inner {
    max-width: 1100px;
    margin: 0 auto;
}

.section-badge {
    font-family: 'Press Start 2P', monospace;
    font-size: 0.6rem;
    color: var(--purple-deep);
    background: var(--lavender);
    padding: 0.4rem 0.9rem;
    border-radius: 6px;
    display: inline-block;
    margin-bottom: 1rem;
    letter-spacing: 0.05em;
}

.section-title {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    color: var(--text-dark);
    margin-bottom: 1rem;
    font-family: 'Baloo 2', cursive;
}

.section-subtitle {
    font-size: 1.05rem;
    color: var(--text-mid);
    max-width: 580px;
    font-weight: 500;
    margin: 0 auto;
    font-family: 'Nunito', sans-serif;
}

.section-header {
    margin-bottom: 4rem;
}

.text-center {
    text-align: center;
}

#team {
    background: white;
}

.team-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 1rem;
}

.team-card {
    border-radius: var(--radius-xl);
    padding: 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.team-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0 auto 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    background: white;
    box-shadow: 0 4px 16px rgba(167, 139, 250, 0.2);
    animation: blob-float 5s ease-in-out infinite;
}

.team-card:nth-child(2) .team-avatar {
    animation-delay: 1s;
}

.team-card:nth-child(3) .team-avatar {
    animation-delay: 2s;
}

.team-card h3 {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--text-dark);
    margin-bottom: 0.25rem;
    font-family: 'Baloo 2', cursive;
}

.team-role {
    font-family: 'Press Start 2P', monospace;
    font-size: 0.8rem;
    color: var(--purple-deep);
    background: white;
    padding: 0.3rem 0.7rem;
    border-radius: 6px;
    display: inline-block;
    margin-bottom: 0.75rem;
}

.team-card p {
    font-size: 0.85rem;
    color: var(--text-mid);
    font-family: 'Nunito', sans-serif;
}

.animate-on-scroll {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.visible {
    opacity: 1;
    transform: none;
}

.hidden-link {
    text-decoration: none;
    color: inherit;
    background-color: transparent;
    padding: 0;
    display: inline-block;
}

.hidden-link:hover,
.hidden-link:focus,
.hidden-link:active,
.hidden-link:focus-visible {
    color: inherit;
    text-decoration: none;
    background-color: transparent !important;
    outline: none;
}

.imatge-with-bit,
.info-membre {
    display: flex;
    flex-direction: column;
    width: fit-content;
}

.imatge-with-bit {
    margin-left: 20px;
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


@keyframes blob-float {

    0%,
    100% {
        transform: translateY(0) rotate(-2deg);
    }

    50% {
        transform: translateY(-18px) rotate(2deg);
    }
}

@media (max-width: 900px) {
    .team-grid {
        grid-template-columns: 1fr;
        max-width: 380px;
        margin: 0 auto;
    }
}

@media (max-width: 600px) {
    section {
        padding: 4rem 1.5rem;
    }
}
</style>