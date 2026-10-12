import type { PropType, Ref } from 'vue'
import type { IRecordScopeProps, SchemaExpressionScope } from '../types'
import { lazyMerge } from '@silver-formily/shared'
import { computed, defineComponent, inject, provide } from 'vue'
import { SchemaExpressionScopeSymbol } from '../shared'

// 与 React 版 RecordScope 对齐：向子树注入 $record / $index / $lookup 表达式作用域，
// $record 为对象记录时其上额外挂载 $lookup 与 $index，支持层层向上查找父级记录
export default defineComponent({
  name: 'RecordScope',
  props: {
    getRecord: {
      type: Function as PropType<IRecordScopeProps['getRecord']>,
      required: true,
    },
    getIndex: {
      type: Function as PropType<IRecordScopeProps['getIndex']>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const parentScopeRef = inject<Ref<SchemaExpressionScope>>(SchemaExpressionScopeSymbol)
    const expressionScopeRef = computed<SchemaExpressionScope>(() => {
      const parentScope = parentScopeRef?.value ?? {}
      return lazyMerge(parentScope, {
        get $lookup() {
          return parentScope.$record
        },
        get $record() {
          const record = props.getRecord?.()
          if (typeof record === 'object') {
            return lazyMerge(record, {
              get $lookup() {
                return parentScope.$record
              },
              get $index() {
                return props.getIndex?.()
              },
            })
          }
          return record
        },
        get $index() {
          return props.getIndex?.()
        },
      })
    })

    provide(SchemaExpressionScopeSymbol, expressionScopeRef)

    return () => slots.default?.()
  },
})
