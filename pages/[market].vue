<script setup lang="ts">
const title = 'Bing Wallpaper Archive'
const slogan = 'Explore the world one photo at a time'

const headerRef = ref<HTMLElement>()
const loadMoreRef = ref<HTMLElement>()

const route = useRoute()

const { imageMap, loadImages, resetImages, isFetching } = useImages()
const { showPreview } = usePreview()

const market = computed({
  get() {
    return route.params.market as string
  },

  set(val: string) {
    if (!isSupportedMarket(val)) {
      console.warn(`Unsupported market: ${val}`)
      val = 'en-US'
    }
    resetImages()
    scrollTo({ y: 0 })
    navigateTo(`/${val}`)
  },
})

const { height: windowHeight, width: windowWidth } = useWindowSize()
const { y: scrollY, x: scrollX } = useWindowScroll({ behavior: 'smooth' })

const isMobile = computed(() => {
  return windowWidth.value < 730
})

provide('isMobile', isMobile)

const isBackTopVisible = computed(() => {
  return scrollY.value > windowHeight.value * 0.5
})

function scrollTo({ x = 0, y = 0 }: { x?: number, y?: number } = {}) {
  scrollX.value = x
  scrollY.value = y
}

const images = computed(() => {
  return [...imageMap.value.values()].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

async function loadMoreImages() {
  await loadImages({ idx: images.value.length, count: 30, mkt: market.value })
}

function handlePreviewChange(date: string) {
  showPreview(date)
}

useIntersectionObserver(loadMoreRef, (entries) => {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting)
      await loadMoreImages()
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col gap-1 md:gap-2">
    <header
      ref="headerRef"
      class="sticky top-0 z-10 mx-1 border-b-1 rounded-b px-4 py-2 shadow backdrop-blur md:mx-4 bg-base"
    >
      <div class="flex items-center">
        <div class="i-logos-bing mt--1 text-2xl" />
        <div class="mx-1">
          <span class="font-bold">{{ title }}</span>
          <span class="hidden sm:inline"> - {{ slogan }}</span>
        </div>

        <market-select v-model="market" />

        <div class="ml-auto" />

        <button
          v-show="isBackTopVisible" class="rounded-full p-2 text-2xl hover:bg-black:10"
          @click="() => scrollTo({ y: 0 })"
        >
          <div class="i-system-uicons-arrow-up-circle m--2px text-28px" />
        </button>

        <div class="rounded-full p-2 text-2xl hover:bg-black:10">
          <nuxt-link class="i-logos-github-icon?mask block text-inherit" target="_blank" to="https://github.com/jsonleex/leex.wallpaper" />
        </div>
      </div>
    </header>

    <main class="mx-1 flex-1 md:mx-4">
      <div v-if="images" class="grid grid-cols-2 gap-2 lg:grid-cols-5 md:grid-cols-3">
        <image-card v-for="image in images" :key="image.url" :image="image" @click="handlePreviewChange(image.date)" />
      </div>

      <div ref="loadMoreRef" class="grid place-items-center">
        <span v-show="isFetching" class="i-system-uicons-loader mt-1 animate-spin text-3xl md:mt-2" />
      </div>
    </main>

    <image-preview />

    <footer class="py-4 text-center bg-base">
      <span class="text-xs op-50">© {{ new Date().getFullYear() }} · All pictures on this site are from Bing search</span>
    </footer>
  </div>
</template>
