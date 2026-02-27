import { composeExport } from '../__builtins__/shared'
import { ArrayBase } from '../array-base'
import ArrayCollapseItem from './array-collapse-item.vue'
import ArrayCollapseInner from './array-collapse.vue'
import './style.scss'

export const ArrayCollapse = composeExport(ArrayCollapseInner, {
  Item: ArrayCollapseItem,
  Index: ArrayBase.Index,
  SortHandle: ArrayBase.SortHandle,
  Addition: ArrayBase.Addition,
  Remove: ArrayBase.Remove,
  MoveDown: ArrayBase.MoveDown,
  MoveUp: ArrayBase.MoveUp,
  useArray: ArrayBase.useArray,
  useIndex: ArrayBase.useIndex,
  useRecord: ArrayBase.useRecord,
})

export default ArrayCollapse
