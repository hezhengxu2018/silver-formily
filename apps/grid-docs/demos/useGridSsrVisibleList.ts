import type { Grid, GridSsrNode, GridSsrNodeInput, GridVisibleNode } from '@silver-formily/grid'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

type BuildSsrNode<T> = (item: T, index: number) => GridSsrNodeInput

function normalizeSsrNodeFallback(node: GridSsrNodeInput): GridSsrNode {
  const span = typeof node.span === 'number' && Number.isFinite(node.span) && node.span > 0
    ? node.span
    : 1

  return {
    index: node.index,
    visible: node.visible ?? true,
    column: node.column ?? 0,
    shadowColumn: node.shadowColumn ?? 0,
    row: node.row ?? 0,
    shadowRow: node.shadowRow ?? 0,
    span,
    originSpan: node.originSpan ?? span,
  }
}

function resolveSsrVisibleCompat(grid: Grid, node: GridSsrNodeInput) {
  const runtimeGrid = grid as Grid & {
    normalizeSsrNode?: (node: GridSsrNodeInput) => GridSsrNode
    resolveSsrVisible?: (node: GridSsrNodeInput) => boolean
  }

  if (typeof runtimeGrid.resolveSsrVisible === 'function') {
    return runtimeGrid.resolveSsrVisible(node)
  }

  const shouldVisible = grid.options.shouldVisible
  if (!shouldVisible) {
    return true
  }

  const normalized = typeof runtimeGrid.normalizeSsrNode === 'function'
    ? runtimeGrid.normalizeSsrNode(node)
    : normalizeSsrNodeFallback(node)

  return shouldVisible(normalized as GridVisibleNode, grid)
}

export function useGridSsrVisibleList<T>(
  source: MaybeRefOrGetter<T[]>,
  grid: Grid,
  buildSsrNode?: BuildSsrNode<T>,
) {
  return computed(() => {
    const items = toValue(source)

    return items.filter((item, index) => {
      const node = buildSsrNode?.(item, index) ?? { index }
      return resolveSsrVisibleCompat(grid, node)
    })
  })
}
