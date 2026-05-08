<script setup lang="ts">
import type { PreviewTextCalendarProps } from './types'
import { cloneDeep } from 'es-toolkit'
import { computed } from 'vue'
import { formatCalendarValue, normalizeCalendarValue } from '../calendar/utils'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextCalendar',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PreviewTextCalendarProps>(), {
  type: 'single',
  format: undefined,
  valueFormat: undefined,
  placeholder: undefined,
  displayFormatter: undefined,
})

const { placeholder } = usePreviewConfig()
const resolvedCalendarOptions = computed(() => {
  return {
    format: props.format,
    valueFormat: props.valueFormat,
  }
})
const normalizedValue = computed(() => normalizeCalendarValue(
  props.modelValue,
  props.type,
  resolvedCalendarOptions.value,
))

const displayText = computed(() => {
  const value = normalizedValue.value

  if (props.displayFormatter) {
    return props.displayFormatter(cloneDeep(value), props.type)
  }

  return formatCalendarValue(value, props.type, resolvedCalendarOptions.value)
})
</script>

<template>
  <span class="van-field__control">
    {{ displayText || placeholder }}
  </span>
</template>
