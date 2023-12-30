const previewDate = ref('')
const previewVisible = ref(false)

type ValidDate = `${number}${number}${number}${number}-${number}${number}-${number}${number}`

function isValidPreviewDate(s: unknown): s is ValidDate {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s)
}

function formatDate(d: Date): ValidDate {
  const YYYY = d.getFullYear()
  const MM = String(d.getMonth() + 1).padStart(2, '0')
  const DD = String(d.getDate()).padStart(2, '0')
  return `${YYYY}-${MM}-${DD}` as ValidDate
}

export function usePreview() {
  const route = useRoute()

  function setPreviewDate(date?: ValidDate) {
    previewDate.value = date ?? ''
    previewVisible.value = !!date
    navigateTo({ path: route.path, query: { ...route.query, date } })
  }

  onMounted(() => {
    const date = route.query.date
    isValidPreviewDate(date) && setPreviewDate(date)
  })

  function showNextImage() {
    const date = previewDate.value
    if (isValidPreviewDate(date)) {
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)
      const formatted = formatDate(nextDate)
      if (nextDate.getTime() > Date.now()) {
        // eslint-disable-next-line no-alert
        alert(`Sorry, this image for ${formatted} is not available yet.`)
        return
      }

      setPreviewDate(formatted)
    }
  }

  function showPreviousImage() {
    const date = previewDate.value
    if (isValidPreviewDate(date)) {
      const previousDate = new Date(date)
      previousDate.setDate(previousDate.getDate() - 1)
      setPreviewDate(formatDate(previousDate))
    }
  }

  return {
    previewVisible,
    previewDate,
    showPreview: (date: string) => isValidPreviewDate(date) && setPreviewDate(date),
    hidePreview: () => setPreviewDate(),
    showNextImage,
    showPreviousImage,
  }
}
