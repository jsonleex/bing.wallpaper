import { isSupportedMarket, newDateWithMarket } from '~/utils/market'

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as { date: string, mkt: string }

  let market

  if (isSupportedMarket(query.mkt)) {
    market = query.mkt
  }
  else {
    const lang = (getHeader(event, 'accept-language') ?? '').split(',')[0]
    market = isSupportedMarket(lang) ? lang : 'en-US'
  }

  const key = generateStorageKey(new Date(query.date ?? newDateWithMarket(market)), market)

  const image = await getImageByStorageKey(key)

  if (!image)
    throw createError({ statusCode: 404, message: 'Image not found' })

  return image
})
