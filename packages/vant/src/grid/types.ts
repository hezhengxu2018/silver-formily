export interface GridProps {
  columns?: number
  columnGap?: number
  rowGap?: number
}

export interface GridInstance {
  readonly columns: number
  readonly columnGap: number
  readonly rowGap: number
  readonly templateColumns: string
  readonly gap: string
}

export interface GridColumnProps {
  gridSpan?: number
}
