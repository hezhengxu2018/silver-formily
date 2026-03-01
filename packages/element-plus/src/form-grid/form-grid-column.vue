<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({
  name: 'FFormGridColumn',
})

const props = defineProps({
  gridSpan: {
    type: Number,
    default: 1,
  },
})

const gridColumnStyle = computed(() => {
  if (props.gridSpan === -1) {
    // gridSpan=-1 means "fill remaining columns in current row".
    // Leave gridColumn unset so @silver-formily/grid can manage it dynamically.
    return {}
  }
  return {
    gridColumn: `span ${props.gridSpan} / auto`,
  }
})
</script>

<template>
  <!-- @silver-formily/grid 会优先使用这个值，如果没有会自动生成 -->
  <div :data-grid-span="props.gridSpan" :style="gridColumnStyle">
    <slot />
  </div>
</template>
