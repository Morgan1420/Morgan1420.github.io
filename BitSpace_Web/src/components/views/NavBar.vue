<template>
    <nav ref="navbarRef" :class="{ scrolled: isScrolled }" aria-label="Navegacio principal">
        <div class="nav-logo">
            <div class="logo-blob">
                <img :src="BitPrincesa" alt="Bit logo" />
            </div>
            BitSpace
        </div>

        <ul class="nav-links">
            <li><a href="#concept" @click.prevent="scrollToSection('concept')">El Concepte</a></li>
            <li><a href="#how" @click.prevent="scrollToSection('how')">Com funciona</a></li>
            <li><a href="#areas" @click.prevent="scrollToSection('areas')">Àrees de millora</a></li>
            <li><a href="#spaces" @click.prevent="scrollToSection('spaces')">The Space</a></li>
            <li><a href="#team" @click.prevent="scrollToSection('team')">Equip</a></li>
            <li>
                <a href="#cta" class="nav-cta" @click.prevent="scrollToSection('cta')">Uneix-te ✨</a>
            </li>
        </ul>

        <button type="button" class="nav-lang" @click="goToSpanish" aria-label="Canviar idioma a espanyol">
            ES / CA
        </button>
    </nav>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BitPrincesa from '@/assets/images/Bits_Background/Bit_18.png'

const navbarRef = ref(null)
const isScrolled = ref(false)

const handleScroll = () => {
    isScrolled.value = window.scrollY > 40
}

const scrollToSection = (id) => {
    const target = document.getElementById(id)

    if (!target) {
        return
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const goToSpanish = () => {
    window.location.href = '/es'
}

onMounted(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
@font-face {
    font-family: 'Nunito';
    src: url('../../assets/fonts/nunito/static/Nunito-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Nunito';
    src: url('../../assets/fonts/nunito/static/Nunito-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Baloo 2';
    src: url('../../assets/fonts/baloo-2/static/Baloo2-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Baloo 2';
    src: url('../../assets/fonts/baloo-2/static/Baloo2-ExtraBold.ttf') format('truetype');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Press Start 2P';
    src: url('../../assets/fonts/press-start-2p/PressStart2P-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@keyframes blob-float {

    0%,
    100% {
        transform: translateY(0) rotate(-2deg);
    }

    50% {
        transform: translateY(-8px) rotate(2deg);
    }
}

nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 248, 242, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(196, 181, 253, 0.2);
    transition: all 0.3s;
    font-family: 'Nunito', sans-serif;
}

nav.scrolled {
    padding: 0.7rem 2rem;
    box-shadow: 0 4px 24px rgba(45, 27, 78, 0.08);
}

.nav-logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: 'Baloo 2', cursive;
    font-weight: 800;
    font-size: 1.4rem;
    color: var(--text-dark);
}

.nav-logo .logo-blob {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, var(--purple), var(--pink));
    border-radius: 50% 50% 50% 40% / 50% 50% 40% 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    animation: blob-float 4s ease-in-out infinite;
}

.nav-logo .logo-blob img {
    width: 80%;
    height: 80%;
    object-fit: contain;
    border-radius: 50%;
    display: block;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
    font-weight: 600;
    font-size: 0.95rem;
    margin: 0;
    padding: 0;
}

.nav-links a {
    color: var(--text-mid);
    transition: color 0.2s;
    position: relative;
    text-decoration: none;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--purple-deep);
    border-radius: 2px;
    transform: scaleX(0);
    transition: transform 0.2s;
}

.nav-links a:hover {
    color: var(--purple-deep);
}

.nav-links a:hover::after {
    transform: scaleX(1);
}

.nav-cta {
    background: linear-gradient(135deg, var(--purple-deep), var(--pink-deep));
    color: white !important;
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.9rem;
    transition:
        transform 0.2s,
        box-shadow 0.2s !important;
}

.nav-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(167, 139, 250, 0.4);
}

.nav-cta::after {
    display: none !important;
}

.nav-lang {
    font-size: 0.8rem;
    color: var(--text-light);
    cursor: pointer;
    border: 1px solid var(--purple);
    padding: 0.25rem 0.6rem;
    border-radius: 50px;
    transition: all 0.2s;
    background: transparent;
    font-family: 'Nunito', sans-serif;
}

.nav-lang:hover {
    background: var(--lavender);
}

@media (max-width: 900px) {
    .nav-links {
        display: none;
    }
}
</style>
