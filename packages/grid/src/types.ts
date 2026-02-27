import type { Grid } from './index'

export type GridNodeState = {
  index: number
  visible: boolean
  column: number
  shadowColumn: number
  row: number
  shadowRow: number
  span: number
  originSpan: number
}

export type GridSsrNode = GridNodeState

export type GridSsrNodeInput = {
  index: number
  visible?: boolean
  column?: number
  shadowColumn?: number
  row?: number
  shadowRow?: number
  span?: number
  originSpan?: number
}

export type GridNode = GridNodeState & {
  element: HTMLElement
}

export type GridVisibleNode = GridSsrNode | GridNode

export interface IGridOptions {
  ssrWidth?: number
  maxRows?: number
  maxColumns?: number | number[]
  minColumns?: number | number[]
  maxWidth?: number | number[]
  minWidth?: number | number[]
  breakpoints?: number[]
  columnGap?: number
  rowGap?: number
  colWrap?: boolean
  strictAutoFit?: boolean
  shouldVisible?: (node: GridVisibleNode, grid: Grid) => boolean
  onDigest?: (grid: Grid) => void
  onInitialized?: (grid: Grid) => void
}

export type GridContainerTarget
  = | HTMLElement
    | null
    | undefined
    | {
      value?: HTMLElement | null
    }
