<script setup lang="ts">
const { index, image, closeImagePreviewDialog, nextable, preable } = useImagePreview()

const uhd = useImageDownloader(toRef(() => image.value.url), '4k')
const hd = useImageDownloader(toRef(() => image.value.url), '1080p')

const openCopyrightlink = (link: string) => link && window.open(link, '_blank')

const { ArrowLeft, ArrowRight } = useMagicKeys()
whenever(ArrowLeft, () => preable.value && index.value--)
whenever(ArrowRight, () => nextable.value && index.value++)
</script>

<template>
  <div v-if="image" class="image-detail">
    <img :src="image.url" :alt="image.title">
    <div class="image-info">
      <div class="image-title">
        {{ image.title }}
      </div>
      <div class="image-copyright">
        {{ image.copyright }}
      </div>
      <div class="image-actions">
        <button :disabled="!image.copyrightlink" @click="openCopyrightlink(image.copyrightlink)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m5.71 3l3.593 1.264v12.645l5.061-2.919l-2.48-1.165l-1.566-3.897l7.974 2.802v4.073l-8.984 5.183l-3.595-2L5.71 3z"
            />
          </svg>
        </button>
        <button :disabled="!preable" @click="() => index--">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
            <path fill="currentColor" d="M10 16L20 6l1.4 1.4l-8.6 8.6l8.6 8.6L20 26z" />
          </svg>
        </button>
        <button :disabled="!nextable" @click="() => index++">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
            <path fill="currentColor" d="M22 16L12 26l-1.4-1.4l8.6-8.6l-8.6-8.6L12 6z" />
          </svg>
        </button>
        <button @click="closeImagePreviewDialog">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
            <path
              fill="currentColor"
              d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"
            />
          </svg>
        </button>
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <button :disabled="hd.disabled.value" :loading="hd.downloading.value" @click="() => hd.download()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024">
              <path
                fill="currentColor"
                d="M624 706.3h-74.1V464c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v242.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.7a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9z"
              />
              <path
                fill="currentColor"
                d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7c-23.5-24.2-36-56.8-34.9-90.6c.9-26.4 9.9-51.2 26.2-72.1c16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9l13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0 1 52.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9c15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5l37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 0 1-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z"
              />
            </svg>
            <span>HD·1920x1080</span>
          </button>
          <button :disabled="uhd.disabled.value" :loading="uhd.downloading.value" @click="() => uhd.download()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024">
              <path
                fill="currentColor"
                d="M624 706.3h-74.1V464c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v242.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.7a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9z"
              />
              <path
                fill="currentColor"
                d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7c-23.5-24.2-36-56.8-34.9-90.6c.9-26.4 9.9-51.2 26.2-72.1c16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9l13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0 1 52.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9c15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5l37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 0 1-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z"
              />
            </svg>
            <span>4K·3840x2160</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-detail {
  overflow: hidden;
  position: relative;
  width: 90vw;
  max-width: 1440px;
  border-radius: 0.25rem;
  background-size: 240px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('/placeholder.svg');
  /* For border-radius */
  backdrop-filter: blur(0);
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
  background-color: rgba(var(--rgb-dark) / var(--opacity-lv2));
  backdrop-filter: blur(4px);
  color: #fff;
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
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.image-actions button {
  overflow: hidden;
  gap: 2px;
  padding: 2px;
  border-radius: 2px;
  opacity: 0.9;
  font-size: 14px;
  background-color: rgba(var(--rgb-dark) / var(--opacity-lv3));
  backdrop-filter: blur(2px);
  color: #fff;
  transition: all 0.3s ease-in;
}

.image-actions button span {
  margin-right: 2px;
}

.image-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}

.image-actions button:not(:disabled):hover {
  opacity: 1;
  background-color: rgba(var(--rgb-dark) / var(--opacity-lv4));
}
</style>
