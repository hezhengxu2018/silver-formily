<script lang="ts" setup>
import { prefixCls, useIndex } from './utils'

defineOptions({
  name: 'ArrayBaseIndex',
})

const index = useIndex()
</script>

<template>
  <span :class="`${prefixCls}-index`">
    <slot :index="index">
      #{{ index + 1 }}.
    </slot>
  </span>
</template>
