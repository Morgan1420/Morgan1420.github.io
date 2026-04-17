<template>
    <footer ref="footerRoot" class="site-footer">
        <div class="footer-inner">
            <div class="footer-brand">
                <div class="logo-text">
                    <div class="brand-mark">🌟</div>
                    BitSpace
                </div>
                <p>Adopta el teu Bit, crea hàbits saludables dia a dia i observa com creix feliç al teu costat. </p>
                <span class="footer-tagline"><b>✦</b> Cuida el teu Bit, cuida't a tu <b>✦</b></span>
            </div>

            <div class="footer-col">
                <h4>Producte</h4>
                <ul>
                    <li><a href="#concept">El Concepte</a></li>
                    <li><a href="#how">Funcions</a></li>
                    <li><a href="#areas">Àrees</a></li>
                    <li><a href="#spaces">The Space</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h4>Empresa</h4>
                <ul>
                    <li><a href="#team">L'Equip</a></li>
                    <li><a href="#">Missió</a></li>
                    <li><a href="#">Història</a></li>
                    <li><a href="#">Contacte</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h4>Legal</h4>
                <ul>
                    <li><a href="#">Privacitat</a></li>
                    <li><a href="#">Condicions d'ús</a></li>
                    <li><a href="#">Cookies</a></li>
                    <li><a href="#">GDPR</a></li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <p>© 2026 BitSpace. Fet amb 💜 a Barcelona.</p>
            <div class="social-links">
                <a href="https://www.instagram.com/bitspaceapp/" class="social-link" aria-label="Instagram">
                    <img :src="InstagramIcon" alt="Instagram" />
                </a>
                <a href="https://www.youtube.com/@BitSpaceDigitalHealth" class="social-link" aria-label="Youtube">
                    <img :src="YoutubeIcon" alt="Youtube" />
                </a>
                <a href="https://www.linkedin.com/company/bitspace-digital-health/" class="social-link"
                    aria-label="LinkedIn">
                    <img :src="LinkedInIcon" alt="LinkedIn" />
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

import LinkedInIcon from '@/assets/images/Web_icons/linkeding_icon.png'
import YoutubeIcon from '@/assets/images/Web_icons/youtube.png'
import InstagramIcon from '@/assets/images/Web_icons/instagram_icon.png'

const footerRoot = ref(null)
const linkHandlers = []

onMounted(() => {
    const root = footerRoot.value

    if (!root) {
        return
    }

    const internalLinks = root.querySelectorAll('a[href^="#"]')

    internalLinks.forEach((link) => {
        const href = link.getAttribute('href')

        if (!href || href === '#') {
            return
        }

        const handler = (event) => {
            const target = document.querySelector(href)

            if (!target) {
                return
            }

            event.preventDefault()
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }

        link.addEventListener('click', handler)
        linkHandlers.push({ link, handler })
    })
})

onBeforeUnmount(() => {
    linkHandlers.forEach(({ link, handler }) => {
        link.removeEventListener('click', handler)
    })

    linkHandlers.length = 0
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
    src: url('../../assets/fonts/baloo-2/static/Baloo2-Bold.ttf') format('truetype');
    font-weight: 700;
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

.site-footer {
    background: var(--navy);
    color: rgba(255, 255, 255, 0.5);
    padding: 3rem 2rem 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    font-family: 'Nunito', sans-serif;
}

.footer-inner {
    max-width: 1100px;
    margin: 0 auto 3rem;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
}

.footer-brand .logo-text {
    font-family: 'Baloo 2', cursive;
    font-size: 1.5rem;
    font-weight: 800;
    color: white;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.brand-mark {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #a78bfa, #ff8fab);
    border-radius: 50% 50% 50% 40% / 50% 50% 40% 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
}

.footer-brand p {
    font-size: 0.85rem;
    line-height: 1.7;
    max-width: 260px;
    margin: 0;
}

.footer-tagline {
    font-family: 'Press Start 2P', monospace;
    font-size: 0.5rem;
    color: var(--purple);
    margin-top: 1rem;
    display: block;
}

.footer-col h4 {
    font-family: 'Baloo 2', cursive;
    font-weight: 700;
    font-size: 0.9rem;
    color: white;
    margin: 0 0 1rem;
}

.footer-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-col ul li {
    margin-bottom: 0.6rem;
    font-size: 0.85rem;
}

.footer-col ul li a {
    color: rgba(255, 255, 255, 0.45);
    text-decoration: none;
    transition: color 0.2s;
}

.footer-col ul li a:hover {
    color: var(--purple);
}

.footer-bottom {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    font-size: 0.8rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.footer-bottom p {
    margin: 0;
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-link {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.07);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s;
    text-decoration: none;
}

.social-link:hover {
    background: var(--purple-deep);
    color: white;
    border-color: var(--purple-deep);
}

.social-link img {
    width: 25px;
    height: 25px;
}

@media (max-width: 900px) {
    .footer-inner {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 600px) {
    .site-footer {
        padding: 2.5rem 1.25rem 1.75rem;
    }

    .footer-inner {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .footer-bottom {
        align-items: flex-start;
    }
}
</style>
