<script setup lang="ts">
import type { PreviewTextSliderProps } from './types'
import { isValid } from '@formily/shared'
import { Slider as VanSlider } from 'vant'
import { computed } from 'vue'
import { useCleanAttrs } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextSlider',
  inheritAttrs: false,
})

const props = defineProps<PreviewTextSliderProps>()

const { props: attrs } = useCleanAttrs(['disabled', 'modelValue', 'onUpdate:modelValue'])
const { placeholder } = usePreviewConfig()

function normalizeNumber(value: unknown) {
  if (!isValid(value) || value === '')
    return null

  const numericValue = Number(value)

  return Number.isFinite(numericValue) ? numericValue : null
}

const normalizedModelValue = computed<number | [number, number] | null>(() => {
  const modelValue = props.modelValue as unknown

  if (Array.isArray(modelValue)) {
    if (modelValue.length !== 2)
      return null

    const [start, end] = modelValue.map(normalizeNumber)

    if (start === null || end === null)
      return null

    return [start, end]
  }

  return normalizeNumber(modelValue)
})
</script>

<template>
  <div class="van-field__control">
    <template v-if="normalizedModelValue === null">
      {{ placeholder }}
    </template>
    <VanSlider
      v-else
      v-bind="attrs"
      :model-value="normalizedModelValue"
      readonly
    />
  </div>
</template>
