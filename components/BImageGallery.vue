<script setup lang="ts">
const mkt = getMktByRoute()

const query = reactive({
  idx: 0,
  count: 30,
  mkt: mkt.code,
})

const {
  loading,
  nextable,
  images,
  loadImages,
  resetImages,
  openImagePreviewDialog,
} = useImages()

onMounted(async () => {
  resetImages()

  useInfiniteScroll(
    document,
    async () => {
      if (loading.value || !nextable.value)
        return
      await loadImages(toValue(query))
      query.idx += query.count
    },
    { distance: 100, behavior: 'smooth' },
  )
})
</script>

<template>
  <div class="gallery">
    <template v-for="(image, index) in images" :key="index">
      <BImageCard :image="image" @click="openImagePreviewDialog(index)" />
    </template>
  </div>
</template>

<style scoped>
.gallery {
  --gallery-columns: 1;
  display: grid;
  gap: 0.5rem;
  grid-auto-flow: dense;
  grid-template-columns: repeat(var(--gallery-columns), minmax(0, 1fr));
  margin: 0 auto;
  padding: 0.5rem;
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
