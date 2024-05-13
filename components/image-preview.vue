<script setup lang="ts">
import { formatDate } from '@vueuse/core'

const isMobile = inject('isMobile', ref(false))

const route = useRoute()
const regex = /(\d{4}-\d{2}-\d{2})/

const { mkt } = useMarket()
const { previewImage, getPreviewImage, isFeching } = usePreview()

const previewDate = computed(() => {
  const date = Array.isArray(route.params.date)
    ? route.params.date[0]
    : route.params.date

  return regex.test(date) ? date : null
})

const previewDatePrev = computed(() => {
  if (!previewDate.value)
    return ''

  const c = new Date(previewDate.value)
  const d = new Date(c.setDate(c.getDate() - 1))

  if (d < new Date('2016-03-05'))
    return ''

  return formatDate(d, 'YYYY-MM-DD')
})

const previewDateNext = computed(() => {
  if (!previewDate.value)
    return ''

  const c = new Date(previewDate.value)
  const d = new Date(c.setDate(c.getDate() + 1))

  if (d > new Date())
    return ''

  return formatDate(d, 'YYYY-MM-DD')
})

watch(() => previewDate.value, async (date) => {
  if (date)
    await getPreviewImage(date)
  else
    previewImage.value = null
}, { immediate: true })

const previewUrl = computed(() => {
  if (!previewImage.value)
    return ''
  const { url } = previewImage.value

  if (!url.includes('/th?id='))
    return url

  return isMobile.value
    ? url.replace('1920x1080', '768x1280')
    : url
})

const imageMetaVisible = ref(true)

function toggleImageMetaVisible() {
  imageMetaVisible.value = !imageMetaVisible.value
}

const downloads = computed(() => {
  if (!previewImage.value)
    return []
  const { url, date } = previewImage.value
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
  <ui-dialog :visible="!!previewDate" @close="navigateTo({ params: { date: '' }, query: { mkt } })">
    <div
      class="relative grid aspect-[3/5] h-85vh w-92vw place-items-center of-hidden bg-black:12 text-white md:aspect-[16/9]"
    >
      <div class="absolute inset-0 z-1 grid grid-rows-[auto_1fr]">
        <div class="grid grid-cols-3 w-full gap-1 border-b bg-black:12 p-2 shadow backdrop-blur transition-all">
          <div class="flex items-center justify-start gap-1" />
          <div class="flex items-center justify-center gap-1">
            <span class="i-system-uicons-calendar-day" />
            <span class="text-shadow">{{ previewDate }}</span>
          </div>
          <div class="flex items-center justify-end gap-1">
            <nuxt-link class="p-1 text-xl md:hover:bg-black:12" :to="{ params: { date: '' }, query: { mkt } }">
              <div class="i-system-uicons-cross" />
            </nuxt-link>
          </div>
        </div>

        <div class="flex items-center justify-between p-2 md:p-4" @click.self="toggleImageMetaVisible">
          <nuxt-link
            v-if="previewDatePrev" :to="{ params: { date: previewDatePrev }, query: { mkt } }"
            class="border-1 p-3 text-2xl text-white shadow outline-0 backdrop-blur active:bg-black:32 md:(p-2 p-4 text-3xl hover:bg-black:12)"
          >
            <div class="i-system-uicons-arrow-left" />
          </nuxt-link>

          <nuxt-link
            v-if="previewDateNext" :to="{ params: { date: previewDateNext }, query: { mkt } }"
            class="border-1 p-3 text-2xl text-white shadow outline-0 backdrop-blur active:bg-black:32 md:(p-2 p-4 text-3xl hover:bg-black:12)"
          >
            <div class="i-system-uicons-arrow-right" />
          </nuxt-link>
        </div>
      </div>

      <template v-if="isFeching">
        <span class="i-system-uicons-loader animate-spin text-3xl" />
      </template>

      <template v-else-if="previewImage">
        <ui-image :src="previewUrl" :alt="previewImage.title" />
        <div
          class="absolute inset-x-0 z-1 z-2 transition-all"
          :class="imageMetaVisible ? 'bottom-0' : 'bottom--100%'"
        >
          <div class="border-t bg-black:24 shadow backdrop-blur">
            <section class="px-4 py-2 text-white md:(px-16 py-8)">
              <h2 class="mb-1 text-xl md:text-3xl">
                <span>{{ previewImage?.title }}</span>
                <nuxt-link
                  v-if="previewImage?.copyrightlink" class="i-logos-bing mb--3px ml-1 inline-block"
                  target="_blank" :to="previewImage?.copyrightlink" tabindex="-1" title="Search in Bing"
                />
              </h2>
              <p class="mb-1 text-sm leading-relaxed op-50">
                {{ previewImage?.copyright }}
              </p>
              <div class="grid grid-cols-3 gap-1 md:(flex flex-wrap items-center)">
                <button
                  v-for="item in downloads" :key="item.url"
                  class="[&[aria-busy]_i]:i-system-uicons-loader flex items-center gap-1 border-1 border-rose-600:70 bg-rose-600:50 p-2 text-xs outline-0 backdrop-blur [&[aria-busy]_i]:animate-spin active:bg-rose-600:70 md:(hover:bg-rose-600:80)"
                  :data-url="item.url" @click="(event) => downloadImage(item.url, item.filename, event)"
                >
                  <i class="i-system-uicons-cloud-download-alt text-4" />
                  <span>{{ item.label }}</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </template>
    </div>
  </ui-dialog>
</template>
