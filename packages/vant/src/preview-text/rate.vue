<script setup lang="ts">
import type { PreviewTextRateProps } from './types'
import { isValid } from '@formily/shared'
import { Rate as VanRate } from 'vant'
import { computed } from 'vue'
import { useCleanAttrs } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextRate',
  inheritAttrs: false,
})

const props = defineProps<PreviewTextRateProps>()

const { props: attrs } = useCleanAttrs(['disabled', 'modelValue', 'onUpdate:modelValue'])
const { placeholder } = usePreviewConfig()
const normalizedModelValue = computed(() => {
  const modelValue = props.modelValue as unknown

  if (!isValid(modelValue) || modelValue === '')
    return null

  const value = Number(modelValue)

  return Number.isFinite(value) ? value : null
})
</script>

<template>
  <div class="van-field__control">
    <template v-if="normalizedModelValue === null">
      {{ placeholder }}
    </template>
    <VanRate
      v-else
      v-bind="attrs"
      :model-value="normalizedModelValue"
      readonly
    />
  </div>
</template>
