<template>
  <div class="home-container">
    <Carousel/>
    <main>
      <VideoSection
        title="Què és BitSpace?"
        text="BitSpace és un entorn virtual accessible via aplicació mòbil i web, que es basa a cuidar mascotes digitals (els 'Bits'), de forma similar a jocs com Pou o Tamagotchi. A diferència d’aquests, a BitSpace, el benestar del Bit està directament lligat als hàbits de cura personal de l'usuari. En altres paraules: En cuidar la teva mascota t’estàs cuidant a tu mateix. En unes altres paraules encara: El teu Bit actua de mirall de la teva salut “digital”."
        videoSrc="https://www.youtube.com/watch?v=Qwq4Hw9aljQ"
        backgroundColor="#FFD8CF"
      />

      <br>
      <Formulario/>
    </main>
  </div>
</template>

<script setup>
import Carousel from './medium_components/Carousel.vue';
import VideoSection from './medium_components/VideoSection.vue'
import Formulario from './Formulario.vue';
</script>

<style scoped>

.home-container {
  background-color: #FFE4DD;
  min-height: 100vh;
  font-family: sans-serif;
  color: #333;
}


</style>
