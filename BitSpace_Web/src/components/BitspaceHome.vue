<template>
  <div class="home-container">
  <Carousel @go-to-collaborate="scrollToCollaborate"/>
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
        title="Com funciona?"
        text="Quan et descarregues BitSpace, a part del nom i l'edat, se't demanarà que indiquis <b>quin aspecte de la teva vida vols millorar</b>. 
              <br><br> Podràs triar entre una multitud d'àrees com ara: millorar l'us del telèfon mòbil, fer més esport i millor, millorar els teus hàbits d'estudi o convertir-te en un lector habitual. 
              <br><br> A partir d'aquí, <b>BitSpace et proposarà reptes i activitats diàries</b> relacionades amb l'àrea que has escollit, ajudant-te a establir i mantenir hàbits saludables."
        image=""
        backgroundColor="#FFE4DD"
      />

      <InfoSectionRight
        title="I els Bits que fan?"
        text="Els Bits són les teves mascotes digitals, i <b>la seva felicitat depèn de tu</b>. 
              <br><br> Cada vegada que compleixis un repte o activitat que BitSpace et proposi, el teu Bit es mostrarà més feliç i saludable. 
              <br><br> Però si no compleixes els teus reptes, el teu Bit es posarà trist i malalt, reflectint la importància de cuidar-se a un mateix."
        image=""
        backgroundColor="#FFD8CF"
      />

      <InfoSectionLeft
        title="I la part de 'Space' vol dir res?"
        text="Si! Per 'Space' ens referim a l'espai on viurà el teu Bit. Ja que els Bits no viuen en un fons blanc, no, <b>viuran en una casa</b>! 
              <br><br> Aquesta casa també anirà canviant i creixent a mesura que tu vagis complint reptes i cuidant el teu Bit. 
              <br><br> Evidentment tant la casa com el bit es podran personalitzar al teu gust, creant mica en mica la teva nova forma de ser"
        image=""
        backgroundColor="#FFE4DD"
      />

      <InfoSectionJustText
        title="Imatges / Prototip"
        text="Aquí potser caldria posar imatges del prototip o alguna cosa així, no?"
        backgroundColor="#FFFFFF"
        center="true"
      /> <!--Escriure "true" és un placebo, per dir que no ho vols centrat has d'esborrar l'entrada i deixar que el valor per defecte faci la seva feina-->

      <InfoSectionRight
        title="L'Equip de BitSpace"
        text="L'equip de BitSpace està format per:
              <br><br> - Lluna Lara Valle (CEO): Enfermera 
              <br> - Jan Moran Ricardo (COO): Enginyer Electrònic de Telecomunicacions i Informàtic
              <br> - Gerard Garcia Gross (CTO): Enginyer de Sistemes de Telecomunicacions i Informàtic
              <br><br> Junts, combinem les nostres habilitats per crear una aplicació que no només sigui tecnològicament sòlida, sinó que també tingui un impacte positiu en la vida dels nostres usuaris."
        backgroundColor="#FFD8CF"
        center="true"
      />

      <!-- Potser fer un component només per aquesta part -->
      <Collaborate
        id="collaborate"
        title="Col·labora amb nosaltres!"
        backgroundColor="#FFE4DD"
        center="true"
      />
      
      <br><hr>
      <Formulario style="background-color: aliceblue;"/>
    </main>
  </div>
</template>

<script setup>
import Carousel from './medium_components/Carousel.vue';
import VideoSection from './medium_components/VideoSection.vue'
import Formulario from './Formulario.vue';
import InfoSectionLeft from './medium_components/InfoSectionLeft.vue';
import InfoSectionRight from './medium_components/InfoSectionRight.vue';
import InfoSectionJustText from './medium_components/InfoSectionJustText.vue';
import Collaborate from './medium_components/Collaborate.vue';

function scrollToCollaborate () {
  const el = document.getElementById('collaborate')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // for accessibility, move focus
    //el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }
}
</script>

<style scoped>

.home-container {
  background-color: #FFE4DD;
  min-height: 100vh;
  font-family: sans-serif;
  color: #333;
}


</style>
