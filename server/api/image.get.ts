interface ImageQuery {
  mkt: string
  date: string
}

export default defineEventHandler(
  async (event) => {
    const query = getQuery<ImageQuery>(event)

    const market = useValidMarket(event)
    const date = new Date(query.date ?? getDateWithMarketOffset(market.offset))

    const key = [
      String(date.getFullYear()),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
    ].join("")

    const image = await getCachedImageFromStorage(key, market.lang)

    if (!image)
      throw createError({ statusCode: 404, message: 'Image not found' })

    return image
  },
)
