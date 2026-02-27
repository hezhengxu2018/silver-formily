import type { ISchema } from '@formily/json-schema'
import { stylePrefix } from '../__builtins__'

export const prefixCls = `${stylePrefix}-array-list-tabs`

export function isTabTitleComponent(schema: ISchema, tabTitleField: string) {
  if (schema.type !== 'void') {
    return schema.name === tabTitleField
  }
  if (schema.properties) {
    return tabTitleField in schema.properties
  }
  return false
}
