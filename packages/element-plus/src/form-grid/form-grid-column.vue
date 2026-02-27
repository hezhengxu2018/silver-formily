<script lang="ts" setup>
defineOptions({
  name: 'FFormGridColumn',
})

const props = defineProps({
  gridSpan: {
    type: Number,
    default: 1,
  },
})
</script>

<template>
  <!-- @formily/grid 会优先使用这个值，如果没有会自动生成 -->
  <div :data-grid-span="props.gridSpan">
    <slot />
  </div>
</template>
