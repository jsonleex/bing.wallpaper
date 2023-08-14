<script setup lang="ts">
useHead({
  title: 'Bing Wallpaper Archive',
  meta: [
    { name: 'description', content: 'The Bing Wallpaper Archive.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  ]
})
</script>

<template>
  <BImageGallery />
  <ModalContainer />
  <footer>
    <p class="copyright">&copy; {{ new Date().getFullYear() }} · 本站所有图片均来源于必应搜索</p>
  </footer>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}

body {
  margin: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}

img {
  max-width: 100%;
  object-fit: cover;
}

button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-weight: 400;
  line-height: 1.5715;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
  background: transparent;
  border: 1px solid transparent;
  transition: all .1s cubic-bezier(0, 0, 1, 1);
  appearance: none;
  user-select: none;
}

.copyright {
  margin-left: 3px;
  opacity: 0.5;
  font-size: smaller;
  text-align: center;
}
</style>
