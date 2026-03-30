<script setup lang="ts">
import type { Field } from '@formily/core'
import type { PreviewTextPickerProps } from './types'
import { useField } from '@silver-formily/vue'
import { computed } from 'vue'
import {
  clonePickerValue,
  formatPickerDisplay,
  resolvePickerModelValue,
  resolvePickerPlaceholder,
  resolvePickerSelectedOptions,
} from '../picker/utils'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextPicker',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PreviewTextPickerProps>(), {
  columns: () => [],
  placeholder: undefined,
  separator: ' / ',
  displayFormatter: undefined,
})

const fieldRef = useField<Field>()
const { placeholder } = usePreviewConfig()

const columns = computed(() => {
  const dataSource = fieldRef.value?.dataSource

  return Array.isArray(dataSource)
    ? dataSource as PreviewTextPickerProps['columns']
    : props.columns
})

const displayValue = computed(() => {
  return resolvePickerModelValue(props.modelValue, columns.value, props.columnsFieldNames)
})
const selectedOptions = computed(() => {
  return resolvePickerSelectedOptions(props.modelValue, columns.value, props.columnsFieldNames)
})
const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(
      clonePickerValue(displayValue.value),
      [...selectedOptions.value],
    )
  }

  return formatPickerDisplay(
    props.modelValue,
    columns.value,
    props.columnsFieldNames,
    props.separator,
  )
})
const resolvedPlaceholder = computed(() => props.placeholder || placeholder.value || resolvePickerPlaceholder())
</script>

<template>
  <span class="van-field__control">
    {{ displayText || resolvedPlaceholder }}
  </span>
</template>
