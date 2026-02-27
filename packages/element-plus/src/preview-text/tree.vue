<script setup lang="ts">
import type { ArrayField } from '@formily/core'
import { useField } from '@silver-formily/vue'
import { ElScrollbar, ElText, ElTree } from 'element-plus'
import { computed } from 'vue'
import { stylePrefix, useCleanAttrs } from '../__builtins__'
import { getSelectedPath } from '../tree/utils'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTree',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  nodeKey: string
  modelValue?: any
  valueType?: string
  data?: any[]
  props?: {
    children?: string
    label?: string
    disabled?: string
  }
  height?: number
  maxHeight?: number
}>(), {
  valueType: 'all',
  props: () => ({
    children: 'children',
    label: 'label',
    disabled: 'disabled',
  }),
})

const prefixCls = `${stylePrefix}-preview-tree`
const fieldRef = useField<ArrayField>()
const { props: attrs } = useCleanAttrs(['modelValue', 'onUpdate:modelValue'])
const { textProps, placeholder } = usePreviewConfig()

const dataSource = computed(() => {
  return fieldRef.value.dataSource ?? props.data ?? []
})

const resolvedValue = computed(() => {
  if (props.modelValue !== undefined)
    return props.modelValue
  return fieldRef.value?.value
})

const previewData = computed(() => {
  if (!resolvedValue.value || !Array.isArray(resolvedValue.value) || resolvedValue.value.length === 0) {
    return []
  }
  switch (props.valueType) {
    case 'path': {
      return resolvedValue.value
    }
    default: {
      const selectedPath = getSelectedPath(dataSource.value, resolvedValue.value, props.nodeKey, props.props)
      return selectedPath
    }
  }
})
</script>

<template>
  <div :class="prefixCls">
    <ElScrollbar
      v-if="previewData.length > 0"
      :height="props.height"
      :max-height="props.maxHeight"
    >
      <ElTree
        :data="previewData"
        :node-key="props.nodeKey"
        :props="props.props"
        :default-expand-all="true"
        v-bind="attrs"
      />
    </ElScrollbar>
    <ElText v-else v-bind="textProps">
      {{ placeholder }}
    </ElText>
  </div>
</template>
