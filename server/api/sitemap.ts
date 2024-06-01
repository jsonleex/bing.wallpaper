import { formatDate } from '@vueuse/core'
import { asSitemapUrl } from '#imports'
import { markets } from '~/config/market'

export default defineSitemapEventHandler(async () => {
  const urls: ReturnType<typeof asSitemapUrl>[] = [asSitemapUrl({
    loc: `/`,
    lastmod: new Date().toISOString(),
  })]

  for (const market of markets) {
    urls.push(asSitemapUrl({
      loc: `/?mkt=${market.lang}`,
      lastmod: new Date().toISOString(),
    }))

    const date = new Date(market.startDate)
    date.setHours(0, 0, 0, 0)

    while (date < new Date()) {
      urls.push(asSitemapUrl({
        loc: `/${formatDate(date, 'YYYY-MM-DD')}?mkt=${market.lang}`,
        lastmod: date.toISOString(),
      }))

      date.setDate(date.getDate() + 1)
    }
  }

  return urls
})
