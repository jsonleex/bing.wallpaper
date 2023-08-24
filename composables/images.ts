import { BingImage, SupportedMkt } from "@/utils/bing";

const store = reactive({
  loading: false,
  nextable: true,
  images: [] as BingImage[],
})

async function loadImages (query: { idx: number, count: number, mkt: SupportedMkt }) {
  if (store.loading || !store.nextable) {
    return
  }

  const images = await $fetch('/api/list', { query })
  store.images.push(...images)
  store.nextable = images.length > 0
}

function resetImages () {
  store.images = []
  store.nextable = true
  store.loading = false
}

export function useImages () {
  return {
    ...toRefs(store),

    loadImages,
    resetImages,

    isImagePreviewOpen: toRef(() => preview.isImagePreviewOpen),
    openImagePreviewDialog,
    closeImagePreviewDialog,
  }
}

const preview = reactive({
  index: 0,
  isImagePreviewOpen: false,
})

function openImagePreviewDialog (index: number = 0) {
  preview.index = index
  preview.isImagePreviewOpen = true
}

function closeImagePreviewDialog () {
  preview.isImagePreviewOpen = false
}

export function useImagePreview () {
  const image = computed(() => store.images[preview.index])
  const preable = computed(() => preview.index > 0)
  const nextable = computed(() => preview.index < store.images.length - 1)
  return {
    ...toRefs(preview),
    image,
    preable,
    nextable,
    openImagePreviewDialog,
    closeImagePreviewDialog
  }
}

async function downloadImage (url: string, filename = 'bing_image.jpg') {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.download = filename
  a.click()
}

const ResolutionMap = {
  '360p': "480x360",
  '720p': "1280x720",
  '1080p': "1920x1080",
  '4k': "UHD" // 3840x2160
} as const

type Resolution = keyof typeof ResolutionMap

function buildBingImageUrl (url: string, resolution: Resolution) {
  if (!url.includes('bing.com/')) {
    return url
  }

  switch (resolution) {
    case '360p':
      return url.replace('1920x1080', '480x360')
    case '720p':
      return url.replace('1920x1080', '1280x720')
    case '1080p':
      return url
    case '4k':
      return url.replace('1920x1080', 'UHD')
    default:
      return url
  }
}

export function useImageDownloader (_url: MaybeRefOrGetter<string>, resolution: Resolution = '1080p') {
  const state = reactive({
    url: '',
    filename: '',
    supported: true
  })

  watchEffect(() => {
    const url = toValue(_url)

    if (!url.includes('bing.com') && resolution !== '1080p') {
      state.supported = false
    } else {
      state.url = buildBingImageUrl(url, resolution)
      state.filename = url.split('/').pop() ?? 'bing_image.jpg'
    }
  })

  const downloading = ref(false)
  const disabled = computed(() => !state.supported || downloading.value)

  const download = async () => {
    if (disabled.value) {
      return
    }
    downloading.value = true
    await downloadImage(state.url, state.filename)
    downloading.value = false
  }

  return { disabled, downloading, download }
}
