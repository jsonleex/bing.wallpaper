import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt'
  ],
  devtools: { enabled: true },
  nitro: {
    serverAssets: [{
      baseName: 'archive',
      dir: resolve(process.cwd(), 'archive'),
    }]
  }
})
