import type { TreeNodeData } from 'element-plus'

export interface TreeValueTypeProps {
  nodeKey: string
  data?: TreeNodeData[]
  modelValue?: any
  valueType?: 'all' | 'parent' | 'child' | 'path'
  includeHalfChecked?: boolean
  optionAsValue?: boolean
  props?: any
  optionFormatter?: (node: TreeNodeData, index: number, array: TreeNodeData[]) => TreeNodeData
  height?: number
  maxHeight?: number
}
