import type { ISchema, Schema } from '@formily/json-schema'
import type { IArrayBaseItemProps } from './types'
import { clone, isArr, isValid, uid } from '@formily/shared'
import { inject, toRefs } from 'vue'
import { stylePrefix } from '../__builtins__'
import { ArrayBaseSymbol, ItemSymbol } from './symbols'

export const prefixCls = `${stylePrefix}-array-base`

export function useArray() {
  return inject(ArrayBaseSymbol, null)
}

export function useIndex() {
  const { index: indexRef } = toRefs(inject(ItemSymbol) as IArrayBaseItemProps)
  return indexRef
}

/* istanbul ignore next -- @preserve */
export function useRecord() {
  const { record: recordRef } = toRefs(
    inject(ItemSymbol) as IArrayBaseItemProps,
  )
  return recordRef
}

const isObjectValue: (schema: Schema) => boolean = (schema: Schema) => {
  if (Array.isArray(schema?.items))
    return isObjectValue(schema.items[0])

  if (schema?.items?.type === 'array' || schema?.items?.type === 'object') {
    return true
  }
  return false
}

export function useKey(schema: Schema) {
  const isObject = isObjectValue(schema)
  let keyMap: WeakMap<Record<string, unknown>, string> | string[] | null = null

  keyMap = isObject ? new WeakMap() : []

  return {
    keyMap,
    getKey: (record: any, index?: number) => {
      if (keyMap instanceof WeakMap) {
        if (!keyMap.has(record)) {
          keyMap.set(record, uid())
        }
        return `${keyMap.get(record)}`
      }

      if (keyMap && !keyMap[index]) {
        keyMap[index] = uid()
      }
      return `${keyMap[index]}`
    },
  }
}

export function getDefaultValue(defaultValue: any, schema: Schema): any {
  if (isValid(defaultValue))
    return clone(defaultValue)
  if (Array.isArray(schema?.items))
    return getDefaultValue(defaultValue, schema.items[0])
  if (schema?.items?.type === 'object')
    return {}
  return null
}

export function getArrayItemSchema(schema: ISchema, index: number): ISchema {
  return isArr(schema.items) ? schema.items[index] ?? schema.items[0] : schema.items
}

export function isAdditionComponent(schema: ISchema) {
  return schema['x-component']?.indexOf('Addition') > -1
}

export function isIndexComponent(schema: ISchema) {
  return schema['x-component']?.indexOf('Index') > -1
}

export function isRemoveComponent(schema: ISchema) {
  return schema['x-component']?.indexOf('Remove') > -1
}

export function isMoveUpComponent(schema: ISchema) {
  return schema['x-component']?.indexOf('MoveUp') > -1
}

export function isMoveDownComponent(schema: ISchema) {
  return schema['x-component']?.indexOf('MoveDown') > -1
}

export function isOperationComponent(schema: ISchema) {
  return (
    isAdditionComponent(schema)
    || isRemoveComponent(schema)
    || isMoveDownComponent(schema)
    || isMoveUpComponent(schema)
  )
}
