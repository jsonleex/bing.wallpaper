export const supportedMarkets = [
  'de-DE',
  'en-CA',
  'en-GB',
  'en-IN',
  'en-US',
  'fr-FR',
  'it-IT',
  'ja-JP',
  'zh-CN',
] as const

export type SupportedMarket = typeof supportedMarkets[number]

export function isSupportedMarket(market?: string): market is SupportedMarket {
  if (!market)
    return false

  return supportedMarkets.includes(market as SupportedMarket)
}

const TIMEZONE_OFFSET_BY_SYSTEM = new Date().getTimezoneOffset()
const TIMEZONE_OFFSET_BY_MARKET: Record<SupportedMarket, number> = {
  'en-CA': -4 * 60, // America/Toronto 加拿大
  'en-US': -4 * 60, // America/New_York 美国
  'en-IN': +5 * 60, // Asia/Kolkata 印度
  'en-GB': +1 * 60, // Europe/London 英国
  'de-DE': +2 * 60, // Europe/Berlin 德国
  'fr-FR': +2 * 60, // Europe/Paris 法国
  'it-IT': +2 * 60, // Europe/Rome 意大利
  'ja-JP': +9 * 60, // Asia/Tokyo 日本
  'zh-CN': +8 * 60, // Asia/Shanghai 中国
}

export function newDateWithMarket(market: SupportedMarket) {
  const offset = (TIMEZONE_OFFSET_BY_MARKET[market] + TIMEZONE_OFFSET_BY_SYSTEM) * 60 * 1000
  return new Date(Date.now() + offset)
}
