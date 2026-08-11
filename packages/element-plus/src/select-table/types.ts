import type { GeneralField } from '@silver-formily/core'
import type { Column } from 'element-plus'

export interface SelectTableProps {
  columns?: Column<any>[]
  mode?: 'multiple' | 'single'
  dataSource?: any[]
  optionAsValue?: boolean
  valueType?: 'all' | 'parent' | 'child' | 'path'
  loading?: boolean
  rowKey: string
  clickRowToSelect?: boolean
  showAlertToolbar?: boolean
  selectionText?: string | ((count: number) => string)
  clearSelectionText?: string
  modelValue?: any
  data?: Record<string, any>[]
  selectable?: (row: Record<string, any>, index: number, field: GeneralField) => boolean
  ignoreSelectable?: boolean
}

/** @deprecated Use SelectTableProps instead. */
export type ISelectTableProps = SelectTableProps
