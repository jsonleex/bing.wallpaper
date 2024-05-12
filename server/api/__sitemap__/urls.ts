import { formatDate } from '@vueuse/core'
import { asSitemapUrl } from '#imports'
import { markets } from '~/config/market'

export default defineSitemapEventHandler(async (event) => {
  const { mkt } = getQuery(event)
  const market = markets.find(m => m.lang === mkt)!

  const date = new Date(market.startDate)
  const urls: ReturnType<typeof asSitemapUrl>[] = [
    asSitemapUrl({
      loc: `/?mkt=${market.lang}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      _sitemap: market.lang,
    }),
  ]

  while (date < new Date()) {
    urls.push(asSitemapUrl({
      loc: `/${formatDate(date, 'YYYY-MM-DD')}?mkt=${market.lang}`,
      lastmod: date.toISOString(),
      changefreq: 'never',
      _sitemap: market.lang,
    }))

    date.setDate(date.getDate() + 1)
  }

  return urls
})
