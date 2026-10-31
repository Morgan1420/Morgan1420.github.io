<template>
  <section id="team" class="team-section">
    <div class="team-container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">{{ t('home_team_title') }}</h2>
        <p class="section-subtitle">
          {{ t('home_team_subtitle') }}
        </p>
      </div>

      <!-- Team Members Grid -->
      <div class="team-grid">
        <div v-for="member in teamMembers" :key="member.id" class="team-card">
          <!-- Avatar + Companion Bit -->
          <div class="avatar-container">
            <div class="avatar-ring">
              <img :src="member.image" :alt="member.name" class="member-photo" loading="lazy" />
            </div>
            <img
              :src="member.bit"
              :alt="member.bitAlt"
              class="companion-bit"
              :class="member.bitClass"
            />
          </div>

          <!-- Member Info -->
          <h3 class="member-name">{{ member.name }}</h3>
          <span class="member-role">{{ member.role }}</span>

          <!-- LinkedIn CTA -->
          <a
            :href="member.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="linkedin-link"
            :aria-label="`Perfil de LinkedIn de ${member.name}`"
          >
            <svg class="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z"
              />
            </svg>
            <span>LinkedIn</span>
            <svg
              class="arrow-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import ImgJan from '@/assets/images/Equip/Jan.png'
import BitJan from '@/assets/images/Bits_Background/Bit_jan_llegint.svg'
import ImgGerard from '@/assets/images/Equip/Gerard.png'
import BitGerard from '@/assets/images/Bits_Background/Gerard_Bit_sin_fondo.svg'
import ImgLluna from '@/assets/images/Equip/anulL.png'
import BitLluna from '@/assets/images/Bits_Background/Lluna_Bit_sin_fondo.svg'

const { t } = useI18n()

const teamMembers = computed(() => [
  {
    id: 'jan',
    name: 'Jan Moran Ricardo',
    role: t('home_team_role_finance'),
    image: ImgJan,
    bit: BitJan,
    bitAlt: 'Bit de Jan',
    linkedin: 'https://www.linkedin.com/in/jan-moran/',
    bitClass: 'bit-jan',
  },
  {
    id: 'gerard',
    name: 'Gerard Garcia Gros',
    role: t('home_team_role_tech'),
    image: ImgGerard,
    bit: BitGerard,
    bitAlt: 'Bit de Gerard',
    linkedin: 'https://www.linkedin.com/in/gerard-garcia-gros/',
    bitClass: 'bit-gerard',
  },
  {
    id: 'lluna',
    name: 'Lluna Lara Valle',
    role: t('home_team_role_health'),
    image: ImgLluna,
    bit: BitLluna,
    bitAlt: 'Bit de Lluna',
    linkedin: 'https://www.linkedin.com/in/lluna-lara-valle/',
    bitClass: 'bit-lluna',
  },
])
</script>

<style scoped>
.team-section {
  position: relative;
  padding: 3rem 1.5rem 7rem;
}

.team-container {
  max-width: 1040px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header */
.section-header {
  text-align: center;
  max-width: 680px;
  margin-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: 0.85rem;
  letter-spacing: -0.01em;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Team Grid */
.team-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* Team Card */
.team-card {
  background: #ffffff;
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--border-subtle);
  padding: 3rem 1.75rem 2.25rem;
  box-shadow: 0 16px 40px rgba(241, 178, 195, 0.14);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.team-card:hover {
  transform: translateY(-8px);
  border-color: rgba(173, 229, 168, 0.9);
  box-shadow:
    0 24px 50px rgba(173, 229, 168, 0.22),
    0 12px 30px rgba(241, 178, 195, 0.2);
}

/* Avatar Frame */
.avatar-container {
  position: relative;
  width: 170px;
  height: 170px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-ring {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #ffffff;
  box-shadow: 0 10px 28px rgba(24, 24, 27, 0.1);
  background: #f8fafc;
}

.member-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Companion Bit */
.companion-bit {
  position: absolute;
  width: 96px;
  height: 96px;
  object-fit: contain;
  bottom: -10px;
  right: -16px;
  pointer-events: none;
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.15));
  animation: float-bit 4s ease-in-out infinite;
  transition: transform 0.3s ease;
}

.bit-jan {
  animation-delay: 0s;
}

.bit-gerard {
  animation-delay: 1.3s;
}

.bit-lluna {
  animation-delay: 2.6s;
}

.team-card:hover .companion-bit {
  transform: scale(1.08) translateY(-4px);
}

@keyframes float-bit {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(2deg);
  }
}

/* Member Name & Role */
.member-name {
  font-family: 'Baloo 2', sans-serif;
  font-size: 1.55rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-top: 1.75rem;
  margin-bottom: 0.35rem;
  letter-spacing: -0.01em;
}

.member-role {
  font-family: 'Baloo 2', sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  color: #1e3a1b;
  background: var(--brand-mint-subtle, #eef9ec);
  border: 1px solid rgba(173, 229, 168, 0.7);
  padding: 0.3rem 0.95rem;
  border-radius: 9999px;
  letter-spacing: 0.02em;
  margin-bottom: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* LinkedIn Link */
.linkedin-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: 9999px;
  background: #f4f4f5;
  color: #18181b;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid rgba(24, 24, 27, 0.06);
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.linkedin-icon {
  width: 17px;
  height: 17px;
  color: #0a66c2;
  transition: color 0.2s ease;
}

.arrow-icon {
  width: 14px;
  height: 14px;
  color: #71717a;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.linkedin-link:hover {
  background: #0a66c2;
  color: #ffffff;
  border-color: #0a66c2;
  transform: translateY(-2px);
}

.linkedin-link:hover .linkedin-icon,
.linkedin-link:hover .arrow-icon {
  color: #ffffff;
}

.linkedin-link:hover .arrow-icon {
  transform: translate(2px, -2px);
}

/* Responsive */
@media (max-width: 900px) {
  .team-grid {
    grid-template-columns: 1fr;
    max-width: 380px;
    margin: 0 auto;
    gap: 2.25rem;
  }

  .team-section {
    padding: 2.5rem 1.5rem 5rem;
  }
}
</style>
