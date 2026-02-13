import type { IReactiveFieldProps, IVoidFieldProps } from '../types'
import { defineComponent, h } from 'vue'
import { voidFieldProps } from '../utils/fieldProps'
import { getRawComponent } from '../utils/getRawComponent'
import ReactiveField from './ReactiveField'

export default defineComponent({
  name: 'VoidField',
  props: voidFieldProps,
  setup(props: IVoidFieldProps, { slots }) {
    return () => {
      const componentData: IReactiveFieldProps = {
        fieldType: 'VoidField',
        fieldProps: {
          ...props,
          ...getRawComponent(props),
        },
      }
      return h(ReactiveField, componentData, slots)
    }
  },
})
