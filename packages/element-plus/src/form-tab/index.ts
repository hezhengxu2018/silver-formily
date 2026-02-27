import { observer } from '@silver-formily/reactive-vue'
import { composeExport } from '../__builtins__'
import FFormTab from './form-tab.vue'
import { createFormTab } from './utils'
import './style.scss'

const FormTab = observer(FFormTab)

export const composeFormTab = composeExport(FormTab, {
  createFormTab,
})

export { composeFormTab as FormTab }
export default composeFormTab
