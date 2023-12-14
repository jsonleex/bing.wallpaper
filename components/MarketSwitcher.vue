<script setup lang="ts">
const props = defineProps<{ mkt: string }>()

const mkt = computed(() => {
  return MktItems.find(item => item.code === props.mkt)
})

function handleClick(locale: string) {
  navigateTo(`/${locale}`)
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="mkt">
    <span class="mkt-icon">{{ mkt?.icon }}</span>
    <div class="mkt-popper">
      <ul class="mkt-list">
        <li
          v-for="item in MktItems" :key="item.code" class="mkt-item" :class="[item.code === mkt?.code && 'is-active']"
          @click="() => handleClick(item.code)"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.mkt {
  cursor: pointer;
  position: relative;
  display: grid;
  place-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}

.mkt-icon {
  font-size: 1.2rem;
}

.mkt:hover .mkt-popper {
  display: block;
}

.mkt-popper {
  position: absolute;
  top: 100%;
  left: -0.5rem;
  display: none;
  padding-top: 1rem;
  min-width: 120px;
}

.mkt-list {
  overflow: hidden;
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: 0.5rem;
  background-color: rgba(var(--background-color-rgb) / var(--opacity-lv3));
  backdrop-filter: blur(4px);
  filter: drop-shadow(
    1px 4px 7px rgba(var(--divider-color-rgb) / var(--opacity-lv2))
  );
}

.mkt-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: nowrap;
  white-space: nowrap;
  padding: 0.5rem;
  background-color: rgba(var(--background-color-rgb) / var(--opacity-lv0));
}

.mkt-item + .mkt-item {
  border-top: 0.5px solid rgba(var(--divider-color-rgb) / var(--opacity-lv2));
}

.mkt-item.is-active,
.mkt-item:hover {
  background-color: rgba(var(--background-color-rgb) / var(--opacity-lv6));
}
</style>
