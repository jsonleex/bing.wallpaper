import { resolve } from 'node:path'
import { cwd } from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@unocss/nuxt', "nuxt-gtag"],
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
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,viewport-fit=cover' },
        { name: 'theme-color', content: 'black' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      ],
    },
  },
  gtag: {
    "id": "G-YR2YHJVK0Q"
  }
})