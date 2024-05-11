<script setup lang="ts">
const props = defineProps<{ src: string, alt: string }>()

const imageUrl = ref('')
const loading = ref(true)

function loadImage(src: string) {
  loading.value = true
  imageUrl.value = ''

  setTimeout(
    () => {
      imageUrl.value = src
      loading.value = false
    },
    800,
  )
}

watch(() => props.src, loadImage)

onMounted(() => {
  loadImage(props.src)
})
</script>

<template>
  <div class="grid h-full w-full place-items-center of-hidden">
    <div v-if="loading">
      <span class="i-system-uicons-loader block animate-spin text-3xl" />
    </div>
    <img v-else :src="imageUrl" :alt="alt" class="h-full w-full object-cover">
  </div>
</template>
