<script setup lang="ts">
import type { Field } from '@formily/core'
import type { PreviewTextAreaProps } from './types'
import { useField } from '@silver-formily/vue'
import { computed } from 'vue'
import {
  cloneAreaValue,
  formatAreaDisplay,
  resolveAreaSelectedOptions,
} from '../area/utils'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextArea',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PreviewTextAreaProps>(), {
  areaList: () => ({
    city_list: {},
    county_list: {},
    province_list: {},
  }),
  columnsNum: 3,
  columnsPlaceholder: () => [],
  placeholder: undefined,
  separator: ' / ',
  displayFormatter: undefined,
})

const fieldRef = useField<Field>()
const { placeholder } = usePreviewConfig()

const areaList = computed(() => {
  const dataSource = fieldRef.value?.dataSource

  return dataSource && !Array.isArray(dataSource)
    ? dataSource as PreviewTextAreaProps['areaList']
    : props.areaList
})

const selectedOptions = computed(() => {
  return resolveAreaSelectedOptions(
    props.modelValue,
    areaList.value,
    props.columnsNum,
    props.columnsPlaceholder,
  )
})
const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(
      cloneAreaValue(props.modelValue),
      [...selectedOptions.value],
    )
  }

  return formatAreaDisplay(
    props.modelValue,
    areaList.value,
    props.columnsNum,
    props.columnsPlaceholder,
    props.separator,
  )
})
</script>

<template>
  <span class="van-field__control">
    {{ displayText || placeholder }}
  </span>
</template>
