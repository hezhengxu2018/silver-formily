<script setup lang="ts">
import type { Field } from '@formily/core'
import type { PreviewTextTreeSelectProps } from './types'
import { useField } from '@silver-formily/vue'
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

const fieldRef = useField<Field>()
const { placeholder } = usePreviewConfig()

const items = computed(() => {
  const dataSource = fieldRef.value?.dataSource

  return Array.isArray(dataSource)
    ? dataSource as PreviewTextTreeSelectProps['items']
    : props.items
})

const selectedOptions = computed(() => {
  return resolveTreeSelectSelectedOptions(props.modelValue, items.value)
})

const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(props.modelValue, selectedOptions.value)
  }

  return formatTreeSelectValue(props.modelValue, items.value)
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
