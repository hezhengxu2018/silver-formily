<script setup lang="ts">
import type { CSSProperties, PropType } from 'vue'
import type { VantFormButtonGroupLayout } from './context'
import { ActionBar as VanActionBar } from 'vant'
import { computed, provide } from 'vue'
import { vantFormButtonGroupContextKey } from './context'

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

const prefixCls = 'silver-formily-vant-form-button-group'

const isCompact = computed(() => props.layout === 'compact')
const normalizedGap = computed(() => {
  return typeof props.gap === 'number'
    ? `${props.gap}px`
    : props.gap
})

const rootClass = computed(() => {
  return [
    prefixCls,
    `${prefixCls}--${props.layout}`,
    props.inset && `${prefixCls}--inset`,
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
    <div v-else :class="`${prefixCls}__inner`">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.silver-formily-vant-form-button-group {
  --f-form-button-group-gap: 12px;
}

.silver-formily-vant-form-button-group--inset {
  padding: 12px 16px 16px;
}

.silver-formily-vant-form-button-group__inner {
  display: flex;
  gap: var(--f-form-button-group-gap);
}

.silver-formily-vant-form-button-group--vertical .silver-formily-vant-form-button-group__inner {
  flex-direction: column;
}

.silver-formily-vant-form-button-group--horizontal .silver-formily-vant-form-button-group__inner {
  align-items: stretch;
}

.silver-formily-vant-form-button-group--horizontal :deep(.van-button) {
  flex: 1;
  width: auto;
}

.silver-formily-vant-form-button-group--compact :deep(.van-action-bar) {
  position: static;
  box-sizing: border-box;
  height: auto;
  background: transparent;
}

.silver-formily-vant-form-button-group--compact :deep(.van-action-bar-button) {
  min-width: 0;
}

.silver-formily-vant-form-button-group--compact :deep(.van-action-bar-button--default) {
  color: var(--van-primary-color);
  border: var(--van-border-width) solid var(--van-primary-color);
}

.silver-formily-vant-form-button-group--compact :deep(.van-button__text) {
  white-space: nowrap;
}
</style>
