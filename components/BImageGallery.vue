<script setup lang="ts">
import { BingImage } from 'types/bing';

const images = ref<BingImage[]>([])

const loading = ref(false)
const nextable = ref(true)

const mkt = ref('zh-CN')
const idx = ref(0)
const count = ref(30)

async function loadImages () {
  if (loading.value) return
  loading.value = true

  const query = {
    mkt: toValue(mkt),
    idx: toValue(idx),
    count: toValue(count),
  }

  const newImages = await $fetch('/api/list', { query })

  loading.value = false
  images.value.push(...newImages)
  nextable.value = newImages.length > 0
}

watch([mkt, count], async () => {
  idx.value = 0
  images.value = []
  await loadImages()
})

onMounted(async () => {
  await loadImages()

  useInfiniteScroll(
    document,
    async () => {
      if (loading.value || !nextable.value) return
      idx.value += count.value
      await loadImages()
    },
    { distance: 100, behavior: 'smooth' }
  )
})

</script>

<template>
  <div class="gallery">
    <template v-for="image in images">
      <BImageCard :image="image" />
    </template>
  </div>
</template>

<style scoped>
.gallery {
  --gallery-columns: 1;
  display: grid;
  gap: 1px;
  grid-auto-flow: dense;
  grid-template-columns: repeat(var(--gallery-columns), minmax(0, 1fr));
  margin: 0 auto;
  padding: 0.5px;
}

@media screen and (min-width: 768px) {
  .gallery {
    --gallery-columns: 2;
  }
}

@media screen and (min-width: 1024px) {
  .gallery {
    --gallery-columns: 3;
  }
}

@media screen and (min-width: 1280px) {
  .gallery {
    --gallery-columns: 4;
  }

  .gallery-header h1 {
    font-size: 2rem;
  }
}

@media screen and (min-width: 1440px) {
  .gallery {
    --gallery-columns: 5;
  }
}
</style>
