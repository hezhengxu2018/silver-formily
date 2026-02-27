<script setup lang="ts">
import type { CascaderOption } from 'element-plus'
import { ElCascader } from 'element-plus'
import { useCleanAttrs } from '../__builtins__'

defineOptions({
  name: 'FCascader',
  inheritAttrs: false,
})

const props = defineProps<{
  options?: CascaderOption[]
}>()

const { props: cascaderProps } = useCleanAttrs()
</script>

<template>
  <ElCascader
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
