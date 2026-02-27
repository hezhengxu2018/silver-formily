import type { Schema } from '@formily/json-schema'
import { stylePrefix } from '../__builtins__'
import { isAdditionComponent, isOperationComponent } from '../array-base/utils'

export const prefixCls = `${stylePrefix}-array-table`

export function isColumnComponent(schema: Schema) {
  return schema['x-component']?.indexOf('Column') > -1
}

export function isTableComponent(schema: Schema): boolean {
  return isColumnComponent(schema) || isOperationComponent(schema) || isAdditionComponent(schema)
}

export function hasRequiredProperty(schema: Schema): boolean {
  return schema.reduceProperties((hasRequired, property) =>
    hasRequired || !!property.required, false)
}
