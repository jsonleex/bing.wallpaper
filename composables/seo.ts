export function useCustomSeoMeta(options: MaybeRef<{
  title?: string
  description?: string
  ogImage?: string
}>) {
  const route = useRoute()
  const { previewImage } = usePreview()

  const defaults = unref(options)

  const title = computed(() =>
    previewImage.value
      ? `${previewImage.value.title} | ${defaults.title}`
      : `${defaults.title} | ${defaults.description}`,
  )

  const description = computed(() =>
    previewImage.value?.copyright || defaults.description,
  )

  const ogImage = computed(() =>
    previewImage.value?.url || defaults.ogImage,
  )

  useSeoMeta({
    title,
    description,

    ogImage,
    ogImageAlt: title,
    ogTitle: title,
    ogType: 'website',
    ogUrl: route.fullPath,
    ogDescription: description,
  })
}
