<script setup lang="ts">
onMounted(() => {
  const { language } = useNavigatorLanguage()
  navigateTo(`/${language.value ?? 'en-US'}`)
})
</script>

<template>
  <div />
</template>
