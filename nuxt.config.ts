import { resolve } from 'node:path'
import { cwd } from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    'nuxt-gtag',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],
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
  gtag: {
    id: 'G-YR2YHJVK0Q',
  },
  site: {
    url: 'https://wallpaper.leex.me',
  },
  robots: {
    rules: {
      UserAgent: '*',
      Disallow: '/',
      Sitemap: `https://wallpaper.leex.me/sitemap.xml`,
    },
  },
})
