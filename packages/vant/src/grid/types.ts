import type { Grid as FormGridInstance, GridNode, IGridOptions } from '@silver-formily/grid'

export type GridResponsiveValue = number | number[]

export interface GridProps {
  columnGap?: number
  rowGap?: number
  minColumns?: GridResponsiveValue
  minWidth?: GridResponsiveValue
  maxColumns?: GridResponsiveValue
  maxWidth?: GridResponsiveValue
  breakpoints?: number[]
  colWrap?: boolean
  strictAutoFit?: boolean
  shouldVisible?: IGridOptions['shouldVisible']
  grid?: FormGridInstance<HTMLElement>
}

export interface GridColumnProps {
  gridSpan?: number
}

export type GridInstance = FormGridInstance<HTMLElement>

export type { GridNode, IGridOptions }
