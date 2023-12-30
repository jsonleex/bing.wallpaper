<script setup lang="ts">
import type { BingImageMeta } from '~/types'

const props = defineProps<{ image: BingImageMeta }>()

const thumbnail = computed(() => {
  const { url } = props.image
  return url.includes('/th?id=') ? `${url}&w=480&h=270` : url
})
</script>

<template>
  <div
    class="group relative of-hidden rounded bg-black:50 transition-all md:hover:(z-1 scale-105 ring-3 ring-rose-600:90)"
  >
    <ui-image :src="thumbnail" :alt="image.title" class="aspect-[16/9] cursor-zoom-in" />

    <div class="transition md:(op-0 group-hover:op-100)">
      <div class="absolute top-0 rounded-br rounded-tl bg-black:50 p-1">
        <span class="text-sm text-white leading-none text-shadow">{{ image.date }}</span>
      </div>
      <div class="absolute bottom-0 w-full bg-black:50 p-1 backdrop-blur">
        <span class="text-sm text-white leading-relaxed text-shadow">{{ image.title }}</span>
      </div>
    </div>
  </div>
</template>
