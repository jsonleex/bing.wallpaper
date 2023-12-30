import type { BingImageMeta } from '~/types'
import type { SupportedMarket } from '~/utils/market'
import { newDateWithMarket } from '~/utils/market'

export function generateStorageKey(date: Date, prefix?: string) {
  const YYYY = String(date.getFullYear())
  const MM = String(date.getMonth() + 1).padStart(2, '0')
  const DD = String(date.getDate()).padStart(2, '0')

  const key = `${YYYY}${MM}/${YYYY}${MM}${DD}.json`

  return prefix ? `${prefix}/${key}` : key
}

export async function getImagesFromStorage(idx: number, count: number, mkt: SupportedMarket) {
  const images: BingImageMeta[] = []
  const storage = useStorage<BingImageMeta>('assets/archive')

  const today = newDateWithMarket(mkt)
  const start = new Date(today.setDate(today.getDate() - idx))
  const end = new Date(today.setDate(today.getDate() - count))

  while (start.getTime() > end.getTime()) {
    const key = generateStorageKey(start, mkt)

    if (await storage.hasItem(key))
      images.push((await storage.getItem(key))!)
    else
      console.warn(`No image find for ${key}`)

    // 递减一天
    start.setDate(start.getDate() - 1)
  }

  return images
}

export async function getImageByStorageKey(key: string) {
  const storage = useStorage<BingImageMeta>('assets/archive')

  if (!await storage.hasItem(key))
    return

  return await storage.getItem(key) as BingImageMeta
}
