<script setup lang="ts">
import type { CascaderOption } from 'element-plus'
import { isEqual } from '@silver-formily/shared'
import { ElCascader } from 'element-plus'
import { ref, useAttrs } from 'vue'
import { useOptionValue } from '../__builtins__'

defineOptions({
  name: 'FCascader',
  inheritAttrs: false,
})

const props = defineProps<{
  optionAsValue?: boolean
  optionValueKeys?: string[]
  options?: CascaderOption[]
}>()

const cascaderRef = ref<InstanceType<typeof ElCascader>>()
const attrs = useAttrs()
const cascaderProps = useOptionValue(props, () => props.options ?? [], {
  key: () => (attrs.props as any)?.value ?? 'value',
  childrenKey: () => (attrs.props as any)?.children ?? 'children',
  resolve: (value, path, index) => {
    const checked = cascaderRef.value?.getCheckedNodes(false) ?? []
    if ((attrs.props as any)?.emitPath !== false && path) {
      return checked.find(node => isEqual(node.pathValues, path))?.pathNodes[index!]?.data
    }
    return checked.find(node => node.value === value)?.data
  },
})
</script>

<template>
  <ElCascader
    ref="cascaderRef"
    v-bind="cascaderProps"
    :options="props.options"
  >
    <template v-if="$slots.default" #default="{ node, data }">
      <slot :node="node" :data="data" />
    </template>
    <template v-if="$slots.empty" #empty>
      <slot name="empty" />
    </template>
  </ElCascader>
</template>
