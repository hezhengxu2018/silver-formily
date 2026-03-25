<script setup lang="ts">
import type { CSSProperties, PropType } from 'vue'
import type { VantFormButtonGroupLayout } from './context'
import { ActionBar as VanActionBar } from 'vant'
import { computed, provide } from 'vue'
import { vantFormButtonGroupContextKey } from './context'
import { b } from './utils'

defineOptions({
  name: 'FFormButtonGroup',
  inheritAttrs: false,
})

const props = defineProps({
  layout: {
    type: String as PropType<VantFormButtonGroupLayout>,
    default: 'vertical',
  },
  gap: {
    type: [Number, String] as PropType<number | string>,
    default: 12,
  },
  inset: {
    type: Boolean,
    default: true,
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: false,
  },
})

const isCompact = computed(() => props.layout === 'compact')
const normalizedGap = computed(() => {
  return typeof props.gap === 'number'
    ? `${props.gap}px`
    : props.gap
})
const innerClass = b('inner')

const rootClass = computed(() => {
  return [
    b(),
    b({
      [props.layout]: true,
      inset: props.inset,
    }),
  ]
})

const rootStyle = computed<CSSProperties>(() => {
  return {
    '--f-form-button-group-gap': normalizedGap.value,
  }
})

provide(vantFormButtonGroupContextKey, computed(() => ({
  layout: props.layout,
})))
</script>

<template>
  <div v-bind="$attrs" :class="rootClass" :style="rootStyle">
    <VanActionBar v-if="isCompact" :safe-area-inset-bottom="props.safeAreaInsetBottom">
      <slot />
    </VanActionBar>
    <div v-else :class="innerClass">
      <slot />
    </div>
  </div>
</template>
