<script>
export default {
  name: 'Collaborate-section'
}
</script>

<template>
  <div class="container" :style="{ backgroundColor: backgroundColor }">
    <h2>{{ t('collaborate_title') }}</h2>
    <div class="text-content" v-html="t('collaborate_text_1')"></div>
    <div class="text-content" v-html="t('collaborate_text_2')"></div>
    <div class="text-content" v-html="t('collaborate_text_3')"></div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  backgroundColor: {
    type: String,
    default: '#FFFFFF'
  },
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 4rem 2rem;
}


h2 {
  margin-top: 1rem;
  font-size: 2.5rem;
}
p {
  font-size: 1.4rem;
  line-height: 1.6;
}

.text-content {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.roles-buttons {
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-direction: row;
  gap: 5rem;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
}
@media (max-width: 768px) {
  .container {
    padding: 2rem 1rem;
    flex-direction: column;
  }
  h2 {
    font-size: 2rem;
  }
}
</style>