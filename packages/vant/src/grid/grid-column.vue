<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'FGridColumn',
})

const props = defineProps({
  gridSpan: {
    type: Number,
    default: 1,
  },
})

const gridColumnStyle = computed(() => {
  if (props.gridSpan === -1) {
    return {}
  }

  return {
    gridColumn: `span ${props.gridSpan} / auto`,
  }
})
</script>

<template>
  <div :data-grid-span="props.gridSpan" :style="gridColumnStyle">
    <slot />
  </div>
</template>
