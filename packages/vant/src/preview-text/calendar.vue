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
  placeholder: undefined,
  displayFormatter: undefined,
})

const { placeholder } = usePreviewConfig()
const normalizedValue = computed(() => normalizeCalendarValue(props.modelValue, props.type))

const displayText = computed(() => {
  const value = normalizedValue.value

  if (props.displayFormatter) {
    return props.displayFormatter(cloneDeep(value), props.type)
  }

  return formatCalendarValue(value, props.type)
})
</script>

<template>
  <span class="van-field__control">
    {{ displayText || placeholder }}
  </span>
</template>
