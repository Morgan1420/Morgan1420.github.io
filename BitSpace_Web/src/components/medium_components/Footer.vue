<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-logo">
        <img src="@/assets/logoBit.ico" alt="BitSpace Logo" />
        <span>{{ t('footer_logo_text') }}</span>
      </div>
      <div class="footer-contact">
        <p>{{ t('footer_contact_title') }}</p>
        <a href="mailto:info@bitspace.es">info@bitspace.es</a>
      </div>
      <div class="footer-social">
        <p>{{ t('footer_social_title') }}</p>
        <a href="https://linkedin.com/company/bitspace-digital-health" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="img" aria-labelledby="linkedin-title">
            <title id="linkedin-title">LinkedIn</title>
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 BitSpace. {{ t('footer_rights') }}</p>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<script>
export default {
  name: 'SiteFooter'
}
</script>

<style scoped>
.site-footer {
  background-color: #3c3c3c;
  color: #f0f0f0;
  padding: 2.5rem 1.5rem;
  font-family: sans-serif;
  border-top: 4px solid #E57373;
}

.footer-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  gap: 1.5rem;
}

.footer-logo, .footer-contact, .footer-social {
  text-align: center;
  flex: 1;
  min-width: 200px;
}

.footer-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.footer-logo img {
  width: 40px;
  height: 40px;
}

.footer-contact p, .footer-social p {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: bold;
}

.footer-contact a, .footer-social a {
  color: #f0f0f0;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-contact a:hover, .footer-social a:hover {
  color: #E57373;
}

.footer-social svg {
  transition: transform 0.3s ease;
}

.footer-social a:hover svg {
  transform: scale(1.1);
}

.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #555;
  font-size: 0.9rem;
  color: #aaa;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
