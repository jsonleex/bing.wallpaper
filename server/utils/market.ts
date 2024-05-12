import type { H3Event } from 'h3'
import type { Market } from '~/config/market'
import { allMkt, defaultMarket, markets } from '~/config/market'

const OFFSET_SYSTEM = new Date().getTimezoneOffset()
export function getDateWithMarketOffset(offset: number) {
  return new Date(Date.now() + (offset + OFFSET_SYSTEM) * 60 * 1000)
}

export function isAllowedMkt(mkt: string): mkt is Market {
  return allMkt.includes(mkt)
}

export function useValidMarket(event: H3Event) {
  let mkt = getQuery<{ mkt: string }>(event).mkt || getHeader(event, 'accept-language')?.split(',')[0] || defaultMarket.lang
  if (!isAllowedMkt(mkt))
    mkt = defaultMarket.lang
  return markets.find(m => m.lang === mkt)!
}
