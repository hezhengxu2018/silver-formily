import { defineComponent, h } from 'vue'
import { fieldProps } from '../utils/fieldProps'
import { getRawComponent } from '../utils/getRawComponent'
import ReactiveField from './ReactiveField'

export default defineComponent({
  name: 'ObjectField',
  props: fieldProps,
  setup(props, { slots }) {
    return () => {
      const componentData = {
        fieldType: 'ObjectField',
        fieldProps: {
          ...props,
          ...getRawComponent(props),
        },
      }
      return h(ReactiveField, componentData, slots)
    }
  },
})
