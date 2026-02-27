<script lang="ts" setup>
import type { IArrayBaseOperationProps } from './types'
import { Delete } from '@element-plus/icons-vue'
import { isArr } from '@formily/shared'
import { ElLink } from 'element-plus'
import { compatibleUnderlineProp } from '../__builtins__'
import { prefixCls, useArray, useIndex } from './utils'

defineOptions({
  name: 'ArrayBaseRemove',
})

const props = defineProps<IArrayBaseOperationProps>()

const indexRef = useIndex()
const base = useArray()

function handleClick() {
  if (isArr(base?.keyMap)) {
    base?.keyMap?.splice(indexRef.value, 1)
  }

  base?.field.value.remove(indexRef.value as number)
  base?.attrs?.remove?.(indexRef.value as number)
}
</script>

<template>
  <ElLink
    v-if="base?.field.value.pattern === 'editable'"
    :class="`${prefixCls}-remove`"
    size="small"
    :icon="Delete"
    :underline="compatibleUnderlineProp()"
    role="button"
    aria-label="移除条目"
    @click.stop="handleClick"
  >
    <slot>
      {{ props.title }}
    </slot>
  </ElLink>
</template>
