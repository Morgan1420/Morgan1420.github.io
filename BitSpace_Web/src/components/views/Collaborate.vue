<template>
    <div class="games-container">
        <div class="collaborate-header" ref="headerWrapper">
            <img class="collaborate-header-bit" id="collaborate" src="@/assets/images/web_images/lisboa3.jpeg"
                alt="Bit_Team" />
            <h1 class="collaborate-title">Collaborate with us!</h1>
        </div>

        <NavBar></NavBar>

        <div id="waiting-list">Waiting list</div>
        <section aria-labelledby="waitlist">
            <Formulario id="waitlist" style="background-color: aliceblue;" />
        </section>


        <div id="contact-us">Enquesa i preguntes de "what do you prefer"</div>

        <div id="contact-us">Contact Us formulari</div>

    </div>
</template>

<script>
import NavBar from '../medium_components/navBar.vue';
import Formulario from '../complex_components/Formulario.vue';

export default {
    name: 'CollaborateView',
    components: {
        NavBar,
        Formulario
    },
    data() {
        return {
            scrollY: 0
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
    color: #333333;
}
</style>