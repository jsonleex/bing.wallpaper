import { formatDate } from '@vueuse/core'
import { asSitemapUrl } from '#imports'
import { markets } from '~/config/market'

export default defineSitemapEventHandler(async () => {
  const maps = markets.map((market) => {
    const urls: ReturnType<typeof asSitemapUrl>[] = []

    urls.push(asSitemapUrl({
      loc: `/?mkt=${market.lang}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      _sitemap: market.title,
    }))

    const date = new Date(market.startDate)

    while (date < new Date()) {
      urls.push(asSitemapUrl({
        loc: `/${formatDate(date, 'YYYY-MM-DD')}?mkt=${market.lang}`,
        lastmod: date.toISOString(),
        changefreq: 'never',
        _sitemap: market.title,
      }))

      date.setDate(date.getDate() + 1)
    }

    return urls
  })

  return maps.flat()
})
