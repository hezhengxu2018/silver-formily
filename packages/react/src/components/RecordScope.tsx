import type { IRecordScopeProps } from '../types'
import { lazyMerge } from '@silver-formily/shared'
import { useExpressionScope } from '../hooks'
import { ExpressionScope } from './ExpressionScope'

export function RecordScope(props: IRecordScopeProps) {
  const scope = useExpressionScope()
  return (
    <ExpressionScope
      value={{
        get $lookup() {
          return scope?.$record
        },
        get $record() {
          const record = props.getRecord?.()
          if (typeof record === 'object') {
            return lazyMerge(record, {
              get $lookup() {
                return scope?.$record
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
      }}
    >
      {props.children}
    </ExpressionScope>
  )
}
