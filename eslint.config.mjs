import defineConfig from '@antfu/eslint-config'

export default defineConfig({
  formatters: true,
  unocss: true,
  ignores: [
    'archive/**',
  ],
})
