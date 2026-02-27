import { composeExport } from '../__builtins__/shared'
import ArrayBaseAddition from './array-base-addition.vue'
import ArrayBaseIndex from './array-base-index.vue'
import ArrayBaseInner from './array-base-inner.vue'
import ArrayBaseItem from './array-base-item.vue'
import ArrayBaseMoveDown from './array-base-move-down.vue'
import ArrayBaseMoveUp from './array-base-move-up.vue'
import ArrayBaseRemove from './array-base-remove.vue'
import ArrayBaseSortHandle from './array-base-sort-handle.vue'
import { useArray, useIndex, useKey, useRecord } from './utils'
import './style.scss'

export const ArrayBase = composeExport(ArrayBaseInner, {
  Index: ArrayBaseIndex,
  Item: ArrayBaseItem,
  SortHandle: ArrayBaseSortHandle,
  Addition: ArrayBaseAddition,
  Remove: ArrayBaseRemove,
  MoveDown: ArrayBaseMoveDown,
  MoveUp: ArrayBaseMoveUp,
  useArray,
  useIndex,
  useKey,
  useRecord,
})
