<script setup lang="ts">
const { market, markets } = useMarket()
</script>

<template>
  <ui-select>
    <button class="flex items-center border-1 border-black:10 rounded-full p-2 text-2xl hover:bg-black:10">
      <div v-if="market" class="leading-none">
        {{ market.flag }}
      </div>
      <div v-else class="i-system-uicons-translate" />
    </button>

    <template #options>
      <div class="of-hidden border-1 rounded shadow divide-y bg-base">
        <div v-for="item in markets" :key="item.lang">
          <nuxt-link
            class="w-full flex flex-nowrap select-none items-center gap-2 rounded p-2"
            :class="[item.lang === market?.lang ? 'bg-rose-600:80 text-white' : 'hover:(bg-rose-600:90 text-white)']"
            :to="{ query: { mkt: item.lang } }"
          >
            <span class="text-xl">{{ item.flag }}</span>
            <span>{{ item.name }}</span>
          </nuxt-link>
        </div>
      </div>
    </template>
  </ui-select>
</template>
