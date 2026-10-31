<template>
  <section id="prototype" class="proto-section">
    <div class="proto-container">
      <div class="proto-card">
        <div class="proto-content">
          <h2 class="proto-title">{{ t('rebrand_proto_title') }}</h2>
          <p class="proto-subtitle">{{ t('rebrand_proto_subtitle') }}</p>
        </div>

        <div class="proto-action">
          <a :href="prototypeUrl" target="_blank" rel="noopener noreferrer" class="btn-proto">
            <span>{{ t('rebrand_proto_button') }}</span>
            <svg
              class="btn-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const prototypeUrl = 'https://prototype.bitspace.es'
</script>

<style scoped>
.proto-section {
  position: relative;
  padding: 2.5rem 1.5rem 2.5rem;
}

.proto-container {
  max-width: 1040px;
  margin: 0 auto;
}

.proto-card {
  background: linear-gradient(135deg, #ffffff 0%, #fdf6fa 100%);
  padding: 3.5rem;
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--border-subtle);
  box-shadow: 0 16px 40px rgba(241, 178, 195, 0.16);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
}

.proto-content {
  max-width: 580px;
}

.proto-title {
  font-family: 'Baloo 2', sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  font-weight: 800;
  line-height: 1.25;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
}

.proto-subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.proto-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.btn-proto {
  background: #ade5a8;
  color: #18181b;
  font-size: 1.05rem;
  font-weight: 800;
  padding: 1rem 2rem;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 10px 25px rgba(173, 229, 168, 0.45);
}

.btn-proto:hover {
  background: #98de92;
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(173, 229, 168, 0.6);
}

.btn-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.2s ease;
}

.btn-proto:hover .btn-icon {
  transform: translateX(4px);
}

.proto-domain {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.02em;
}

/* Responsive */
@media (max-width: 860px) {
  .proto-card {
    flex-direction: column;
    text-align: center;
    padding: 2.5rem 1.75rem;
    gap: 2rem;
  }

  .proto-content {
    max-width: 100%;
  }

  .proto-action {
    width: 100%;
  }

  .btn-proto {
    width: 100%;
    max-width: 320px;
    justify-content: center;
  }
}
</style>
