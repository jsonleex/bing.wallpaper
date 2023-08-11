<script setup lang="ts">
import { BingImage } from 'types/bing';
const { image } = defineProps<{ image: BingImage }>()

const thumbnail = computed(() => {
  if (!image.url.includes('bing.com/th?id=')) {
    return image.url
  }

  return `${image.url}&w=480&h=270&c=7&rs=1&qlt=90&cb=1&pid=3`
})
</script>

<template>
  <div class="image-card">
    <img :src="thumbnail" :alt="image.title" />
    <div class="image-title">{{ image.title }}</div>
    <div class="image-date">{{ image.date.replaceAll('-', '/') }}</div>
  </div>
</template>

<style scoped>
.image-card {
  cursor: zoom-in;
  overflow: hidden;
  position: relative;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0 0 0 / 30%);
  background-size: 60px;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url('/placeholder.svg');
  background-color: #f1f1f1;
}

.image-card::before {
  content: '';
  display: block;
  padding-bottom: 56.25%;
}

.image-card img {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease;
}

.image-card:hover img {
  transform: scale(1.075);
}

.image-date,
.image-title {
  position: absolute;
  padding: 0.5rem;
  width: 100%;
  color: #ffffff;
}

.image-date {
  top: 0;
  font-size: 12px;
  text-shadow: 1px 1px 0 rgba(0 0 0 / 30%);
}

.image-title {
  bottom: 0;
  font-size: 14px;
  background-image: linear-gradient(to top, rgba(0 0 0 / 60%), rgba(0 0 0 / 0));
  transform: translateY(100%);
  transition: transform 0.4s ease;
}

.image-card:hover .image-title {
  transform: translateY(0);
}
</style>
