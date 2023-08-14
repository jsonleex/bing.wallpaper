<script setup lang="ts">
const { index, image, closeImagePreviewDialog, nextable, preable } = useImagePreview()
const uhd = useImageDownloader(toRef(() => image.value.url), '4k')
const hd = useImageDownloader(toRef(() => image.value.url), '1080p')
</script>
<template>
  <div v-if="image" class="image-detail">
    <img :src="image.url" :alt="image.title" />
    <div class="image-info">
      <div class="image-title">{{ image.title }}</div>
      <div class="image-copyright">{{ image.copyright }}</div>
      <div class="image-actions">
        <button @click="closeImagePreviewDialog">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
              d="m7 7l10 10M7 17L17 7" />
          </svg>
        </button>
        <button :disabled="!preable" @click="() => index--">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
              d="m14 7l-5 5m0 0l5 5" />
          </svg>
        </button>
        <button :disabled="!nextable" @click="() => index++">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
              d="m10 17l5-5m0 0l-5-5" />
          </svg>
        </button>
        <button :disabled="hd.disabled.value" @click="() => hd.download()" :loading="hd.downloading.value">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" stroke="#888888" stroke-linejoin="round" stroke-width="1.5">
              <path
                d="M2 14.5A4.5 4.5 0 0 0 6.5 19h12a3.5 3.5 0 0 0 .5-6.965a7 7 0 0 0-13.76-1.857A4.502 4.502 0 0 0 2 14.5Z" />
              <path stroke-linecap="round" d="m10 13l2 2m0 0l2-2m-2 2V9" />
            </g>
          </svg>
          <span>高清·1920x1080</span>
        </button>
        <button :disabled="uhd.disabled.value" @click="() => uhd.download()" :loading="uhd.downloading.value">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" stroke="#888888" stroke-linejoin="round" stroke-width="1.5">
              <path
                d="M2 14.5A4.5 4.5 0 0 0 6.5 19h12a3.5 3.5 0 0 0 .5-6.965a7 7 0 0 0-13.76-1.857A4.502 4.502 0 0 0 2 14.5Z" />
              <path stroke-linecap="round" d="m10 13l2 2m0 0l2-2m-2 2V9" />
            </g>
          </svg>
          <span>4K·3840x2160</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-detail {
  overflow: hidden;
  position: relative;
  width: 94vw;
  border-radius: 2px;
}

.image-detail::before {
  content: '';
  display: block;
  padding-top: 56.25%;
}

.image-detail img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.image-info {
  position: absolute;
  bottom: 0;
  padding: 2rem 4rem;
  width: 100%;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
}

@media screen and (max-width: 768px) {
  .image-info {
    padding: 0.5rem 1rem;
  }
}

.image-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.image-copyright {
  font-size: 0.8rem;
  opacity: 0.5;
}

.image-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.image-actions button {
  overflow: hidden;
  gap: 0.25rem;
  padding: 0 0.25rem;
  border-radius: 2px;
  opacity: 0.8;
  transition: opacity 0.2s;
  color: #888888;
  background-color: rgba(255, 255, 255, 0.8);
}

.image-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.image-actions button:not(:disabled):hover {
  opacity: 1;
}
</style>
