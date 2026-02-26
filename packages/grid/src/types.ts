import type { Grid } from './index'

export type GridNode = {
  index: number
  visible: boolean
  column: number
  shadowColumn: number
  row: number
  shadowRow: number
  span: number
  originSpan: number
  element: HTMLElement
}

export interface IGridOptions {
  ssrColumns?: number
  ssrTemplateColumns?: string
  deferVisibilityUntilHydration?: boolean
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
  shouldVisible?: (node: GridNode, grid: Grid) => boolean
  onDigest?: (grid: Grid) => void
  onInitialized?: (grid: Grid) => void
}
