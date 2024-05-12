import { defaultMarket, markets } from '~/config/market'

export function useMarket() {
  const route = useRoute()

  const market = computed(() => {
    let mkt: string = ''

    if (route.query.mkt)
      mkt = route.query.mkt as string

    else if (import.meta.server)
      mkt = useRequestHeaders(['accept-language'])['accept-language']?.split(',')[0] || 'en-US'

    else if (import.meta.client)
      mkt = (navigator.language ?? 'en-US')

    return markets.find(m => m.lang === mkt) || defaultMarket
  })

  return {
    market,
    markets,
    mkt: computed(() => market.value!.lang),
  }
}
