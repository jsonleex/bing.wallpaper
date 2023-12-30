<script setup lang="ts">
const { getImageByDate } = useImages()
const { previewDate, previewVisible, hidePreview, showNextImage, showPreviousImage } = usePreview()

const evaluating = ref(false)
const image = computedAsync(() => getImageByDate(previewDate.value), null, { evaluating })

const downloads = computed(() => {
  if (!image.value)
    return []

  const { url, date } = image.value
  const filename = `bing-${date}-1920x1080.jpg`

  if (url.includes('/th?id=')) {
    return [
      { label: '4k·UHD', url: url.replace('1920x1080', 'UHD'), filename: filename.replace('1920x1080', '4k_UHD') },
      { label: '1920x1200', url: url.replace('1920x1080', '1920x1200'), filename: filename.replace('1920x1080', '1920x1200') },
      { label: '1920x1080', url, filename },
      { label: '1366x768', url: url.replace('1920x1080', '1366x768'), filename: filename.replace('1920x1080', '1366x768') },
      { label: '1024x768', url: url.replace('1920x1080', '1024x768'), filename: filename.replace('1920x1080', '1024x768') },
      { label: '768x1280', url: url.replace('1920x1080', '768x1280'), filename: filename.replace('1920x1080', '768x1280') },
    ]
  }
  else {
    return [
      { label: '1920x1080', url, filename },
    ]
  }
})

function isSameOrigin(url: string) {
  return new URL(url).origin === window.location.origin
}

function downloadFile(url: string, filename: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
}

async function downloadImage(url: string, filename: string, event: MouseEvent) {
  const button = event.currentTarget as HTMLButtonElement
  button.disabled = true
  button.setAttribute('aria-busy', 'true')
  if (isSameOrigin(url)) {
    downloadFile(url, filename)
  }
  else {
    const response = await fetch(url)
    const blob = await response.blob()
    downloadFile(URL.createObjectURL(blob), filename)
  }
  button.disabled = false
  button.removeAttribute('aria-busy')
}
</script>

<template>
  <ui-dialog v-model="previewVisible" @close="hidePreview">
    <div class="relative grid w-90vw place-items-center">
      <span v-if="evaluating" class="i-system-uicons-loader animate-spin text-3xl" />

      <template v-else-if="image">
        <ui-image :src="image.url" :alt="image.title" class="aspect-[16/9]" />

        <div class="w-full border-t bg-black:24 px-4 py-2 text-white backdrop-blur md:(absolute bottom-0 z-1 px-16 py-8)">
          <h2 class="mb-1 text-xl md:text-3xl">
            <span>{{ image.title }}</span>
            <nuxt-link
              v-if="image.copyrightlink" class="i-logos-bing mb--3px ml-1 inline-block" target="_blank"
              :to="image.copyrightlink" tabindex="-1" title="Search in Bing"
            />
          </h2>
          <p class="mb-1 text-sm leading-relaxed op-50">
            {{ image.copyright }}
          </p>
          <div class="grid grid-cols-3 gap-1 md:(flex flex-wrap items-center)">
            <button
              v-for="item in downloads" :key="item.url"
              class="[&[aria-busy]_i]:i-system-uicons-loader flex items-center gap-1 bg-black:24 p-2 text-white:60 outline-0 backdrop-blur [&&[aria-busy]_i]:(animate-spin) active:bg-black:32 md:(hover:bg-black:12)"
              :data-url="item.url" @click="(event) => downloadImage(item.url, item.filename, event)"
            >
              <i class="i-system-uicons-box-download" />
              <span class="text-sm">{{ item.label }}</span>
            </button>
          </div>
        </div>

        <div
          class="mt-1px w-full flex items-center gap-1px md:(absolute top-1/2 z-1 justify-between px-4 -translate-y-1/2)"
        >
          <button
            class="flex flex-1 items-center justify-center bg-black:24 px-6 py-3 text-3xl text-white outline-0 backdrop-blur md:(flex-none border-1 rounded p-4 shadow hover:bg-black:12) active:bg-black:32"
            tabindex="-1" @click="showPreviousImage"
          >
            <div class="i-system-uicons-arrow-left" />
          </button>
          <button
            class="flex flex-1 items-center justify-center bg-black:24 px-6 py-3 text-3xl text-white outline-0 backdrop-blur md:(flex-none border-1 rounded p-4 shadow hover:bg-black:12) active:bg-black:32"
            tabindex="-1" @click="showNextImage"
          >
            <div class="i-system-uicons-arrow-right" />
          </button>
        </div>
      </template>

      <div v-else class="py-16">
        <span>Sorry, The image not found for Date {{ previewDate }}.</span>
      </div>
    </div>
  </ui-dialog>
</template>
