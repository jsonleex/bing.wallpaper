import type { BingImageMeta } from '~/types'
import { allMkt } from '~/config/market'

interface BingApiQuery {
  n: number
  idx: number
  mkt: string
}

interface BingImageRaw {
  // startdate: string
  // fullstartdate: string
  enddate: string
  url: string
  urlbase: string
  copyright: string
  copyrightlink: string
  title: string
  // hsh: string
}

async function fetchImagesFromBingApi(query: BingApiQuery) {
  try {
    const res = await $fetch<{ images: BingImageRaw[] }>(
      `HPImageArchive.aspx`,
      {
        method: 'GET',
        query: { ...query, format: 'js' },
        baseURL: 'https://global.bing.com',
      },
    )

    return (res.images ?? []).map((image): BingImageMeta => ({
      url: `https://www.bing.com${image.url.replace('&rf=LaDigue_1920x1080.jpg&pid=hp', '')}`,
      date: image.enddate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
      title: image.title,
      copyright: image.copyright,
      copyrightlink: image.copyrightlink,
    }))
  }
  catch (error) {
    console.warn(`Fetch Bing image error: ${error}`)
    return []
  }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as { idx: number }
  const updates: [string, BingImageMeta][] = []

  for (const mkt of allMkt) {
    const images = await fetchImagesFromBingApi({ n: 1, idx: Number(query.idx) || 0, mkt })

    for (const image of images)
      updates.push([buildStorageKey(new Date(image.date), mkt), image])
  }

  return updates
})
