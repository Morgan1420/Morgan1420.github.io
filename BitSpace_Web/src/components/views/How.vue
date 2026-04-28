<template>
    <section id="how">
        <div class="section-inner">
            <div class="section-header text-center animate-on-scroll">
                <div class="section-badge"><b>✦</b> Com funciona <b>✦</b></div>
                <h2 class="section-title">Quatre passos cap al<br>teu millor tu</h2>
                <p class="section-subtitle">Un procés senzill, emocionant i científicament dissenyat per crear hàbits
                    duradors.</p>
            </div>

            <div class="steps-grid">
                <div class="step-card animate-on-scroll">
                    <div class="step-num">1</div>
                    <h3>Adopta el teu Bit</h3>
                    <span class="step-icon"><img class="step-mascot" :src="Bit_adopta"
                            alt="Mascota de BitSpace" /></span>
                    <p>Posa-li nom i crea un vincle emocional des del primer moment.</p>
                </div>
                <div class="step-card animate-on-scroll">
                    <div class="step-num">2</div>
                    <h3>Escull el teu camí</h3>
                    <span class="step-icon"><img class="step-mascot" :src="Bit_escull"
                            alt="Mascota de BitSpace" /></span>
                    <p>Decideix el camí de millora que vols emprendre. Digital Detox, Esport, Lectura o Estudi.</p>
                </div>
                <div class="step-card animate-on-scroll">
                    <div class="step-num">3</div>
                    <h3>Completa reptes diaris</h3>
                    <span class="step-icon"><img class="step-mascot" :src="Bit_completa"
                            alt="Mascota de BitSpace" /></span>
                    <p>Completa Micro-reptes creats només per a tu. Senzills, motivadors i útils.</p>
                </div>
                <div class="step-card animate-on-scroll">
                    <div class="step-num">4</div>
                    <h3>Decora el teu BitSpace</h3>
                    <span class="step-icon"><img class="step-mascot" :src="Bit_decora"
                            alt="Mascota de BitSpace" /></span>
                    <p>Guanya monedes, desbloqueja objectes i construeix l'habitació dels somnis del teu Bit.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

import stepMascot from '@/assets/images/Bits_Background/Bit_8.png'
import Bit_adopta from '@/assets/images/Bits_Background/Bit_25.png'
import Bit_escull from '@/assets/images/Bits_Background/Bit_11.png'
import Bit_completa from '@/assets/images/Bits_Background/Bit_18.png'
import Bit_decora from '@/assets/images/Bits_Background/Bit_19.png'

let observer

onMounted(() => {
    observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                    observer.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.12 },
    )

    document.querySelectorAll('#how .animate-on-scroll').forEach(element => observer.observe(element))
})

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect()
    }
})
</script>

<style scoped>
#how {
    background: linear-gradient(160deg, var(--cream) 0%, var(--lavender) 50%, var(--pink-soft) 100%);
    position: relative;
    overflow: hidden;
    padding: 6rem 2rem;
    font-family: 'Nunito', sans-serif;
}

.section-inner {
    max-width: 1300px;
    margin: 0 auto;
}

.section-header {
    margin-bottom: 4rem;
}

.text-center {
    text-align: center;
}

.text-center .section-subtitle {
    margin: 0 auto;
}

.section-badge {
    font-family: 'Press Start 2P', monospace;
    font-size: 0.6rem;
    color: var(--purple-deep);
    background: var(--white);
    padding: 0.4rem 0.9rem;
    border-radius: 6px;
    display: inline-block;
    margin-bottom: 1rem;
    letter-spacing: 0.05em;
}

.section-badge b {
    font-size: 1rem;
}

.section-title {
    font-family: 'Baloo 2', cursive;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.section-subtitle {
    font-size: 1.05rem;
    color: var(--text-mid);
    max-width: 700px;
    font-weight: 500;
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

.steps-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    position: relative;
}

.steps-grid::before {
    content: '';
    position: absolute;
    top: 52px;
    left: calc(12.5% + 24px);
    right: calc(12.5% + 24px);
    height: 3px;
    background: linear-gradient(90deg, var(--purple), var(--pink-deep));
    border-radius: 2px;
    z-index: 0;
}

.step-card {
    background: white;
    border-radius: var(--radius-xl);
    padding: 2rem 1.5rem;
    text-align: center;
    position: relative;
    z-index: 1;
    box-shadow: var(--shadow-card);
    transition: transform 0.3s, box-shadow 0.3s;
}

.step-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px rgba(167, 139, 250, 0.2);
}

.step-num {
    width: 52px;
    height: 52px;
    background: linear-gradient(135deg, var(--purple-deep), var(--pink-deep));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Baloo 2', cursive;
    font-size: 1.3rem;
    font-weight: 800;
    color: white;
    margin: 0 auto 1.25rem;
    box-shadow: 0 4px 16px rgba(167, 139, 250, 0.4);
}

.step-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
    display: block;
}

.step-mascot {
    max-width: 150px;
    max-height: 120px;
    object-fit: contain;
    margin: 0 auto;
}

.step-card h3 {
    font-family: 'Baloo 2', cursive;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 0.5rem;
}

.step-card p {
    font-size: 0.85rem;
    color: var(--text-mid);
    line-height: 1.6;
}

@media (max-width: 900px) {
    #how {
        padding: 4rem 1.5rem;
    }

    .steps-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .steps-grid::before {
        display: none;
    }
}

@media (max-width: 600px) {
    .steps-grid {
        grid-template-columns: 1fr;
    }
}
</style>
