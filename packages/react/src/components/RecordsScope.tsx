import type { IRecordsScopeProps } from '../types'
import { ExpressionScope } from './ExpressionScope'

export function RecordsScope(props: IRecordsScopeProps) {
  return (
    <ExpressionScope
      value={{
        get $records() {
          return props.getRecords?.() ?? []
        },
      }}
    >
      {props.children}
    </ExpressionScope>
  )
}
