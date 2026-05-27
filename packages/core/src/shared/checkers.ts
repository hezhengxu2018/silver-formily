import type { DataField, JSXComponent } from '..'
import type {
  GeneralField,
  IFieldState,
  IFormState,
  IGeneralFieldState,
  IVoidFieldState,
} from '../types'
import { isFn } from '@silver-formily/shared'
import {
  ArrayField,
  Field,
  Form,
  ObjectField,
  Query,
  VoidField,
} from '../models'

export function isForm(node: any): node is Form {
  return node instanceof Form
}

export function isGeneralField(node: any): node is GeneralField {
  return node instanceof Field || node instanceof VoidField
}

export function isField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any,
  TextType = any,
  ValueType = any,
>(node: any): node is Field<Decorator, Component, TextType, ValueType> {
  return node instanceof Field
}

export function isArrayField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any,
>(node: any): node is ArrayField<Decorator, Component> {
  return node instanceof ArrayField
}

export function isObjectField<
  Decorator extends JSXComponent = any,
  Component extends JSXComponent = any,
>(node: any): node is ObjectField<Decorator, Component> {
  return node instanceof ObjectField
}

export function isVoidField<Decorator = any, Component = any, TextType = any>(node: any): node is VoidField<Decorator, Component, TextType> {
  return node instanceof VoidField
}

export function isFormState<T extends Record<any, any> = any>(state: any): state is IFormState<T> {
  if (isFn(state?.initialize))
    return false
  return state?.displayName === 'Form'
}

export function isFieldState(state: any): state is IFieldState {
  if (isFn(state?.initialize))
    return false
  return state?.displayName === 'Field'
}

export function isGeneralFieldState(node: any): node is IGeneralFieldState {
  if (isFn(node?.initialize))
    return false
  return node?.displayName?.indexOf('Field') > -1
}

export function isArrayFieldState(state: any): state is IFieldState {
  if (isFn(state?.initialize))
    return false
  return state?.displayName === 'ArrayField'
}

export function isDataField(node: any): node is DataField {
  return isField(node) || isArrayField(node) || isObjectField(node)
}

export function isDataFieldState(node: any) {
  return (
    isFieldState(node) || isObjectFieldState(node) || isArrayFieldState(node)
  )
}

export function isObjectFieldState(state: any): state is IFieldState {
  if (isFn(state?.initialize))
    return false
  return state?.displayName === 'ObjectField'
}

export function isVoidFieldState(state: any): state is IVoidFieldState {
  if (isFn(state?.initialize))
    return false
  return state?.displayName === 'VoidField'
}

export function isQuery(query: any): query is Query {
  return query && query instanceof Query
}
