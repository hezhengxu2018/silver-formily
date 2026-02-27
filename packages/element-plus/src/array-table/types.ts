import type { PaginationProps } from 'element-plus'

export interface IArrayTableProps {
  modelValue?: any[]
  pagination?: boolean
  paginationProps?: Partial<PaginationProps>
  height?: string | number
}
