<script setup lang="ts">
import type { PreviewTextDatePickerProps } from './types'
import { computed } from 'vue'
import {
  formatDatePickerValue,
  resolveDatePickerModelValue,
  resolveDatePickerSelectedOptions,
} from '../date-picker/utils'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextDatePicker',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PreviewTextDatePickerProps>(), {
  columnsType: () => ['year', 'month', 'day'],
  placeholder: undefined,
  separator: '-',
  displayFormatter: undefined,
})

const { placeholder } = usePreviewConfig()
const resolvedValue = computed(() => {
  if (!props.displayFormatter)
    return props.modelValue ?? null

  return resolveDatePickerModelValue(props.modelValue, {
    columnsType: props.columnsType,
    filter: props.filter,
    format: props.format,
    formatter: props.formatter,
    maxDate: props.maxDate,
    minDate: props.minDate,
    separator: props.separator,
    valueFormat: props.valueFormat,
  })
})
const selectedOptions = computed(() => {
  if (!props.displayFormatter)
    return []

  return resolveDatePickerSelectedOptions(props.modelValue, {
    columnsType: props.columnsType,
    filter: props.filter,
    format: props.format,
    formatter: props.formatter,
    maxDate: props.maxDate,
    minDate: props.minDate,
    separator: props.separator,
    valueFormat: props.valueFormat,
  })
})
const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(
      resolvedValue.value,
      [...selectedOptions.value],
    )
  }

  return formatDatePickerValue(props.modelValue ?? null, {
    columnsType: props.columnsType,
    format: props.format,
    separator: props.separator,
    valueFormat: props.valueFormat,
  })
})
</script>

<template>
  <span class="van-field__control">
    {{ displayText || placeholder }}
  </span>
</template>
