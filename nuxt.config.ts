import { resolve } from 'node:path'
import { cwd, env } from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    'nuxt-gtag',
    '@nuxtjs/sitemap',
    'nuxt-simple-robots',
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
    url: `${env.NUXT_SITE_URL}`,
  },

  sitemap: {
    debug: true,
    sources: ['/api/sitemap'],
    defaultSitemapsChunkSize: 1000,
  },

  robots: {
    sitemap: [
      `/sitemap.xml`,
    ],
  },

  compatibilityDate: '2024-10-10',
})
