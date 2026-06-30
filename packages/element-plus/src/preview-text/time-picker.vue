<script setup lang="ts">
import { isArr } from '@silver-formily/shared'
import { dayjs, ElText } from 'element-plus'
import { useAttrs } from 'vue'
import { stylePrefix, useExcludedAttrs } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextTimePicker',
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: any
}>()
const attrs = useAttrs()
const rootAttrs = useExcludedAttrs(['format', 'valueFormat', 'rangeSeparator'])
const prefixCls = `${stylePrefix}-preview-text`
const { textProps, placeholder } = usePreviewConfig()

function formatTimeValue(value: any): string | void {
  if (!value)
    return
  if (value instanceof Date) {
    return dayjs(value).format((attrs.format as string) || 'HH:mm:ss')
  }
  if (typeof value === 'string') {
    const format = (attrs.format as string) || 'HH:mm:ss'
    const parseFormat = (attrs.valueFormat as string) || 'HH:mm:ss'
    return dayjs(value, parseFormat).format(format)
  }
}
</script>

<template>
  <div v-bind="rootAttrs" :class="prefixCls">
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
