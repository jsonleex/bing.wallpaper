import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt'
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  },
  nitro: {
    serverAssets: [{
      baseName: 'archive',
      dir: resolve(process.cwd(), 'archive'),
    }]
  }
})
