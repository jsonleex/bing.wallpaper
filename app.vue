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
  <NuxtPage />
</template>

<style>
:root {
  --rgb-dark: 0 0 0;
  --rgb-blue: 0 164 239;
  --rgb-green: 127, 186, 0;
  --rgb-white: 255 255 255;
}

:root {
  --opacity-lv0: 0.00;
  --opacity-lv1: 0.12;
  --opacity-lv2: 0.24;
  --opacity-lv3: 0.36;
  --opacity-lv4: 0.48;
  --opacity-lv5: 0.6;
  --opacity-lv6: 0.72;
  --opacity-lv7: 0.84;
  --opacity-lv8: 0.96;
  --opacity-lv9: 1.00;

  --divider-color-rgb: var(--rgb-dark);
  --background-color-rgb: var(--rgb-white);
}

@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    --divider-color-rgb: var(--rgb-white);
    --background-color-rgb: var(--rgb-dark);
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
  min-height: 100vh;
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

a {
  color: inherit;
}
</style>
