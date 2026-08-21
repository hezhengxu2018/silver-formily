<script setup lang="ts">
import type { Field } from '@silver-formily/core'
import { reactiveComputed } from '@silver-formily/reactive-vue'
import { isEqual, isValid } from '@silver-formily/shared'
import { useField } from '@silver-formily/vue'
import { ElSpace, ElTag, ElText } from 'element-plus'
import { useAttrs } from 'vue'
import { stylePrefix, useExcludedAttrs } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextSelect',
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: any
}>()

const prefixCls = `${stylePrefix}-preview-text`

const fieldRef = useField<Field>()
const attrs = useAttrs()
const rootAttrs = useExcludedAttrs(['multiple'])
const { spaceProps, textProps, tagProps, placeholder } = usePreviewConfig()
const dataSource = reactiveComputed(() => fieldRef.value?.dataSource ?? [])

function getOptionLabel(value: any) {
  const optionAsValue = attrs.optionAsValue === true
  const valueKey = typeof attrs.valueKey === 'string' ? attrs.valueKey : 'id'
  const optionValue = optionAsValue && value && typeof value === 'object'
    ? value[valueKey] ?? value.value
    : value

  return dataSource.value.find((option) => {
    return isEqual(option.value, optionValue)
      || (optionAsValue && isEqual(option.raw?.[valueKey], optionValue))
  })?.label ?? optionValue
}
</script>

<template>
  <div v-bind="rootAttrs" :class="prefixCls">
    <template v-if="!isValid(props.modelValue)">
      <ElText v-bind="textProps">
        {{ placeholder }}
      </ElText>
    </template>
    <template v-else-if="!attrs.multiple">
      <ElText v-bind="textProps">
        {{ getOptionLabel(props.modelValue) }}
      </ElText>
    </template>
    <ElSpace v-else v-bind="spaceProps">
      <ElTag v-for="(item, key) of props.modelValue" :key="key" v-bind="tagProps">
        {{ getOptionLabel(item) }}
      </ElTag>
    </ElSpace>
  </div>
</template>
