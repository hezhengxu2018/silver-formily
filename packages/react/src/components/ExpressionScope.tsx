import type { IExpressionScopeProps } from '../types'
import { lazyMerge } from '@silver-formily/shared'
import { useContext } from 'react'
import { SchemaExpressionScopeContext } from '../shared'

export function ExpressionScope(props: IExpressionScopeProps) {
  const scope = useContext(SchemaExpressionScopeContext)
  return (
    <SchemaExpressionScopeContext.Provider
      value={lazyMerge(scope, props.value)}
    >
      {props.children}
    </SchemaExpressionScopeContext.Provider>
  )
}
