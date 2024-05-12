<script setup lang="ts">
const { mkt } = useMarket()

const loadMoreRef = ref<HTMLElement>()
const { isFetching, imageMap, loadImages, resetImages } = useImages()

const images = computed(() => {
  return [...imageMap.value.values()].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

await loadImages({ idx: 0, count: 30, mkt: mkt.value })

onMounted(async () => {
  useIntersectionObserver(loadMoreRef, (entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting)
        await loadImages({ idx: images.value.length, count: 30, mkt: mkt.value })
    })
  })
})

watch(() => mkt.value, resetImages)
</script>

<template>
  <section class="mx-1 flex-1 md:mx-4">
    <div class="grid grid-cols-2 gap-2 lg:grid-cols-5 md:grid-cols-3">
      <nuxt-link v-for="image in images" :key="image.url" :to="{ params: { date: image.date }, query: { mkt } }">
        <image-card :image="image" />
      </nuxt-link>
    </div>
    <div ref="loadMoreRef" class="grid place-items-center">
      <span v-show="isFetching" class="i-system-uicons-loader mt-1 animate-spin text-3xl md:mt-2" />
    </div>
  </section>
</template>
