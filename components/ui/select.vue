<script setup lang="ts">
const rootRef = ref<HTMLElement | null>(null)
const optionsVisible = ref(false)

function toggleOptions() {
  optionsVisible.value = !optionsVisible.value
}

onClickOutside(rootRef, () => {
  optionsVisible.value = false
})
</script>

<template>
  <div ref="rootRef" class="relative" @click="toggleOptions">
    <slot name="default" />

    <div
      v-show="optionsVisible"
      class="absolute left-0 top-full mt-4 w-max"
    >
      <slot name="options" />
    </div>
  </div>
</template>
