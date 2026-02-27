<script lang="ts" setup>
import type { PropType } from 'vue'
import { stylePrefix } from '../__builtins__/configs'

defineOptions({
  name: 'FArrayItemsItem',
})

const props = defineProps({
  type: {
    type: String as PropType<'card' | 'divide'>,
    default: 'card',
  },
})

const prefixCls = `${stylePrefix}-array-items`
</script>

<template>
  <div
    :class="`${prefixCls}-${props.type}`"
  >
    <slot />
  </div>
</template>
