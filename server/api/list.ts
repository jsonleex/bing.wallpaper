import type { BingImage, SupportedMkt } from '@/utils/bing'
import { buildStorageKey, getNewDateByMkt, supportedMkt } from '@/utils/bing'

async function getBingImages(idx = 0, count = 1, mkt: SupportedMkt = 'en-US') {
  if (!supportedMkt.includes(mkt)) {
    console.warn(`Unsupported mkt: ${mkt}`)
    mkt = 'en-US'
  }

  const images: BingImage[] = []
  const storage = useStorage<BingImage>('assets/archive')

  const today = getNewDateByMkt(mkt)

  // ! 注意：下面两行不能交换位置
  const start = new Date(today.setDate(today.getDate() - idx))
  const end = new Date(today.setDate(today.getDate() - count))

  while (start.getTime() > end.getTime()) {
    const key = buildStorageKey(start, mkt)

    if (await storage.hasItem(key))
      images.push((await storage.getItem(key))!)
    else
      console.warn(`No image find for ${key}`)

    // 递减一天
    start.setDate(start.getDate() - 1)
  }

  return images
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as { idx: number, count: number, mkt: string }

  const idx = Number(query.idx) || 0
  const count = Number(query.count) || 1
  const mkt = query.mkt || 'en-US'

  return await getBingImages(idx, count, mkt as SupportedMkt)
})
