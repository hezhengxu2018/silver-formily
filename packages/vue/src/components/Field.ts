import type { IFieldProps, IReactiveFieldProps } from '../types'
import { defineComponent, h } from 'vue'
import { fieldProps } from '../utils/fieldProps'
import { getRawComponent } from '../utils/getRawComponent'
import ReactiveField from './ReactiveField'

export default defineComponent({
  name: 'Field',
  props: fieldProps,
  setup(props: IFieldProps, context) {
    return () => {
      const componentData: IReactiveFieldProps = {
        fieldType: 'Field',
        fieldProps: {
          ...props,
          ...getRawComponent(props),
        },
      }
      return h(ReactiveField, componentData, context.slots)
    }
  },
})
