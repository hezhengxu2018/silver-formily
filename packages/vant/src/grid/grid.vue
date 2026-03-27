<script setup lang="ts">
import type { GridInstance, GridProps } from './types'
import { computed, provide } from 'vue'
import { createNamespace } from '../__builtins__'
import { GridSymbol } from './hooks'

defineOptions({
  name: 'FGrid',
})

const props = withDefaults(defineProps<GridProps>(), {
  columns: 1,
  columnGap: 8,
  rowGap: 4,
})

const { prefixCls } = createNamespace('grid')

function normalizeColumns(columns?: number) {
  if (!Number.isFinite(columns))
    return 1

  return Math.max(1, Math.round(columns))
}

function normalizeGap(gap: number | undefined, fallback: number) {
  if (typeof gap !== 'number' || !Number.isFinite(gap) || gap < 0)
    return fallback

  return gap
}

const gridInstance = computed<GridInstance>(() => {
  const columns = normalizeColumns(props.columns)
  const columnGap = normalizeGap(props.columnGap, 8)
  const rowGap = normalizeGap(props.rowGap, 4)

  return {
    columns,
    columnGap,
    rowGap,
    templateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: `${rowGap}px ${columnGap}px`,
  }
})

provide(GridSymbol, gridInstance)
</script>

<template>
  <div
    :class="prefixCls"
    :style="{
      gridTemplateColumns: gridInstance.templateColumns,
      gap: gridInstance.gap,
    }"
  >
    <slot />
  </div>
</template>
