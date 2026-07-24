<script setup lang="ts">
import type { Field } from '@silver-formily/core'
import { reactiveComputed } from '@silver-formily/reactive-vue'
import { isValid } from '@silver-formily/shared'
import { useField } from '@silver-formily/vue'
import { ElSpace, ElTag, ElText } from 'element-plus'
import { useAttrs } from 'vue'
import { stylePrefix, useExcludedAttrs } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextTreeSelect',
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

function findNode(nodes: any[], value: any): any {
  const propsConfig = attrs.props as Record<string, string> | undefined
  const valueKey = propsConfig?.value ?? 'value'
  const childrenKey = propsConfig?.children ?? 'children'

  for (const node of nodes) {
    if (node?.[valueKey] === value)
      return node

    const children = node?.[childrenKey]
    if (Array.isArray(children)) {
      const result = findNode(children, value)
      if (result)
        return result
    }
  }
}

function getOptionLabel(value: any) {
  const propsConfig = attrs.props as Record<string, string> | undefined
  const labelKey = propsConfig?.label ?? 'label'
  return findNode(dataSource.value, value)?.[labelKey] ?? value
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
