<template>
  <div class="btn"> {{ buttonText }} </div>
</template>

<script setup>

defineOptions({ name: 'FancyButton' })

const props = defineProps({
  buttonText: {
    type: String,
    required: true
  }
})
</script>

<style scoped>



.btn {
  -webkit-appearance: none;

  padding: 0.6rem 1rem;
  width: 70%;
  max-width: 340px;
  height: 40px;

  appearance: none;
  background: #ffbbac; /* Bluish color */
  
  border: none;
  border-radius: 10px;

  color: #0a0a0a;
  font-weight: 600;
  align-content: center;

  cursor: pointer;
  
  box-shadow: 0 6px 12px rgba(255,111,97,0.18);
  transition: transform .12s ease, box-shadow .12s ease, opacity .12s ease;
}

@keyframes pulse-btn {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
}

.btn {
  animation: pulse-btn 2.2s ease-in-out infinite;
}
.btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(255,111,97,0.18); }
.btn:active { transform: translateY(0); opacity: .95 }
.btn:focus { outline: 3px solid rgba(255,138,128,0.22); outline-offset: 2px }

@media (max-width: 768px) {
  .btn {
    max-width: 280px;
  }
}
</style>