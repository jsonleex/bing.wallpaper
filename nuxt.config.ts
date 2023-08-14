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
    storage: {
      archive: {
        driver: 'github',
        token: process.env.GITHUB_TOKEN,
        repo: 'jsonleex/leex.wallpaper',
        dir: 'archive',
      }
    },
    devStorage: {
      archive: {
        driver: 'fs',
        base: resolve(process.cwd(), 'archive'),
      }
    }
  }
})
