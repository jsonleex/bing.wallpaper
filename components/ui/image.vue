<script setup lang="ts">
const props = defineProps<{ src: string, alt: string }>()

const loading = ref(true)

function loadImage(src: string) {
  loading.value = true
  const img = new Image()

  img.onload = async () => {
    loading.value = false
  }

  img.src = src
}

function reloadImage() {
  loadImage(props.src.includes('?') ? `${props.src}&t=${Date.now()}` : `${props.src}?t=${Date.now()}`)
}

watch(() => props.src, loadImage)

onMounted(() => {
  loadImage(props.src)
})
</script>

<template>
  <div class="grid h-full w-full place-items-center of-hidden bg-black:12" @dblclick="reloadImage">
    <transition name="fade" mode="out-in">
      <span v-if="loading" class="i-system-uicons-loader animate-spin text-3xl" />
      <img v-else :src="src" :alt="alt" v-bind="$attrs" class="block">
    </transition>
  </div>
</template>
