<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const props = defineProps(
  {
    modelValue: {
      type: Boolean,
      required: true
    },
    zIndex: {
      type: Number,
      default: 100
    },
    closeByMask: {
      type: Boolean,
      default: true
    },
    useVIf: {
      type: Boolean,
      default: true
    }
  }
)

defineOptions({ inheritAttrs: false })

const emit = defineEmits(['close', 'update:modelValue'])

const visible = computed(() => props.modelValue)

const elDialogRoot = ref<HTMLDivElement>()
const elDialogMain = ref<HTMLDivElement>()

function close () {
  if (visible.value) {
    emit('close')
    emit('update:modelValue', false)
  }
}

function clickMask () {
  if (props.closeByMask) {
    close()
  }
}

const isVIf = computed(() => props.useVIf ? visible.value : true)
const isVShow = computed(() => !props.useVIf ? visible.value : true)

useEventListener('keydown', (e) => {
  if (visible.value && e.key === 'Escape') {
    close()
    e.preventDefault()
  }
})

const { activate } = useFocusTrap(elDialogRoot, {
  immediate: false,
  allowOutsideClick: true,
  clickOutsideDeactivates: true,
  escapeDeactivates: true,
  preventScroll: true,
  returnFocusOnDeactivate: true,
})

function trapFocusDialog () {
  if (isVShow.value)
    nextTick().then(() => activate())
}

function bindTypeToAny($attrs: any) {
  return $attrs
}
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog-visible" @transitionend="trapFocusDialog">
      <div v-if="isVIf" v-show="isVShow" ref="elDialogRoot" class="dialog" :style="{ zIndex }">
        <div class="dialog-mask dialog-mask--blur" />
        <div class="dialog-mask dialog-mask--dimming" @click="clickMask" />
        <div class="dialog-content">
          <div ref="elDialogMain" class="dialog-main" v-bind="bindTypeToAny($attrs)">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog {
  position: fixed;
  inset: 0;
  overflow-y: auto;
  overscroll-behavior: none
}

.dialog::-webkit-scrollbar {
  display: none;
}

.dialog-mask {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.dialog-mask--blur {
  background-color: transparent;
  opacity: 100%;
  backdrop-filter: blur(4px);
  touch-action: none;
}

.dialog-mask--dimming {
  background-color: #000;
  opacity: 48%;
  height: calc(100% + 0.5px)
}

.dialog-content {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 1;
  display: grid;
  place-items: center;
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}

.dialog-main {
  isolation: isolate;
  pointer-events: auto;
  touch-action: pan-x pan-y;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.24);
}

.dialog-visible-enter-active,
.dialog-visible-leave-active {
  transition-duration: 0.25s;
}

.dialog-visible-enter-active .dialog-mask,
.dialog-visible-leave-active .dialog-mask {
  transition: opacity 0.25s ease;
}

.dialog-visible-enter-active .dialog-main,
.dialog-visible-leave-active .dialog-main {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.dialog-visible-enter-from .dialog-mask,
.dialog-visible-leave-to .dialog-mask {
  opacity: 0;
}

.dialog-visible-enter-from .dialog-main,
.dialog-visible-leave-to .dialog-main {
  transform: translateY(50px);
  opacity: 0;
}
</style>
