import type { BingImageMeta } from '~/types'

export function buildStorageKey(date: Date, prefix?: string) {
  const YY = String(date.getFullYear())
  const MM = String(date.getMonth() + 1).padStart(2, '0')
  const DD = String(date.getDate()).padStart(2, '0')

  const key = `${YY}${MM}/${YY}${MM}${DD}.json`

  return prefix ? `${prefix}/${key}` : key
}

export async function getImagesFromStorage(idx: number, count: number, market: { lang: string, offset: number }) {
  const images: BingImageMeta[] = []
  const storage = useStorage<BingImageMeta>('assets/archive')

  const today = getDateWithMarketOffset(market.offset)
  const start = new Date(today.setDate(today.getDate() - idx))
  const end = new Date(today.setDate(today.getDate() - count))

  while (start.getTime() > end.getTime()) {
    const key = buildStorageKey(start, market.lang)

    if (await storage.hasItem(key))
      images.push((await storage.getItem(key))!)
    else
      console.warn(`No image find for ${key}`)

    // 递减一天
    start.setDate(start.getDate() - 1)
  }

  return images
}

export const getCachedImagesFromStorage = cachedFunction(getImagesFromStorage, {
  getKey: (idx: number, count: number, market: { lang: string, offset: number }) => [market.lang, idx, count].join('_'),
  maxAge: 1000 * 60 * 60 * 8, // 8 Hours
})

export async function getImageWithStorageKey(key: string) {
  const storage = useStorage<BingImageMeta>('assets/archive')

  if (!await storage.hasItem(key))
    return

  return await storage.getItem(key) as BingImageMeta
}

export const getCachedImageWithStorageKey = cachedFunction(getImageWithStorageKey, {
  getKey: (key: string) => key,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
})
