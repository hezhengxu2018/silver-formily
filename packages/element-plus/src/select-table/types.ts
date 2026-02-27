import type { GeneralField } from '@formily/core'
import type { Column } from 'element-plus'

export interface ISelectTableProps {
  columns?: Column<any>[]
  mode?: 'multiple' | 'single'
  dataSource?: any[]
  optionAsValue?: boolean
  valueType?: 'all' | 'parent' | 'child' | 'path'
  loading?: boolean
  rowKey?: string
  clickRowToSelect?: boolean
  showAlertToolbar?: boolean
  modelValue?: any
  data?: Record<string, any>[]
  selectable?: (row: Record<string, any>, index: number, field: GeneralField) => boolean
  ignoreSelectable?: boolean
}
