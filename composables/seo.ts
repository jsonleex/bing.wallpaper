export function useCustomSeoMeta(options: MaybeRef<{
  title?: string
  description?: string
  ogImage?: string
}>) {
  const { previewDate } = usePreview()
  const { getImageByDate } = useImages()

  const defaults = unref(options)
  const image = computedAsync(() => getImageByDate(previewDate.value))

  const title = computed(() =>
    image.value ? `${image.value.title} | ${defaults.title}` : `${defaults.title} | ${defaults.description}`,
  )

  const description = computed(() =>
    image.value?.copyright || defaults.description,
  )

  const ogImage = computed(() =>
    image.value?.url || defaults.ogImage,
  )

  useSeoMeta({
    title,
    description,

    ogImage,
    ogTitle: title,
    ogImageAlt: title,
    ogDescription: description,
  })
}
