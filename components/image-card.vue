<script setup lang="ts">
import type { BingImageMeta } from '~/types'

const props = defineProps<{ image: BingImageMeta }>()
const route = useRoute()
const isMobile = inject('isMobile', ref(false))

const thumbnail = computed(() => {
  const { url } = props.image
  return url.includes('/th?id=')
    ? isMobile.value
      ? url.replace('1920x1080', '768x1280')
      : `${url}&w=480&h=270`
    : url
})
</script>

<template>
  <nuxt-link
    :to="{ params: { market: route.params.market, date: image.date } }"
    class="group relative of-hidden rounded bg-black:12 transition-all md:hover:(z-1 scale-105 ring-3 ring-rose-600:90)"
  >
    <ui-image :src="thumbnail" :alt="image.title" class="aspect-[3/5] cursor-zoom-in md:aspect-[16/9]" />

    <div class="transition md:(op-0 group-hover:op-100)">
      <div class="absolute top-0 rounded-br rounded-tl bg-black:12 p-1 backdrop-blur">
        <span class="text-sm text-white leading-none text-shadow">{{ image.date }}</span>
      </div>
      <div class="absolute bottom-0 rounded-t bg-black:12 p-1 backdrop-blur">
        <span class="text-sm text-white leading-relaxed text-shadow">{{ image.title }}</span>
      </div>
    </div>
  </nuxt-link>
</template>
