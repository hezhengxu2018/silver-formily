<script setup lang="ts">
import type { Grid as GridInstance, IGridOptions } from '@silver-formily/grid'
import type { PropType } from 'vue'
import { createGrid } from '@silver-formily/grid'
import { computed, provide, ref, watchEffect } from 'vue'
import { createNamespace } from '../__builtins__'
import { GridSymbol } from './hooks'

defineOptions({
  name: 'FGrid',
})

const props = defineProps({
  columnGap: {
    type: Number,
  },
  rowGap: {
    type: Number,
  },
  minColumns: {
    type: [Number, Array],
  },
  minWidth: {
    type: [Number, Array],
  },
  maxColumns: {
    type: [Number, Array],
  },
  maxWidth: {
    type: [Number, Array],
  },
  breakpoints: {
    type: Array as PropType<number[]>,
  },
  colWrap: {
    type: Boolean,
    default: true,
  },
  strictAutoFit: {
    type: Boolean,
    default: false,
  },
  shouldVisible: {
    type: Function as PropType<IGridOptions['shouldVisible']>,
    default() {
      return () => true
    },
  },
  grid: {
    type: Object as PropType<GridInstance<HTMLElement>>,
  },
})

const { prefixCls } = createNamespace('grid')
const rootRef = ref<HTMLElement>()

const gridInstance = computed(() => {
  const { grid, ...restProps } = props
  const options = {
    columnGap: props.columnGap ?? 8,
    rowGap: props.rowGap ?? 4,
    ...Object.fromEntries(
      Object.entries(restProps)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, value]),
    ),
  }

  return grid ?? createGrid(options)
})

provide(GridSymbol, gridInstance)

watchEffect((onInvalidate) => {
  const dispose = gridInstance.value.connect(rootRef.value)
  onInvalidate(() => {
    dispose()
  })
})
</script>

<template>
  <div
    ref="rootRef"
    :class="prefixCls"
    :style="{
      gridTemplateColumns: gridInstance.templateColumns,
      gap: gridInstance.gap,
    }"
  >
    <slot />
  </div>
</template>
