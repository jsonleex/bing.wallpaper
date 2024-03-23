<script setup lang="ts">
const props = defineProps<{ modelValue?: string }>()

const emit = defineEmits<{
  (e: 'change', value?: string): void
  (e: 'update:modelValue', value?: string): void
}>()

const markets: { code: SupportedMarket, name: string, icon: string }[] = [
  { code: 'de-DE', icon: '🇩🇪', name: 'Deutsch' },
  { code: 'en-CA', icon: '🇨🇦', name: 'English (Canada)' },
  { code: 'en-GB', icon: '🇬🇧', name: 'English (UK)' },
  { code: 'en-IN', icon: '🇮🇳', name: 'English (India)' },
  { code: 'en-US', icon: '🇺🇸', name: 'English (US)' },
  { code: 'fr-FR', icon: '🇫🇷', name: 'Francais' },
  { code: 'it-IT', icon: '🇮🇹', name: 'Italian' },
  { code: 'ja-JP', icon: '🇯🇵', name: '日本語' },
  { code: 'zh-CN', icon: '🇨🇳', name: '简体中文' },
]

const selected = computed({
  get() {
    return markets.find(item => item.code === props.modelValue)
  },

  set(item) {
    emit('change', item?.code)
    emit('update:modelValue', item?.code)
  },
})
</script>

<template>
  <ui-select>
    <button class="flex items-center border-1 border-black:10 rounded-full p-2 text-2xl hover:bg-black:10">
      <div v-if="selected" class="leading-none">
        {{ selected.icon }}
      </div>
      <div v-else class="i-system-uicons-translate" />
    </button>

    <template #options>
      <div class="of-hidden border-1 rounded shadow divide-y bg-base">
        <div v-for="item in markets" :key="item.code">
          <button
            class="w-full flex flex-nowrap select-none items-center gap-2 rounded p-2"
            :class="[item.code === selected?.code ? 'bg-rose-600:80 text-white' : 'hover:(bg-rose-600:90 text-white)']"
            @click="selected = item"
          >
            <span class="text-xl">{{ item.icon }}</span>
            <span>{{ item.name }}</span>
          </button>
        </div>
      </div>
    </template>
  </ui-select>
</template>
