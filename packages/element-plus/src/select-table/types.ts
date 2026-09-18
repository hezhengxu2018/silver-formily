import type { GeneralField } from '@silver-formily/core'
import type { Column } from 'element-plus'
import type { OptionValueProps } from '../__builtins__/shared/option-value'

export interface SelectTableProps extends OptionValueProps {
  columns?: Column<any>[]
  mode?: 'multiple' | 'single'
  dataSource?: any[]
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
