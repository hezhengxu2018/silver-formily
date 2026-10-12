import type { PropType, Ref } from 'vue'
import type { IRecordsScopeProps, SchemaExpressionScope } from '../types'
import { lazyMerge } from '@silver-formily/shared'
import { computed, defineComponent, inject, provide } from 'vue'
import { SchemaExpressionScopeSymbol } from '../shared'

// 与 React 版 RecordsScope 对齐：向子树注入 $records 表达式作用域，
// 为整张列表提供数据源，常与 RecordScope 搭配使用
export default defineComponent({
  name: 'RecordsScope',
  props: {
    getRecords: {
      type: Function as PropType<IRecordsScopeProps['getRecords']>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const parentScopeRef = inject<Ref<SchemaExpressionScope>>(SchemaExpressionScopeSymbol)
    const expressionScopeRef = computed<SchemaExpressionScope>(() => {
      const parentScope = parentScopeRef?.value ?? {}
      return lazyMerge(parentScope, {
        get $records() {
          return props.getRecords?.() ?? []
        },
      })
    })

    provide(SchemaExpressionScopeSymbol, expressionScopeRef)

    return () => slots.default?.()
  },
})
