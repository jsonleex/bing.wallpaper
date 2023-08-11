<script setup lang="ts">
const ResolutionMap = {
  '360p': "480x360",
  '720p': "1280x720",
  '1080p': "1920x1080",
  '4k': "UHD" // 3840x2160
} as const

type Resolution = keyof typeof ResolutionMap

defineProps({
  url: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: false
  },
  w: {
    type: Number,
    required: false
  },
  h: {
    type: Number,
    required: false
  },
  r: {
    type: String as PropType<Resolution>,
    default: '1080p'
  },
  prefix: {
    type: String,
    default: 'https://www.bing.com'
  }
})

// TODO: computed url with resolution
</script>

<template>
  <img :src="`${url}&qlt=30`" :alt="alt" />
</template>
