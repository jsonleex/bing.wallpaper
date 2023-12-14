<script setup lang="ts">
import { type SupportedMkt, isSupportedMkt } from '~/utils/bing'

const locale = computed(() => {
  return useRoute().params.locale as SupportedMkt
})

watch(locale, (val) => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

  if (!isSupportedMkt(val))
    navigateTo('/')
})
</script>

<template>
  <header class="header-wrapper">
    <div class="header">
      <img src="/favicon.svg" alt="Bing" height="24">
      <b>Bing Wallpaper Archive</b>
      <MarketSwitcher :mkt="locale" />
      <a href="https://github.com/jsonleex/leex.wallpaper" target="_blank" style="margin-left: auto;font-size: 0;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
          />
        </svg>
      </a>
    </div>
  </header>
  <BImageGallery :mkt="locale" />
  <ModalContainer />
  <footer>
    <p class="copyright">
      &copy; {{ new Date().getFullYear() }} · 本站所有图片均来源于必应搜索
    </p>
  </footer>
</template>

<style scoped>
.header-wrapper {
  margin: 0 0.5rem;
  height: 40.5px;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: rgba(var(--rgb-blue) / var(--opacity-lv9));
}

.header {
  user-select: none;
  position: fixed;
  top: 0;
  left: 0.5rem;
  right: 0.5rem;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
}

.header::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: rgba(var(--background-color-rgb) / var(--opacity-lv2));
  backdrop-filter: blur(4px);
  filter: drop-shadow(1px 4px 7px var(--background-color-lv2));
}

.copyright {
  margin-left: 3px;
  opacity: 0.5;
  font-size: smaller;
  text-align: center;
}
</style>
