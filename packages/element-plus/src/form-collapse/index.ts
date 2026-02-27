import { defineComponent, Fragment, h } from 'vue'
import { composeExport } from '../__builtins__'
import FormCollapse from './form-collapse.vue'
import { createFormCollapse } from './utils'
import './style.scss'

export const FormCollapseItem = defineComponent({
  name: 'FFormCollapseItem',
  inheritAttrs: false,
  setup(_props, { slots }) {
    return () => h(Fragment, slots.default?.())
  },
})

const composeFormCollapse = composeExport(FormCollapse, {
  Item: FormCollapseItem,
  createFormCollapse,
})

export { composeFormCollapse as FormCollapse }
export default composeFormCollapse
