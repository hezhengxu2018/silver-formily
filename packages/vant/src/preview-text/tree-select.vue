<script setup lang="ts">
import type { PreviewTextTreeSelectProps } from './types'
import { computed } from 'vue'
import { formatTreeSelectValue, resolveTreeSelectSelectedOptions } from '../tree-select/utils'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextTreeSelect',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PreviewTextTreeSelectProps>(), {
  items: () => [],
})

const { placeholder } = usePreviewConfig()

const selectedOptions = computed(() => {
  return resolveTreeSelectSelectedOptions(props.modelValue, props.items)
})

const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(props.modelValue, selectedOptions.value)
  }

  return formatTreeSelectValue(props.modelValue, props.items)
})
</script>

<template>
  <span class="van-field__control">
    <template v-if="!displayText">
      {{ placeholder }}
    </template>
    <template v-else>
      {{ displayText }}
    </template>
  </span>
</template>
