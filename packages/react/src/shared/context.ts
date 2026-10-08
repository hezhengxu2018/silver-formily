import type { Form, GeneralField } from '@silver-formily/core'
import type { Schema } from '@silver-formily/json-schema'
import type { Context, ReactNode } from 'react'
import type {
  ISchemaFieldReactFactoryOptions,
  SchemaReactComponents,
} from '../types'
import { createContext, createElement } from 'react'

function createContextCleaner(...contexts: Context<any>[]) {
  function Cleaner({ children }: { children?: ReactNode }) {
    return contexts.reduce((buf, ctx) => {
      return createElement(ctx.Provider, { value: undefined }, buf)
    }, children)
  }
  return Cleaner
}

export const FormContext = createContext<Form>(null as any)
export const FieldContext = createContext<GeneralField>(null as any)
export const SchemaMarkupContext = createContext<Schema>(null as any)
export const SchemaContext = createContext<Schema>(null as any)
export const SchemaExpressionScopeContext = createContext<any>(null as any)
export const SchemaComponentsContext
  = createContext<SchemaReactComponents>(null as any)
export const SchemaOptionsContext
  = createContext<ISchemaFieldReactFactoryOptions>(null as any)

export const ContextCleaner = createContextCleaner(
  FieldContext,
  SchemaMarkupContext,
  SchemaContext,
  SchemaExpressionScopeContext,
  SchemaComponentsContext,
  SchemaOptionsContext,
)
