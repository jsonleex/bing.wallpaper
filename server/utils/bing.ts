import { BingImage, BingImageQuery } from "@/types/bing"

interface BingImageRaw {
  startdate: string,
  fullstartdate: string,
  enddate: string,
  url: string,
  urlbase: string,
  copyright: string,
  copyrightlink: string,
  title: string,
  hsh: string,
}

const imagePrefixUrl = 'https://www.bing.com'

export async function fetchBingImages (query: BingImageQuery) {
  try {
    const res = await $fetch<{ images: BingImageRaw[] }>(
      `HPImageArchive.aspx`,
      {
        query: { ...query, format: 'js' },
        baseURL: imagePrefixUrl.replace('www', 'global'),
      }
    )

    return (res.images ?? []).map((image): BingImage => ({
      url: imagePrefixUrl + image.url.replace('&rf=LaDigue_1920x1080.jpg&pid=hp', ''),
      date: image.enddate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
      title: image.title,
      copyright: image.copyright,
      copyrightlink: image.copyrightlink
    }))
  } catch (error) {
    console.error(`Fetch Bing image error: ${error}`)
    return []
  }
}

export function buildStorageKey (date: Date, prefix?: string) {
  const YYYY = String(date.getFullYear())
  const MM = String(date.getMonth() + 1).padStart(2, '0')
  const DD = String(date.getDate()).padStart(2, '0')
  const key = `${YYYY}${MM}/${YYYY}${MM}${DD}.json`
  return prefix ? `${prefix}/${key}` : key
}
