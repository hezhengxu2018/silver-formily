import type { PaginationProps } from 'element-plus'

export interface ArrayTableProps {
  modelValue?: any[]
  pagination?: boolean
  paginationProps?: Partial<PaginationProps>
  height?: string | number
}

/** @deprecated Use ArrayTableProps instead. */
export type IArrayTableProps = ArrayTableProps
