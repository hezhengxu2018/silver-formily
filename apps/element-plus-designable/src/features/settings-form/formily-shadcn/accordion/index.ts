import { defineComponent, Fragment, h } from 'vue'
import { composeExport } from '../../../renderer/shared'
import Accordion from './Accordion.vue'
import { createAccordion } from './utils'

export type {
  AccordionKey,
  AccordionKeys,
  AccordionPanel,
  AccordionType,
  IAccordion,
  IAccordionProps,
} from './utils'

export const AccordionItem = defineComponent({
  name: 'FormilyShadcnAccordionItem',
  inheritAttrs: false,
  setup(_props, { slots }) {
    return () => h(Fragment, slots.default?.())
  },
})

const composeAccordion = composeExport(Accordion, {
  Item: AccordionItem,
  createAccordion,
})

export { composeAccordion as Accordion }
export default composeAccordion
