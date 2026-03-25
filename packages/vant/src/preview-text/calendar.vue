<script setup lang="ts">
import type { PreviewTextCalendarProps } from './types'
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

const displayText = computed(() => {
  const normalizedValue = normalizeCalendarValue(props.modelValue, props.type)

  if (props.displayFormatter) {
    return props.displayFormatter(normalizedValue, props.type)
  }

  return formatCalendarValue(normalizedValue, props.type)
})

const resolvedPlaceholder = computed(() => props.placeholder || placeholder.value)
</script>

<template>
  <span class="van-field__control">
    {{ displayText || resolvedPlaceholder }}
  </span>
</template>
