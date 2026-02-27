<script lang="ts" setup>
import type { IArrayBaseAdditionProps } from './types'
import { Plus } from '@element-plus/icons-vue'
import { useField } from '@silver-formily/vue'
import { ElLink } from 'element-plus'
import { compatibleUnderlineProp } from '../__builtins__'
import { getDefaultValue, prefixCls, useArray } from './utils'

defineOptions({
  name: 'ArrayBaseAddition',
})

const props = withDefaults(defineProps<IArrayBaseAdditionProps>(), {
  method: 'push',
})

const self = useField()
const base = useArray()

function onAddItemClick() {
  const defaultValue = getDefaultValue(props.defaultValue, base?.schema.value)
  if (props.method === 'unshift') {
    base?.field?.value.unshift(defaultValue)
    base.attrs?.add?.(0)
  }
  else {
    base?.field?.value.push(defaultValue)
    base.attrs?.add?.(base?.field?.value?.value?.length - 1)
  }
}
</script>

<template>
  <ElLink
    v-if="base.field.value.pattern === 'editable'"
    :class="`${prefixCls}-addition`"
    :icon="Plus"
    :underline="compatibleUnderlineProp()"
    role="button"
    aria-label="添加条目"
    @click="onAddItemClick"
  >
    {{ self.title || props.title }}
  </ElLink>
</template>
