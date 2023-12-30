<script setup lang="ts">
onMounted(() => {
  const { language } = useNavigatorLanguage()

  let market = toValue(language.value) ?? ''
  if (!isSupportedMarket(market)) {
    console.warn(`Unsupported navigator.language: ${language.value}`)
    market = 'en-US'
  }

  navigateTo(`/${market}`)
})
</script>

<template>
  <div />
</template>
