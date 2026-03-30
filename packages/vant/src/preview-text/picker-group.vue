<script setup lang="ts">
import type { Field } from '@formily/core'
import type { PreviewTextPickerGroupProps } from './types'
import { useField } from '@silver-formily/vue'
import { computed } from 'vue'
import {
  clonePickerGroupValue,
  formatPickerGroupDisplay,
  resolvePickerGroupModelValue,
  resolvePickerGroupPlaceholder,
  resolvePickerGroupSelectedOptions,
} from '../picker-group/utils'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextPickerGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PreviewTextPickerGroupProps>(), {
  dataSource: () => [],
  placeholder: undefined,
  separator: ' / ',
  displayFormatter: undefined,
})

const fieldRef = useField<Field>()
const { placeholder } = usePreviewConfig()

const dataSource = computed(() => {
  const fieldDataSource = fieldRef.value?.dataSource

  return Array.isArray(fieldDataSource)
    ? fieldDataSource as PreviewTextPickerGroupProps['dataSource']
    : props.dataSource
})

const displayValue = computed(() => resolvePickerGroupModelValue(props.modelValue))
const selectedOptions = computed(() => {
  return resolvePickerGroupSelectedOptions(
    props.modelValue,
    dataSource.value,
    props.columnsFieldNames,
  )
})
const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(
      clonePickerGroupValue(displayValue.value),
      [...selectedOptions.value],
    )
  }

  return formatPickerGroupDisplay(
    props.modelValue,
    dataSource.value,
    props.columnsFieldNames,
    props.separator,
  )
})
const resolvedPlaceholder = computed(() => {
  return props.placeholder || placeholder.value || resolvePickerGroupPlaceholder()
})
</script>

<template>
  <span class="van-field__control">
    {{ displayText || resolvedPlaceholder }}
  </span>
</template>
