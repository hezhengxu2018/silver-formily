import type { PropType, Ref } from 'vue'
import type { IExpressionScopeProps, SchemaExpressionScope } from '../types'
import { lazyMerge } from '@formily/shared'
import { computed, defineComponent, inject, provide } from 'vue'
import { SchemaExpressionScopeSymbol } from '../shared'

export default defineComponent({
  name: 'ExpressionScope',
  props: {
    value: {
      type: Object as PropType<IExpressionScopeProps['value']>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const parentScopeRef = inject<Ref<SchemaExpressionScope>>(SchemaExpressionScopeSymbol)
    const expressionScopeRef = computed<SchemaExpressionScope>(() => {
      const parentScope = parentScopeRef?.value ?? {}
      return lazyMerge(parentScope, props.value)
    })

    provide(SchemaExpressionScopeSymbol, expressionScopeRef)

    return () => slots.default?.()
  },
})
