<template>
    <div class="games-container">
        <div class="collaborate-header" ref="headerWrapper">
            <img class="collaborate-header-bit" id="collaborate" src="@/assets/images/web_images/lisboa3.jpeg"
                alt="Bit_Team" />
            <h1 class="collaborate-title">{{ t('collaborate_title') }}</h1>
        </div>

        <NavBar :is-over-carousel="!isOverCarousel"></NavBar>

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


    </div>
    <Footer></Footer>
</template>

<script>
import NavBar from '../medium_components/navBar.vue';
import Formulario from '../complex_components/Formulario.vue';
import ContactForm from '../complex_components/ContactForm.vue';
import OpinionSlides from '../medium_components/OpinionSlides.vue';
import Footer from '../medium_components/Footer.vue';
import { useI18n } from 'vue-i18n'

export default {
    name: 'CollaborateView',
    components: {
        NavBar,
        Formulario,
        ContactForm,
        OpinionSlides,
        Footer
    },
    data() {
        const { t } = useI18n()
        return {
            t,
            scrollY: 0,
            isOverCarousel: true,
            headerObserver: null
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
        }
    },
    mounted() {
        // Add scroll listener for parallax effect
        window.addEventListener('scroll', this.handleScroll);

        // Add IntersectionObserver for navbar color change
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
    },
    beforeUnmount() {
        // Remove scroll listener
        window.removeEventListener('scroll', this.handleScroll);

        // Remove IntersectionObserver
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

.waiting-list h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: bold;
}

.waiting-list p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    line-height: 1.5;
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