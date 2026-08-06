# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

BitSpace's marketing/landing website — a Vue 3 SPA (Vite) for a digital-pet health app. Deployed to `bitspace.es` (custom domain, `public/CNAME`) via GitHub Pages / Netlify (see `public/_headers`, `public/.htaccess`, `public/404.html`).

## Commands

```sh
npm run dev      # start Vite dev server (port 5173, auto-opens browser)
npm run build     # production build (vite build)
npm run preview   # preview the production build (port 4173)
npm run lint      # eslint . --fix
npm run format    # prettier --write src/
npm run deploy    # build + publish dist/ to GitHub Pages (gh-pages -d dist)
```

There is no test suite/runner configured in this project.

## Architecture

### Routing & language handling

Routing (`src/router/index.js`) is language-prefixed: every real route lives under `/:lang` (`ca`, `es`, or `en`), wrapped by `LanguageWrapper.vue`. A `beforeEnter` guard on the `/:lang` route validates the language param, syncs it into `i18n.global.locale`, calls `updateMetaTags(lang)` to rewrite `<title>`, meta description, Open Graph, Twitter Card and canonical URL tags directly on `document`, and redirects unknown languages to `/ca`. The bare `/` path redirects to `/ca`. `App.vue` also watches `route.params.lang` and mirrors it into `useI18n().locale` — locale state is kept in sync in two places (router guard + App.vue watcher), so when adding new pages, put them as children of the `/:lang` route, not as siblings.

Page-level components live in `src/components/views/*.vue` (e.g. `Hero`, `Concept`, `How`, `Areas`, `Space`, `TresMents`, `WaitingList`, `Team`, `Games`, `Collaborate`, `Footer`, `NavBar`) and are composed into `BitspaceHome.vue`, which is the actual `Home` route component. Note there are two `Footer.vue`/`Collaborate.vue`/`NavBar.vue` variants — one set under `src/components/views/` (current/"NEW") and another under `src/components/medium_components/` (legacy/"OLD", still referenced by `BitspaceHome.vue` but rendered inside a section marked `<!-- OLD -->`). Check which one a page actually renders before editing.

### i18n

All copy lives in `src/i18n.js` as a single flat `messages` object with `ca`/`es`/`en` keys (vue-i18n, `legacy: false`). Catalan (`ca`) is both the default and fallback locale. Keys are organized by page/section with comments (`// MWC section`, `// Contact Form`, etc.) — when adding UI text, add the key to all three locale blocks in the same relative position rather than creating a new locale-specific file. Some translation strings contain raw HTML (e.g. `<b>`, `<a>`) rendered via `v-html`, so `warnHtmlMessage: false` is set — keep this in mind when editing templates for their trailing `<br><br>` / anchor markup.

Component-level SEO meta title/description also exist independently in `getPageMeta()` inside `src/router/index.js` — these are separate from (but should stay consistent with) the `meta_title`/`meta_description` i18n keys in `src/i18n.js`.

### External integrations (no backend)

There is no application backend — forms POST directly to third-party services from the client, with credentials/IDs hardcoded in source:
- `ContactForm.vue` sends via the EmailJS REST API (`https://api.emailjs.com/api/v1.0/email/send`) with hardcoded `service_id`/`template_id`/`user_id`.
- `Formulario.vue` submits to a Google Apps Script web app endpoint (`SCRIPT_BASE` constant) backing a Google Sheet waitlist.

`public/_headers` (Netlify) defines the CSP — if a new external endpoint is added, `connect-src`/`script-src`/`frame-src` there need updating too.

### Assets

`src/assets/images/` is organized by feature area (`Bits_Background/`, `Crea_Tu_Bit/`, `Equip/`, `Spaces/`, `Web_icons/`, `web_images/`). Custom fonts (Baloo 2, Nunito, Press Start 2P) are self-hosted under `src/assets/fonts/` and loaded via `@font-face` in component `<style>` blocks (see `WaitingList.vue`) rather than a single global stylesheet — check for an existing `@font-face` declaration before adding a new one.

### Path alias

`@` resolves to `src/` (configured in both `vite.config.js` and `jsconfig.json`), e.g. `import x from '@/assets/...'`.

### Build

`vite.config.js` splits `vue`/`vue-router`/`vue-i18n` into a `vue-vendor` chunk and minifies with `terser`; source maps are disabled for production builds.

## Code style

Formatting is enforced by Prettier (`.prettierrc.json`: no semicolons, single quotes, 100-char print width) and linted with ESLint (`eslint.config.js`: `@eslint/js` recommended + `eslint-plugin-vue` flat/essential + `@vue/eslint-config-prettier`). Run `npm run lint` / `npm run format` before committing.
