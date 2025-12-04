import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  base: '/',
  build: {
    // Optimizaciones para SEO y rendimiento
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Separar vendors para mejor caching
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'vue-i18n'],
        },
      },
    },
    // Reportar tamaño de chunks
    chunkSizeWarningLimit: 1000,
    // Source maps para production debugging (opcional)
    sourcemap: false,
  },
  // Server optimizations
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
  // Preview optimizations
  preview: {
    port: 4173,
    strictPort: false,
    open: true,
  },
})
