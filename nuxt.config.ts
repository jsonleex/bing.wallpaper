import { resolve } from 'node:path'
import { cwd } from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@unocss/nuxt', 'nuxt-gtag'],
  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/base.css',
  ],
  nitro: {
    serverAssets: [{
      baseName: 'archive',
      dir: resolve(cwd(), 'archive'),
    }],
  },
  features: {
    // https://github.com/unocss/unocss/issues/3468#issuecomment-1871049463
    inlineStyles: false,
  },
  gtag: {
    id: 'G-YR2YHJVK0Q',
  },
})
