<script setup lang="ts">
import type { PreviewTextTimePickerProps } from './types'
import { computed } from 'vue'
import {
  formatTimePickerValue,
  resolveTimePickerModelValue,
  resolveTimePickerSelectedOptions,
} from '../time-picker/utils'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextTimePicker',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PreviewTextTimePickerProps>(), {
  columnsType: () => ['hour', 'minute'],
  placeholder: undefined,
  displayFormatter: undefined,
})

const { placeholder } = usePreviewConfig()
const resolvedValue = computed(() => {
  return resolveTimePickerModelValue(props.modelValue, {
    columnsType: props.columnsType,
    filter: props.filter,
    format: props.format,
    formatter: props.formatter,
    maxHour: props.maxHour,
    maxMinute: props.maxMinute,
    maxSecond: props.maxSecond,
    maxTime: props.maxTime,
    minHour: props.minHour,
    minMinute: props.minMinute,
    minSecond: props.minSecond,
    minTime: props.minTime,
    valueFormat: props.valueFormat,
  })
})
const selectedOptions = computed(() => {
  return resolveTimePickerSelectedOptions(props.modelValue, {
    columnsType: props.columnsType,
    filter: props.filter,
    format: props.format,
    formatter: props.formatter,
    maxHour: props.maxHour,
    maxMinute: props.maxMinute,
    maxSecond: props.maxSecond,
    maxTime: props.maxTime,
    minHour: props.minHour,
    minMinute: props.minMinute,
    minSecond: props.minSecond,
    minTime: props.minTime,
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

  return formatTimePickerValue(resolvedValue.value, {
    columnsType: props.columnsType,
    format: props.format,
    valueFormat: props.valueFormat,
  })
})
</script>

<template>
  <span class="van-field__control">
    {{ displayText || placeholder }}
  </span>
</template>
