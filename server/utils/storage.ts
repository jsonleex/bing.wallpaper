import type { BingImageMeta } from '~/types'

async function getImageGroupFromStorage(group: string, mkt: string) {
  const storage = useStorage<Record<string, BingImageMeta>>('assets/archive')

  const groupkey = `${mkt}/${group}.json`
  if (!await storage.hasItem(groupkey))
    return null
  else
    return await storage.getItem(groupkey)
}

export const getCachedImageGroupWithStorageKey = cachedFunction(getImageGroupFromStorage, {
  getKey: (group: string, mkt: string) => `images_${mkt}_${group}`,
  maxAge: 1000 * 60 * 60 * 8, // 8 Hours
})

async function getImageFromStorage(date: string, mkt: string) {
  if (!/\d{8}/.test(date)) {
    console.warn(`Invalid date: ${date}`)
    return
  }

  const group = await getCachedImageGroupWithStorageKey(date.slice(0, 6), mkt)

  return group?.[date]
}

export const getCachedImageFromStorage = cachedFunction(getImageFromStorage, {
  getKey: (key: string, mkt: string) => `image_${mkt}_${key}`,
  maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
})

async function getImagesFromStorage(idx: number, count: number, market: { lang: string, offset: number }) {
  const images: BingImageMeta[] = []

  const today = getDateWithMarketOffset(market.offset)
  const start = new Date(today.setDate(today.getDate() - idx))
  const end = new Date(today.setDate(today.getDate() - count))

  while (start.getTime() > end.getTime()) {
    const key = [
      String(start.getFullYear()),
      String(start.getMonth() + 1).padStart(2, '0'),
      String(start.getDate()).padStart(2, '0')
    ].join("")

    const image = await getCachedImageFromStorage(key, market.lang)

    if (image)
      images.push(image)
    else
      console.warn(`No image find for ${key}`)

    // 递减一天
    start.setDate(start.getDate() - 1)
  }

  return images
}

export const getCachedImagesFromStorage = cachedFunction(getImagesFromStorage, {
  getKey: (idx, count, market) => `images_${market.lang}_${idx}_${count}`,
  maxAge: 1000 * 60 * 60 * 8, // 8 hours
})