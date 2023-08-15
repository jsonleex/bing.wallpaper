import { BingImage } from "@/types/bing"
import { buildStorageKey } from "../utils/bing"

const locations = [
  "de-DE",
  "en-CA",
  "en-GB",
  "en-IN",
  "en-US",
  "fr-FR",
  "it-IT",
  "ja-JP",
  "zh-CN"
]

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as { idx: number }
  const updates: [string, BingImage][] = []

  for (const mkt of locations) {
    const images = await fetchBingImages({ n: 1, idx: Number(query.idx) || 0, mkt })

    for (const image of images) {
      updates.push([buildStorageKey(new Date(image.date), mkt), image])
    }
  }

  return updates
})
