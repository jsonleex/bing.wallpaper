import type { BingImageMeta } from '~/types'

const isFeching = ref(false)
const previewImage = ref<BingImageMeta | null>(null)

export function usePreview() {
  const { mkt } = useMarket()
  const { getImageByKey } = useImages()

  async function getPreviewImage(date: string) {
    if (isFeching.value)
      return

    isFeching.value = true
    previewImage.value = await getImageByKey(date, mkt.value)
    isFeching.value = false
  }

  return {
    isFeching,
    previewImage,
    getPreviewImage,
  }
}
