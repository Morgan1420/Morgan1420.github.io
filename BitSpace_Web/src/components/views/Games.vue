<template>
    <div class="games-container">
        <div class="collaborate-header" ref="headerWrapper">
            <h1 class="collaborate-title">Jocs</h1>
        </div>

        <NavBar></NavBar>

        <div id="prototype">
            <h2>{{ $t('prototype_title') }}</h2>
            <p>BitSpace encara es troba en una fase "early seed" on on encara s'està validant i desenvolupant les bases
                de l'aplicació final.</p>
            <p>A continuació podreu veure doncs un petit prototip web perquè us feu a la idea de com es veurà BitSpace.
                Si teniu qualsevol dubte o opinió no dubteu a contactar-nos a la pesta de contacte.</p>
            <p></p>
            <fancyButton :buttonText="$t('prototype_access')" @click="openPrototype" :center="true" />
        </div>

        <div id="create-your-bit">
            <CreaTuBit></CreaTuBit>
        </div>

        <div id="opinionSlides">
            <OpinionSlides></OpinionSlides>
        </div>
    </div>

    <Footer></Footer>
</template>

<script>
import CreaTuBit from '../complex_components/CreaTuBit.vue';
import NavBar from '../medium_components/navBar.vue';
import OpinionSlides from '../medium_components/OpinionSlides.vue';
import Footer from '../medium_components/Footer.vue';
import { h } from 'vue';
import fancyButton from '../small_components/fancyButton.vue';
export default {

    name: 'Games',
    components: {
        CreaTuBit,
        NavBar,
        OpinionSlides,
        Footer,
        fancyButton
    },
    data() {
        return {
            scrollY: 0,
            isOverCarousel: true,
            headerObserver: null,
            prototype_link: "https://prototype.bitspace.es/ca"
        }
    },
    methods: {
        playGame(gameId) {
            console.log(`Playing game ${gameId}`);
        }
        ,
        openPrototype() {
            const url = this.prototype_link;
            if (!url) return;
            window.open(url, '_blank', 'noopener,noreferrer');
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
    height: 20vh;
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
    color: black;
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 800;
}

#prototype {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: left;
    padding: 4rem 5rem;
}

#prototype h2 {
    width: 100%;
    font-size: 2rem;
    font-weight: bold;
    color: #333;
}

#prototype p {
    width: 100%;
    font-size: 1.1rem;
    color: #333;
}

#enllac-proto {
    margin-top: 2rem;
    padding: 1rem 2rem;
    background-color: #FFD8CF;

    border: 2px solid #f4cbc2;
    border-radius: 10px;


}

#enllac-proto {
    cursor: pointer;
    color: inherit;
}

#enllac-proto:focus {
    outline: 2px solid rgba(0, 0, 0, 0.12);
    outline-offset: 3px;
}

#opinionSlides {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFE4DD;
}

#create-your-bit {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFD8CF;
}
</style>