import type { TreeNodeData } from 'element-plus'
import type { OptionValueProps } from '../__builtins__/shared/option-value'

export interface TreeValueTypeProps extends OptionValueProps {
  nodeKey: string
  data?: TreeNodeData[]
  modelValue?: any
  valueType?: 'all' | 'parent' | 'child' | 'path'
  includeHalfChecked?: boolean
  props?: any
  height?: number
  maxHeight?: number
}
