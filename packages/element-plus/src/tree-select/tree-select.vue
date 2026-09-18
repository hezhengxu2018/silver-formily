<script setup lang="ts">
import type { Field } from '@silver-formily/core'
import { useField } from '@silver-formily/vue'
import { ElTreeSelect } from 'element-plus'
import { ref, useAttrs, useSlots } from 'vue'
import { useOptionValue } from '../__builtins__'

defineOptions({
  name: 'FSelectTree',
  inheritAttrs: false,
})

const props = defineProps<{ optionAsValue?: boolean, optionValueKeys?: string[] }>()
const slots = useSlots()

const attrs = useAttrs()

const treeSelectRef = ref()
const treeSelectProps = useOptionValue(props, () => (attrs.data as any[]) ?? [], {
  key: () => (attrs.props as any)?.value ?? (attrs.nodeKey as string) ?? (attrs.valueKey as string) ?? 'value',
  childrenKey: () => (attrs.props as any)?.children ?? 'children',
  resolve: value => treeSelectRef.value?.getNode(value)?.data,
})

const fieldRef = useField<Field>()

fieldRef.value?.inject({
  getTreeSelectRef: () => {
    return treeSelectRef
  },
})
</script>

<template>
  <ElTreeSelect
    ref="treeSelectRef"
    :loading="fieldRef?.loading"
    v-bind="treeSelectProps"
  >
    <template v-for="(_, name) of slots" #[name]="slotData">
      <slot :name="name" v-bind="{ field: fieldRef, ...slotData }" />
    </template>
  </ElTreeSelect>
</template>
