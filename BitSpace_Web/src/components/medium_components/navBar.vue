<template>
    <div id="nav-bar" :class="{ 'nav-over-carousel': isOverCarousel, 'nav-after-carousel': !isOverCarousel }">
        <router-link id="nb-BitSpace-logo" :to="'/' + locale" aria-label="Tornar a la pàgina inicial de BitSpace">
            <img class="bitspace-logo" src="../../assets/images/Web_icons/BS-logo.png" alt="Logotip de BitSpace" />
        </router-link>

        <div id="nb-web-menus">
            <div class="nav-item nav-item-games">
                <router-link class="nav-button" :to="{ name: 'Games', params: { lang: locale } }">
                    Games
                </router-link>
                <div class="nav-submenu">
                    <button type="button" class="nav-submenu-item">Prototype</button>
                    <router-link class="nav-submenu-item"
                        :to="{ name: 'Games', params: { lang: locale }, hash: '#create-your-bit' }">
                        Create your bit
                    </router-link>
                </div>
            </div>

            <div class="nav-item nav-item-team">
                <router-link class="nav-button" :to="{ name: 'Team', params: { lang: locale } }">
                    Team
                </router-link>
                <div class="nav-submenu">
                    <router-link class="nav-submenu-item"
                        :to="{ name: 'Team', params: { lang: locale }, hash: '#team' }">
                        Team
                    </router-link>
                    <router-link class="nav-submenu-item"
                        :to="{ name: 'Team', params: { lang: locale }, hash: '#history' }">
                        History
                    </router-link>
                </div>
            </div>

            <div class="nav-item nav-item-collaborate">
                <router-link class="nav-button" :to="{ name: 'Collaborate', params: { lang: locale } }">
                    Collaborate
                </router-link>
                <div class="nav-submenu">
                    <router-link class="nav-submenu-item"
                        :to="{ name: 'Collaborate', params: { lang: locale }, hash: '#surveys' }">
                        Surveys
                    </router-link>
                    <router-link class="nav-submenu-item"
                        :to="{ name: 'Collaborate', params: { lang: locale }, hash: '#waiting-list' }">
                        Waiting list
                    </router-link>
                    <router-link class="nav-submenu-item"
                        :to="{ name: 'Collaborate', params: { lang: locale }, hash: '#contact-us' }">
                        Contact us
                    </router-link>
                </div>
            </div>

            <div class="nav-language" @keyup.esc.stop="isLangMenuOpen = false">
                <button type="button" class="nav-lang-toggle" @click="isLangMenuOpen = !isLangMenuOpen"
                    :aria-expanded="isLangMenuOpen ? 'true' : 'false'" aria-haspopup="true" aria-label="Canviar idioma">
                    <img class="flag" :src="currentLangFlag.src" :alt="currentLangFlag.alt" />
                </button>

                <div v-if="isLangMenuOpen" class="nav-lang-menu" role="menu">
                    <router-link to="/ca" role="menuitem" aria-label="Cambiar a Català" @click="isLangMenuOpen = false">
                        <img class="flag" src="../../assets/images/Web_icons/cat_flag.png"
                            alt="Bandera de Catalunya - Canviar idioma a Català" />
                        <span>CAT</span>
                    </router-link>

                    <router-link to="/en" role="menuitem" aria-label="Switch to English"
                        @click="isLangMenuOpen = false">
                        <img class="flag" src="../../assets/images/Web_icons/uk_flag.png"
                            alt="UK Flag - Switch language to English" />
                        <span>ENG</span>
                    </router-link>

                    <router-link to="/es" role="menuitem" aria-label="Cambiar a Español"
                        @click="isLangMenuOpen = false">
                        <img class="flag" src="../../assets/images/Web_icons/es_flag.png"
                            alt="Bandera de España - Cambiar idioma a Español" />
                        <span>ESP</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import catFlag from '@/assets/images/Web_icons/cat_flag.png'
import ukFlag from '@/assets/images/Web_icons/uk_flag.png'
import esFlag from '@/assets/images/Web_icons/es_flag.png'

const { locale } = useI18n()

const { isOverCarousel } = defineProps({
    isOverCarousel: {
        type: Boolean,
        default: true
    }
})

const isLangMenuOpen = ref(false)

const currentLangFlag = computed(() => {
    const lang = locale.value
    if (lang === 'ca') {
        return {
            src: catFlag,
            alt: 'Bandera de Catalunya - Idioma actual Català',
            label: 'CAT'
        }
    }
    if (lang === 'en') {
        return {
            src: ukFlag,
            alt: 'UK Flag - Current language English',
            label: 'ENG'
        }
    }
    // default to Spanish
    return {
        src: esFlag,
        alt: 'Bandera de España - Idioma actual Español',
        label: 'ESP'
    }
})
</script>

<style scoped>
#nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    padding-bottom: 10px;
    padding-top: 5px;
    z-index: 1000;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.nav-over-carousel {
    background-color: transparent;
}

.nav-after-carousel {
    background-color: #fcdcd4;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

#nb-BitSpace-logo {
    display: inline-flex;
    align-items: center;
    padding: 0;
    background-color: transparent;
}

#nb-BitSpace-logo:hover {
    background-color: transparent;
}

.bitspace-logo {
    max-height: 60px;
    width: auto;
    display: block;
}

#nb-web-menus {
    display: flex;
    gap: 2rem;
}

.nav-item {
    position: relative;
}

.nav-submenu {
    position: absolute;
    top: 100%;
    left: 0;
    width: fit-content;
    min-width: 150px;
    padding: 1rem 1rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-size: 10px;
    display: none;
    gap: 0.5rem;
    z-index: 1100;
}

.nav-item-games:hover .nav-submenu,
.nav-item-team:hover .nav-submenu,
.nav-item-collaborate:hover .nav-submenu {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
}

.nav-submenu-item {
    border: none;
    background: transparent;
    text-align: left;
    padding: 0.35rem 0.6rem;
    font-size: 1rem;
    cursor: pointer;
    color: #333;
}

.nav-submenu-item:hover {
    background-color: #ffe4dd;
}

.nav-button {
    min-width: 90px;
    border: none;
    background: transparent;
    color: #333;
    margin-top: 5px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
}

.nav-button:focus-visible {
    outline: 2px solid #333;
    outline-offset: 2px;
}

.nav-language {
    margin-top: 5px;
    position: relative;
}

.nav-lang-toggle {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0.25rem 0.4rem;
}

.nav-lang-toggle:focus-visible {
    outline: 2px solid #333;
    outline-offset: 2px;
}

.nav-lang-menu {
    position: absolute;
    right: 0;
    top: 115%;
    min-width: 140px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 0.35rem 0.25rem;
    display: flex;
    flex-direction: column;
    z-index: 1100;
}

.nav-lang-menu a {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.25rem 0.5rem;
    color: #333;
    text-decoration: none;
    font-size: 0.9rem;
}

.nav-lang-menu a:hover {
    background-color: #ffe4dd;
}

.flag {
    width: 18px;
    height: auto;
}
</style>