import type { IArrayFieldProps } from '../types'
import { defineComponent, h } from 'vue'
import { fieldProps } from '../utils/fieldProps'
import { getRawComponent } from '../utils/getRawComponent'
import ReactiveField from './ReactiveField'

export default defineComponent({
  name: 'ArrayField',
  props: fieldProps,
  setup(props: IArrayFieldProps, { slots }) {
    return () => {
      const componentData = {
        fieldType: 'ArrayField',
        fieldProps: {
          ...props,
          ...getRawComponent(props),
        },
      }
      return h(ReactiveField, componentData, slots)
    }
  },
})
