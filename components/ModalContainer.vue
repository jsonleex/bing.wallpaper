<script setup lang="ts">
const { isImagePreviewOpen } = useImagePreview()
</script>

<template>
  <ClientOnly>
    <ModalDialog v-model="isImagePreviewOpen">
      <BImageDetail />
    </ModalDialog>
  </ClientOnly>
</template>
