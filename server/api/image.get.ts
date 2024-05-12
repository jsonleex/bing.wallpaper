interface ImageQuery {
  mkt: string
  date: string
}

export default defineEventHandler(
  async (event) => {
    const query = getQuery<ImageQuery>(event)

    const market = useValidMarket(event)

    const key = buildStorageKey(new Date(query.date ?? getDateWithMarketOffset(market.offset)), market.lang)
    const image = await getCachedImageWithStorageKey(key)

    if (!image)
      throw createError({ statusCode: 404, message: 'Image not found' })

    return image
  },
)
