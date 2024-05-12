import { resolve } from 'node:path'
import { cwd, env } from 'node:process'
import { allMkt } from './config/market'

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
    cacheMaxAgeSeconds: 60 * 60 * 8, // 8 Hours
    sitemaps: allMkt.reduce(
      (acc, mkt) => {
        acc[mkt] = { sources: [`/api/__sitemap__/urls?mkt=${mkt}`] }
        return acc
      },
      {} as Record<string, { sources: string[] }>,
    ),
  },
  robots: {
    sitemap: [
      `/sitemap_index.xml`,
    ],
  },
})
