<template>
  <div class="home-layout">
    <!-- Navigation -->
    <BitspaceNavBar />

    <!-- Main Content -->
    <main role="main" class="main-content">
      <!-- 1. Hero with logo.riv & Immediate Conversion CTAs -->
      <HeroSection />

      <!-- 2. Showcase Video showing Bit in Isometric Room -->
      <ShowcaseSection />

      <!-- 3. Clean Habit Pillars (Detox, Fitness, Reading, Focus) without emojis -->
      <PillarsSection />

      <!-- 4. Prototype Callout pointing to https://prototype.bitspace.es -->
      <PrototypeSection />

      <!-- 4.5. DevBlog YouTube Series Callout -->
      <DevblogSection />

      <!-- 5. Core Lead Capture: Waitlist connected to Google Apps Script -->
      <WaitlistSection />

      <!-- 6. Our Team with photos and companion Bits -->
      <TeamSection />

      <!-- 7. Educational Resources, Guides & Comparisons -->
      <ResourcesSection />
    </main>

    <!-- Footer -->
    <BitspaceFooter />
  </div>
</template>

<script setup>
import BitspaceNavBar from '@/components/views/BitspaceNavBar.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ShowcaseSection from '@/components/sections/ShowcaseSection.vue'
import PillarsSection from '@/components/sections/PillarsSection.vue'
import PrototypeSection from '@/components/sections/PrototypeSection.vue'
import DevblogSection from '@/components/sections/DevblogSection.vue'
import WaitlistSection from '@/components/sections/WaitlistSection.vue'
import TeamSection from '@/components/sections/TeamSection.vue'
import ResourcesSection from '@/components/sections/ResourcesSection.vue'
import BitspaceFooter from '@/components/views/BitspaceFooter.vue'
</script>

<style scoped>
.home-layout {
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: clip;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
}
</style>
