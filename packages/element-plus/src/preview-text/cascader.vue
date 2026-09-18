<script setup lang="ts">
import type { Field } from '@silver-formily/core'
import { useField } from '@silver-formily/vue'
import { ElSpace, ElTag, ElText } from 'element-plus'
import { computed } from 'vue'
import { getOptionIdentity, stylePrefix, useExcludedAttrs } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({ name: 'FPreviewTextCascader', inheritAttrs: false })
const props = defineProps<{ modelValue: any }>()
const fieldRef = useField<Field>()
const attrs = useExcludedAttrs()
const rootAttrs = useExcludedAttrs(['props', 'showAllLevels', 'separator', 'optionAsValue', 'optionValueKeys'])
const { spaceProps, textProps, tagProps, placeholder } = usePreviewConfig()
const config = computed(() => attrs.value.props ?? {})
const isMultiple = computed(() => !!config.value.multiple)
const labels = computed(() => {
  const source = fieldRef.value?.dataSource ?? attrs.value.options ?? []
  const key = config.value.value ?? 'value'
  const label = config.value.label ?? 'label'
  const children = config.value.children ?? 'children'
  function findPath(nodes: any[], value: any, parents: any[] = []): any[] | undefined {
    for (const node of nodes) {
      const path = [...parents, node]
      if (node[key] === value)
        return path
      const found = findPath(node[children] ?? [], value, path)
      if (found)
        return found
    }
  }
  const value = props.modelValue
  if (value == null || (Array.isArray(value) && !value.length))
    return []
  return (isMultiple.value ? value : [value]).map((selection: any) => {
    const identities = (Array.isArray(selection) ? selection : [selection]).map(item => attrs.value.optionAsValue ? getOptionIdentity(item, key) : item)
    let path: any[] | undefined
    if (Array.isArray(selection) && config.value.emitPath !== false) {
      let nodes = source
      path = []
      for (const identity of identities) {
        const node = nodes.find((item: any) => item[key] === identity)
        if (!node) {
          path = undefined
          break
        }
        path.push(node)
        nodes = node[children] ?? []
      }
    }
    else {
      path = findPath(source, identities.at(-1))
    }
    const text = path?.map(node => node[label]) ?? identities.map(item => item ?? placeholder.value)
    return attrs.value.showAllLevels === false ? text.at(-1) : text.join(` ${attrs.value.separator ?? '/'} `)
  })
})
</script>

<template>
  <div v-bind="rootAttrs" :class="`${stylePrefix}-preview-text`">
    <ElText v-if="!labels.length" v-bind="textProps">
      {{ placeholder }}
    </ElText>
    <ElSpace v-else-if="isMultiple" v-bind="spaceProps">
      <ElTag v-for="(label, index) of labels" :key="index" v-bind="tagProps">
        {{ label }}
      </ElTag>
    </ElSpace>
    <ElText v-else v-bind="textProps">
      {{ labels[0] }}
    </ElText>
  </div>
</template>
