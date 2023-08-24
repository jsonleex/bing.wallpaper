import { BingImage, buildStorageKey, fetchBingImages, supportedMkt } from "@/utils/bing"

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as { idx: number }
  const updates: [string, BingImage][] = []

  for (const mkt of supportedMkt) {
    const images = await fetchBingImages({ n: 1, idx: Number(query.idx) || 0, mkt })

    for (const image of images) {
      updates.push([buildStorageKey(new Date(image.date), mkt), image])
    }
  }

  return updates
})
