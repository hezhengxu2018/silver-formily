import type { Component } from 'vue'
import { composeExport } from '../__builtins__/shared'
import { ArrayBase } from '../array-base'
import ArrayTableInner from './array-table.vue'
import './style.scss'

const ArrayTableColumn: Component = {
  name: 'FArrayTableColumn',
  render() {
    return null
  },
}

export const ArrayTable = composeExport(ArrayTableInner, {
  Column: ArrayTableColumn,
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

export default ArrayTable
