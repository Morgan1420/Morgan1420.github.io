<template>
  <div class="home-container">
    <Carousel/>
    <main>
      <VideoSection
        title="Què és BitSpace?"
        text="BitSpace és un <b>entorn virtual</b> accessible via aplicació mòbil que es basa a <b>cuidar mascotes digitals</b> (els 'Bits'), de forma similar a jocs com Pou o Tamagotchi. 
              <br><br> El teu bit actuarà com a mirall de la teva salut: la seva felicitat i benestar estan directament lligats als teus hàbits de cura personal en el món real..
              <br><br> L'objectiu és simple: <b>En cuidar la teva mascota t’estàs cuidant a tu mateix</b>"
        videoSrc="https://www.youtube.com/watch?v=Qwq4Hw9aljQ"
        backgroundColor="#FFD8CF"
      />

      <InfoSectionLeft
        title=""
        text=""
        image=""
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
import InfoSectionLeft from './medium_components/InfoSectionLeft.vue';
</script>

<style scoped>

.home-container {
  background-color: #FFE4DD;
  min-height: 100vh;
  font-family: sans-serif;
  color: #333;
}


</style>
