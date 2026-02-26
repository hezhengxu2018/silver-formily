import type { Grid } from './index'
import type { GridNode } from './types'

const SpanRegExp = /span\s*(\d+)/

const isValid = (value: unknown) => value !== undefined && value !== null

export function calcBreakpointIndex(breakpoints: number[], width: number) {
  for (let i = 0; i < breakpoints.length; i++) {
    if (width <= breakpoints[i]) {
      return i
    }
  }
  return -1
}

export function calcFactor<T>(value: T | T[], breakpointIndex: number): T {
  if (Array.isArray(value)) {
    if (breakpointIndex === -1)
      return value[0]
    return value[breakpointIndex] ?? value[value.length - 1]
  }

  return value
}

export function parseSpan(gridColumnStart: string) {
  return Number(String(gridColumnStart).match(SpanRegExp)?.[1] ?? 1)
}

export function parseGridNode(elements: HTMLCollection): GridNode[] {
  return Array.from(elements).reduce<GridNode[]>((buf, element, index) => {
    if (!(element instanceof HTMLElement)) {
      return buf
    }

    const style = getComputedStyle(element)
    const visible = style.display !== 'none'
    const origin = element.getAttribute('data-grid-span')
    const span = parseSpan(style.gridColumnStart) || 1
    const originSpan = Number(origin ?? span)

    if (!origin) {
      element.setAttribute('data-grid-span', String(span))
    }

    buf.push({
      index,
      visible,
      span,
      originSpan,
      element,
      column: 0,
      shadowColumn: 0,
      row: 0,
      shadowRow: 0,
    })

    return buf
  }, [])
}

export function calcChildTotalColumns(nodes: GridNode[], shadow = false) {
  return nodes.reduce((buf, node) => {
    if (!shadow && !node.visible)
      return buf
    return buf + node.span
  }, 0)
}

export function calcChildOriginTotalColumns(nodes: GridNode[], shadow = false) {
  return nodes.reduce((buf, node) => {
    if (!shadow && !node.visible)
      return buf
    if (node.originSpan === -1)
      return buf + node.span
    return buf + node.originSpan
  }, 0)
}

export function calcSatisfyColumns(width: number, maxColumns: number, minColumns: number, maxWidth: number, minWidth: number, gap: number) {
  const results: number[] = []
  for (let columns = minColumns; columns <= maxColumns; columns++) {
    const innerWidth = width - (columns - 1) * gap
    const columnWidth = innerWidth / columns
    if (columnWidth >= minWidth && columnWidth <= maxWidth) {
      results.push(columns)
    }
    else if (columnWidth < minWidth) {
      results.push(Math.min(Math.floor(innerWidth / minWidth), maxColumns))
    }
    else if (columnWidth > maxWidth) {
      results.push(Math.min(Math.floor(innerWidth / maxWidth), maxColumns))
    }
  }

  if (!results.length)
    return minColumns

  return Math.max(...results)
}

export function factor<T>(value: T | T[] | undefined, grid: Grid): T | undefined {
  if (!isValid(value))
    return undefined

  return calcFactor(value, grid.breakpoint)
}

export function resolveChildren(grid: Grid) {
  let walked = 0
  let shadowWalked = 0
  let rowIndex = 0
  let shadowRowIndex = 0
  if (!grid.ready)
    return

  grid.children = grid.children.map((node) => {
    const columnIndex = walked % grid.columns
    const shadowColumnIndex = shadowWalked % grid.columns
    const remainColumns = grid.columns - columnIndex
    const originSpan = node.originSpan
    const targetSpan = originSpan > grid.columns ? grid.columns : originSpan
    const span = grid.options.strictAutoFit
      ? targetSpan
      : targetSpan > remainColumns
        ? remainColumns
        : targetSpan

    const gridColumn = originSpan === -1 ? `span ${remainColumns} / -1` : `span ${span} / auto`

    if (node.element.style.gridColumn !== gridColumn) {
      node.element.style.gridColumn = gridColumn
    }

    if (node.visible) {
      walked += span
    }
    shadowWalked += span

    if (columnIndex === 0) {
      rowIndex++
    }
    if (shadowColumnIndex === 0) {
      shadowRowIndex++
    }

    node.shadowRow = shadowRowIndex
    node.shadowColumn = shadowColumnIndex + 1

    if (node.visible) {
      node.row = rowIndex
      node.column = columnIndex + 1
    }

    if (grid.options.shouldVisible) {
      if (!grid.options.shouldVisible(node, grid)) {
        if (node.visible) {
          node.element.style.display = 'none'
        }
        node.visible = false
      }
      else {
        if (!node.visible) {
          node.element.style.display = ''
        }
        node.visible = true
      }
    }

    return node
  })
}

export const nextTick = (callback?: () => void) => Promise.resolve(0).then(callback)
