import { composeExport } from '../__builtins__/shared'
import { ArrayBase } from '../array-base'
import ArrayListTabsInner from './array-list-tabs.vue'
import './style.scss'

export const ArrayListTabs = composeExport(ArrayListTabsInner, {
  Addition: ArrayBase.Addition,
  Remove: ArrayBase.Remove,
})

export default ArrayListTabs
