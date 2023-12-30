import { isSupportedMarket } from '~/utils/market'

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as { idx: number, count: number, mkt: string }

  const idx = Number(query.idx) || 0
  const count = Number(query.count) || 1

  let market

  if (isSupportedMarket(query.mkt)) {
    market = query.mkt
  }
  else {
    const lang = (getHeader(event, 'accept-language') ?? '').split(',')[0]
    market = isSupportedMarket(lang) ? lang : 'en-US'
  }

  return await getImagesFromStorage(idx, count, market)
})
