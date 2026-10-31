<template>
  <footer class="footer-wrapper">
    <div class="footer-container">
      <div class="footer-main">
        <!-- Brand & Tagline -->
        <div class="footer-brand">
          <div class="brand-header">
            <span class="brand-name">BitSpace</span>
          </div>
          <p class="brand-tagline">{{ t('rebrand_footer_tagline') }}</p>
        </div>

        <!-- Links Navigation -->
        <div class="footer-nav">
          <a href="#hero" class="footer-link" @click.prevent="scrollTo('hero')">{{
            t('rebrand_nav_home')
          }}</a>
          <a href="#showcase" class="footer-link" @click.prevent="scrollTo('showcase')">{{
            t('rebrand_nav_showcase')
          }}</a>
          <a href="#pillars" class="footer-link" @click.prevent="scrollTo('pillars')">{{
            t('rebrand_nav_pillars')
          }}</a>
          <a href="#waitlist" class="footer-link" @click.prevent="scrollTo('waitlist')">{{
            t('rebrand_nav_waitlist')
          }}</a>
          <a :href="prototypeUrl" target="_blank" rel="noopener noreferrer" class="footer-link">{{
            t('rebrand_nav_prototype')
          }}</a>
          <a href="mailto:info@bitspace.es" class="footer-link">info@bitspace.es</a>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">{{ t('rebrand_footer_copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const prototypeUrl = 'https://prototype.bitspace.es'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.footer-wrapper {
  background: #ffffff;
  border-top: 1.5px solid var(--border-subtle);
  padding: 4rem 1.5rem 2.5rem;
}

.footer-container {
  max-width: 1040px;
  margin: 0 auto;
}

.footer-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(24, 24, 27, 0.06);
  flex-wrap: wrap;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Baloo 2', sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.brand-tagline {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin: 0;
}

.footer-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-link {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--text-primary);
}

.footer-bottom {
  padding-top: 2rem;
  text-align: center;
}

.footer-copy {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0;
}

@media (max-width: 768px) {
  .footer-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .footer-nav {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.85rem;
  }
}
</style>
