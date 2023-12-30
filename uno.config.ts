import { defineConfig, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  shortcuts: [
    ['bg-base', 'bg-white:87 dark:bg-black:64'],
    ['bg-dim', 'bg-zinc-900:60 dark:bg-black:10'],
    ['p-safe-area', 'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]'],
  ],
  presets: [
    presetUno({ dark: 'media' }),
    presetIcons(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
