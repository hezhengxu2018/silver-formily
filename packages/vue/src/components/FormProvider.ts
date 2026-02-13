import type { PropType } from 'vue'
import type { IProviderProps } from '../types'
import { defineComponent, provide, toRef } from 'vue'
import { useAttach } from '../hooks/useAttach'
import { useInjectionCleaner } from '../hooks/useInjectionCleaner'
import {
  FieldSymbol,
  FormSymbol,
  SchemaExpressionScopeSymbol,
  SchemaMarkupSymbol,
  SchemaOptionsSymbol,
  SchemaSymbol,
} from '../shared/context'

export default defineComponent({
  name: 'FormProvider',
  props: {
    form: {
      type: Object as PropType<IProviderProps['form']>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const formRef = useAttach(toRef(props, 'form'))
    provide(FormSymbol, formRef)
    useInjectionCleaner([
      FieldSymbol,
      SchemaMarkupSymbol,
      SchemaSymbol,
      SchemaExpressionScopeSymbol,
      SchemaOptionsSymbol,
    ])

    return () => slots.default?.()
  },
})
