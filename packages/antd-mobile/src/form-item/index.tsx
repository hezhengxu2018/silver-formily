import { connect, mapProps } from '@silver-formily/react'
import { BaseItem } from './base-item'
import { mapFieldProps } from './field-props'
import './style.less'

export { BaseItem }
export type { IFormItemProps } from './types'

export const FormItem = Object.assign(connect(BaseItem, mapProps(mapFieldProps)), { BaseItem })

export default FormItem
