<script setup lang="ts">
import { isArr } from '@formily/shared'
import { dayjs, ElText } from 'element-plus'
import { stylePrefix, useCleanAttrs } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextTimePicker',
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: any
}>()
const { props: attrs } = useCleanAttrs()
const prefixCls = `${stylePrefix}-preview-text`
const { textProps, placeholder } = usePreviewConfig()
const format = attrs.value.format || 'HH:mm:ss'
const parseFormat = attrs.value.valueFormat || 'HH:mm:ss'

function formatTimeValue(value: any): string | void {
  if (!value)
    return
  if (value instanceof Date) {
    return dayjs(value).format(format)
  }
  if (typeof value === 'string') {
    return dayjs(value, parseFormat).format(format)
  }
}
</script>

<template>
  <div :class="prefixCls">
    <template v-if="isArr(props.modelValue)">
      <ElText v-bind="textProps">
        {{ formatTimeValue(props.modelValue[0]) || placeholder }}
        {{ attrs.rangeSeparator ?? '~' }}
        {{ formatTimeValue(props.modelValue[1]) || placeholder }}
      </ElText>
    </template>
    <template v-else>
      <ElText v-bind="textProps">
        {{ formatTimeValue(props.modelValue) || placeholder }}
      </ElText>
    </template>
  </div>
</template>
