import type { Form, GeneralField } from '@formily/core'
import type { Schema } from '@formily/json-schema'
import type { InjectionKey, Ref } from 'vue'
import type { ISchemaFieldVueFactoryOptions, SchemaExpressionScope } from '../types'

export const FormSymbol: InjectionKey<Ref<Form>> = Symbol('form')
export const FieldSymbol: InjectionKey<Ref<GeneralField>> = Symbol('field')
export const SchemaMarkupSymbol: InjectionKey<Ref<Schema>> = Symbol('schemaMarkup')
export const SchemaSymbol: InjectionKey<Ref<Schema>> = Symbol('schema')
export const SchemaExpressionScopeSymbol: InjectionKey<Ref<SchemaExpressionScope>>
  = Symbol('schemaExpression')
export const SchemaOptionsSymbol: InjectionKey<Ref<ISchemaFieldVueFactoryOptions>>
  = Symbol('schemaOptions')
