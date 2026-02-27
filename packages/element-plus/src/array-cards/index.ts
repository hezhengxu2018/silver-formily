import { composeExport } from '../__builtins__/shared'
import { ArrayBase } from '../array-base'
import ArrayCardsInner from './array-cards.vue'
import './style.scss'

export const ArrayCards = composeExport(ArrayCardsInner, {
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

export default ArrayCards
