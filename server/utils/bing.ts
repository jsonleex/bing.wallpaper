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

export const supportedMkt = [
  "de-DE",
  "en-CA",
  "en-GB",
  "en-IN",
  "en-US",
  "fr-FR",
  "it-IT",
  "ja-JP",
  "zh-CN",
] as const

export type SupportedMkt = typeof supportedMkt[number]

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

/**
 * 各语言环境下的时间偏移量，单位：小时
 */
const timeOffsetByMkt: Record<SupportedMkt, number> = {
  'en-CA': -4, // America/Toronto 加拿大
  'en-US': -4, // America/New_York 美国
  'en-IN': +5, // Asia/Kolkata 印度
  'en-GB': +1, // Europe/London 英国
  'de-DE': +2, // Europe/Berlin 德国
  'fr-FR': +2, // Europe/Paris 法国
  'it-IT': +2, // Europe/Rome 意大利
  'ja-JP': +9, // Asia/Tokyo 日本
  'zh-CN': +8, // Asia/Shanghai 中国
}

// 当前运行环境的时间偏移量，单位：分钟
const SYSTEM_TIMEZONE_OFFSET = new Date().getTimezoneOffset()

export function getNewDateByMkt (mkt: SupportedMkt) {
  const offset = (timeOffsetByMkt[mkt] * 60 + SYSTEM_TIMEZONE_OFFSET) * 60 * 1000
  return new Date(Date.now() + offset)
}
