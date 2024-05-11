const previewDate = ref('')
const previewDateNext = ref('')
const previewDatePrev = ref('')
const previewVisible = ref(false)

type ValidDate = `${number}${number}${number}${number}-${number}${number}-${number}${number}`

function isValidPreviewDate(s: unknown): s is ValidDate {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && new Date(s) < new Date()
}

function formatDate(d: Date): ValidDate {
  const YYYY = d.getFullYear()
  const MM = String(d.getMonth() + 1).padStart(2, '0')
  const DD = String(d.getDate()).padStart(2, '0')
  return `${YYYY}-${MM}-${DD}` as ValidDate
}

export function usePreview() {
  const route = useRoute()

  function setPreviewDate(date: string = '') {
    navigateTo({ params: { market: route.params.market, date } })
  }

  watch(
    () => route.params.date as string,
    (date) => {
      if (isValidPreviewDate(date)) {
        previewDate.value = date
        const d = new Date(date)
        previewDatePrev.value = formatDate(new Date(d.setDate(d.getDate() - 1)))
        previewDateNext.value = formatDate(new Date(d.setDate(d.getDate() + 2)))
        previewVisible.value = true
      }
      else {
        previewVisible.value = false
        previewDate.value = ''
        previewDatePrev.value = ''
        previewDateNext.value = ''
      }
    },
    {
      immediate: true,
    },
  )

  return {
    market: computed(() => route.params.market as string),
    previewVisible,
    previewDate,
    previewDateNext,
    previewDatePrev,
    showPreview: setPreviewDate,
    hidePreview: () => setPreviewDate(),
  }
}
