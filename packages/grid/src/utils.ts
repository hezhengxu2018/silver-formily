import type { Grid } from './index'
import type { GridNode } from './types'

const SpanRegExp = /span\s*(\d+)/

const isValid = (value: unknown) => value !== undefined && value !== null

function isHTMLElement(value: unknown): value is HTMLElement {
  const HTMLElementCtor = (globalThis as { HTMLElement?: typeof HTMLElement }).HTMLElement
  if (typeof HTMLElementCtor !== 'function') {
    return false
  }
  return value instanceof HTMLElementCtor
}

export function calcBreakpointIndex(breakpoints: number[], width: number) {
  if (Array.isArray(breakpoints)) {
    for (let i = 0; i < breakpoints.length; i++) {
      if (width <= breakpoints[i]) {
        return i
      }
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
    if (!isHTMLElement(element)) {
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
    return buf + (node.span ?? 1)
  }, 0)
}

export function calcChildOriginTotalColumns(nodes: GridNode[], shadow = false) {
  return nodes.reduce((buf, node) => {
    const span = node.span ?? 1
    const originSpan = node.originSpan ?? span

    if (!shadow && !node.visible)
      return buf
    if (originSpan === -1)
      return buf + span

    return buf + originSpan
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

export function factor<T, Container extends HTMLElement>(value: T | T[] | undefined, grid: Grid<Container>): T | undefined {
  if (!isValid(value))
    return undefined

  return calcFactor(value, grid.breakpoint)
}

export function resolveChildren<Container extends HTMLElement>(grid: Grid<Container>) {
  if (!grid.ready)
    return

  let walked = 0
  let shadowWalked = 0
  let rowIndex = 0
  let shadowRowIndex = 0
  const shouldVisible = grid.options.shouldVisible

  grid.children = grid.children.map((node) => {
    const element = node.element
    const columnIndex = walked % grid.columns
    const shadowColumnIndex = shadowWalked % grid.columns
    const remainColumns = grid.columns - columnIndex
    const originSpan = node.originSpan ?? node.span ?? 1
    const targetSpan = originSpan > grid.columns ? grid.columns : originSpan
    const span = grid.options.strictAutoFit
      ? targetSpan
      : targetSpan > remainColumns
        ? remainColumns
        : targetSpan

    const gridColumn = originSpan === -1 ? `span ${remainColumns} / -1` : `span ${span} / auto`

    if (element && element.style.gridColumn !== gridColumn) {
      element.style.gridColumn = gridColumn
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

    if (shouldVisible) {
      if (!shouldVisible(node, grid as unknown as Grid<HTMLElement>)) {
        if (node.visible && element) {
          element.style.display = 'none'
        }
        node.visible = false
      }
      else {
        if (!node.visible && element) {
          element.style.display = ''
        }
        node.visible = true
      }
    }

    return node
  })
}

export const nextTick = (callback?: () => void) => Promise.resolve(0).then(callback)
