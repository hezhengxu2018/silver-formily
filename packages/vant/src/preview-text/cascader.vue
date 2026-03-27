<script setup lang="ts">
import type { Field } from '@formily/core'
import type { PreviewTextCascaderProps } from './types'
import { useField } from '@silver-formily/vue'
import { computed } from 'vue'
import {
  cloneCascaderValue,
  formatCascaderValue,
  normalizeCascaderValue,
  resolveCascaderSelectedOptions,
} from '../cascader/utils'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextCascader',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PreviewTextCascaderProps>(), {
  separator: ' / ',
  placeholder: undefined,
  displayFormatter: undefined,
})

const fieldRef = useField<Field>()
const { placeholder } = usePreviewConfig()

const options = computed(() => {
  const dataSource = fieldRef.value?.dataSource

  return Array.isArray(dataSource)
    ? dataSource as PreviewTextCascaderProps['options']
    : []
})

const normalizedValue = computed(() => {
  return normalizeCascaderValue(props.modelValue, options.value ?? [], props.fieldNames)
})

const selectedOptions = computed(() => {
  return resolveCascaderSelectedOptions(
    normalizedValue.value,
    options.value ?? [],
    props.fieldNames,
  )
})

const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(
      cloneCascaderValue(normalizedValue.value),
      selectedOptions.value,
    )
  }

  return formatCascaderValue(
    normalizedValue.value,
    selectedOptions.value,
    props.fieldNames,
    props.separator,
  )
})

const resolvedPlaceholder = computed(() => props.placeholder || placeholder.value)
</script>

<template>
  <span class="van-field__control">
    {{ displayText || resolvedPlaceholder }}
  </span>
</template>
