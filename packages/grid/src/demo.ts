export interface GridDemo {
  columns: number
  gap: number
}

export function createGridDemo(columns = 12, gap = 16): GridDemo {
  return {
    columns,
    gap,
  }
}
