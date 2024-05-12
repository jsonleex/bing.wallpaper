interface ImagesQuery {
  mkt: string
  idx: number
  count: number
}

export default defineEventHandler(
  async (event) => {
    const query = getQuery<ImagesQuery>(event)

    const idx = Number(query.idx) || 0
    const count = Number(query.count) || 1
    const market = useValidMarket(event)

    return await getCachedImagesFromStorage(idx, count, market)
  },
)
