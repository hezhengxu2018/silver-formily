<script setup lang="ts">
import type { Field } from '@formily/core'
import { useField } from '@silver-formily/vue'
import { ElSpace, ElTag, ElText } from 'element-plus'
import { stylePrefix, useCleanAttrs } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextCascader',
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue: any
}>()
const prefixCls = `${stylePrefix}-preview-text`
const fieldRef = useField<Field>()
const field = fieldRef.value
const { props: attrs } = useCleanAttrs()
const isMultiple = !!attrs.value.props?.multiple
const isShowAllLevels = attrs.value.showAllLevels ?? true
const dataSource: any[] = field?.dataSource ?? []
const { spaceProps, textProps, tagProps, placeholder } = usePreviewConfig()

const valueKey = attrs.value.props?.value || 'value'
const labelKey = attrs.value.props?.label || 'label'

function findLabel(value: any, dataSource: any[]): any {
  const foundItem = dataSource.find(item => item?.[valueKey] === value)
  if (foundItem)
    return foundItem[labelKey]
  return dataSource
    .map(item => item?.children ? findLabel(value, item.children) : undefined)
    .find(label => label !== undefined)
}
</script>

<template>
  <div :class="prefixCls">
    <template v-if="!Array.isArray(props.modelValue)">
      <ElText v-bind="textProps">
        {{ placeholder }}
      </ElText>
    </template>
    <template v-else-if="isMultiple && Array.isArray(props.modelValue[0])">
      <ElSpace v-bind="spaceProps">
        <ElTag v-for="(item, key) of props.modelValue" :key="key" v-bind="tagProps">
          <template v-if="isShowAllLevels">
            {{ item.map(val => findLabel(val, dataSource) || placeholder).join(` ${attrs.separator ?? '/'} `) }}
          </template>
          <template v-else>
            {{ findLabel(item[item.length - 1], dataSource) || placeholder }}
          </template>
        </ElTag>
      </ElSpace>
    </template>
    <template v-else>
      <ElText v-bind="textProps">
        <template v-if="isShowAllLevels">
          {{ props.modelValue.map(val => findLabel(val, dataSource) || placeholder).join(` ${attrs.separator ?? '/'} `) }}
        </template>
        <template v-else>
          {{ findLabel(props.modelValue[props.modelValue.length - 1], dataSource) || placeholder }}
        </template>
      </ElText>
    </template>
  </div>
</template>
