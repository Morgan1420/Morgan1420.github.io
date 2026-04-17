<template>
  <section id="spaces" ref="spacesRoot" :style="sectionStyle">
    <div class="spaces-bg"></div>
    <div class="section-inner">


      <div class="spaces-grid">
        <div class="space-info animate-on-scroll">
          <div class="section-header animate-on-scroll">
            <div class="section-badge"><b>✦</b> The Space <b>✦</b></div>
            <h2 class="section-title">El teu refugi digital</h2>
            <p class="section-subtitle">
              Un entorn isomètric 3D completament personalitzable. El teu Space és el teu dashboard visual i la
              llar del teu Bit.
            </p>
          </div>
          <div class="room-select">
            <button v-for="(room, index) in rooms" :key="room.name" type="button" class="room-button"
              :class="{ active: selectedRoomIndex === index }" :aria-pressed="selectedRoomIndex === index"
              @click="selectedRoomIndex = index">
              <span class="room-button-label">{{ room.label }}</span>
              <span class="room-button-subtitle">{{ room.caption }}</span>
            </button>
          </div>
        </div>

        <div class="space-visuals animate-on-scroll">
          <div class="space-image-shell">
            <img class="space-image" :src="currentRoom.image" :alt="currentRoom.alt" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import cozyRoom from '@/assets/images/Spaces/cozyRoom.png'
import cyberRoom from '@/assets/images/Spaces/cyberRoom.png'
import natureRoom from '@/assets/images/Spaces/natureRoom.png'
import japaneseRoom from '@/assets/images/Spaces/japaneseRoom.png'

const spacesRoot = ref(null)
const selectedRoomIndex = ref(0)
let observer

const rooms = [
  {
    name: 'cozy',
    label: 'Cozy room',
    caption: 'Pastel i calma',
    alt: 'Cozy room de BitSpace',
    titleColor: 'var(--text-dark)',
    subtitleColor: 'var(--text-mid)',
    image: cozyRoom,
    background: 'linear-gradient(160deg, var(--lavender) 0%, var(--pink-soft) 48%, var(--cream) 100%)',
    accent: 'var(--purple-deep)',
  },
  {
    name: 'cyber',
    label: 'Cyber room',
    caption: 'Neó i energia',
    alt: 'Cyber room de BitSpace',
    titleColor: 'var(--white)',
    subtitleColor: 'rgba(255, 255, 255, 0.85)',
    image: cyberRoom,
    background: 'linear-gradient(160deg, var(--navy) 0%, var(--navy-mid) 50%, var(--navy) 100%)',
    accent: 'var(--navy)',
  },
  {
    name: 'nature',
    label: 'Nature room',
    caption: 'Verd i aire',
    alt: 'Nature room de BitSpace',
    titleColor: 'var(--text-dark)',
    subtitleColor: 'var(--text-mid)',
    image: natureRoom,
    background: 'linear-gradient(160deg, var(--green) 0%, var(--mint) 50%, var(--green) 100%)',
    accent: '#10b981',
  },
  {
    name: 'japanese',
    label: 'Japanese room',
    caption: 'Suau i serè',
    alt: 'Japanese room de BitSpace',
    titleColor: 'var(--text-dark)',
    subtitleColor: 'var(--text-mid)',
    image: japaneseRoom,
    background: 'linear-gradient(160deg, var(--gold) 0%, var(--gold-light) 48%, var(--gold) 100%)',
    accent: 'var(--purple-deep)',
  },
]

const currentRoom = computed(() => rooms[selectedRoomIndex.value])

const sectionStyle = computed(() => ({
  '--spaces-bg-start': currentRoom.value.background,
  '--spaces-accent': currentRoom.value.accent,
  '--spaces-title-color': currentRoom.value.titleColor,
  '--spaces-subtitle-color': currentRoom.value.subtitleColor,
}))

onMounted(() => {
  if (!spacesRoot.value || !('IntersectionObserver' in window)) {
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 },
  )

  spacesRoot.value.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element)
  })
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
#spaces {
  position: relative;
  overflow: hidden;
  padding: 6rem 2rem;
  background: var(--spaces-bg-start, linear-gradient(160deg, var(--pink-soft) 0%, var(--cream) 52%, var(--lavender) 100%));
  color: var(--text-dark);
  font-family: 'Nunito', sans-serif;
  transition: background 0.35s ease, color 0.35s ease;
}

.spaces-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.24) 0%, transparent 52%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.14) 0%, transparent 48%);
  pointer-events: none;
}

.section-inner {
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.section-header {
  margin-bottom: 4rem;
}

.text-center {
  text-align: center;
}

.text-center .section-subtitle {
  margin: 0 auto;
}

.section-badge {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6rem;
  color: var(--spaces-accent, var(--purple-deep));
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.8);
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.section-badge b {
  font-size: 1rem;
}

.section-title {
  font-family: 'Baloo 2', cursive;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: var(--spaces-title-color, var(--text-dark));
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.05rem;
  color: var(--spaces-subtitle-color, var(--text-mid));
  max-width: 620px;
  font-weight: 500;
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: none;
}

.spaces-grid {
  display: flex;
  flex-direction: row;
  gap: 10rem;
  margin-top: 1rem;
  align-items: stretch;
  justify-content: space-around;
}

.space-info,
.space-visuals {
  max-height: 500px;
  max-width: 500px;
  border-radius: var(--radius-xl);
}

.space-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0;
}

.room-select {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.room-button {
  appearance: none;
  border: 1.5px solid rgba(91, 74, 114, 0.14);
  background: rgba(255, 255, 255, 0.72);
  border-radius: 1.25rem;
  padding: 1rem 1rem 0.95rem;
  text-align: left;
  cursor: pointer;
  box-shadow: var(--shadow-card);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease;
}

.room-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(45, 27, 78, 0.12);
}

.room-button.active {
  border-color: var(--spaces-accent, var(--purple-deep));
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2), 0 14px 34px rgba(45, 27, 78, 0.16);
  transform: translateY(-2px);
}

.room-button-label {
  display: block;
  font-family: 'Baloo 2', cursive;
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-dark);
}

.room-button-subtitle {
  display: block;
  margin-top: 0.2rem;
  font-size: 0.8rem;
  color: var(--text-mid);
}

.space-visuals {
  display: flex;
  align-items: center;
  justify-content: center;
}

.space-image-shell {
  width: 100%;
  height: 100%;
  min-height: 540px;
  border-radius: calc(var(--radius-xl) + 0.25rem);
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
}

.space-image {
  width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 18px 30px rgba(45, 27, 78, 0.12));
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.space-image-shell:hover .space-image {
  transform: scale(1.01);
}

.space-card {
  border-radius: var(--radius-xl);
  overflow: hidden;
  position: relative;
  transition: transform 0.3s;
}

.space-card:hover {
  transform: translateY(-8px);
}

@media (max-width: 900px) {
  #spaces {
    padding: 4rem 1.5rem;
  }

  .spaces-grid {
    grid-template-columns: 1fr;
  }

  .space-info,
  .space-visuals,
  .space-image-shell {
    min-height: 420px;
  }
}

@media (max-width: 640px) {
  .room-select {
    grid-template-columns: 1fr;
  }
}
</style>
