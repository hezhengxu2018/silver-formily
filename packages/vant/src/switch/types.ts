import type { Field } from '@formily/core'
import type { SwitchProps as VanSwitchProps } from 'vant'

export type SwitchValue = VanSwitchProps['modelValue']

export interface SwitchBeforeChangeContext {
  currentValue?: SwitchValue
  field?: Field
}

export type SwitchBeforeChange = (
  value: SwitchValue,
  context: SwitchBeforeChangeContext,
) => boolean | void | Promise<boolean | void>

export interface SwitchProps {
  size?: VanSwitchProps['size']
  loading?: VanSwitchProps['loading']
  disabled?: VanSwitchProps['disabled']
  modelValue?: VanSwitchProps['modelValue']
  activeColor?: VanSwitchProps['activeColor']
  inactiveColor?: VanSwitchProps['inactiveColor']
  activeValue?: VanSwitchProps['activeValue']
  inactiveValue?: VanSwitchProps['inactiveValue']
  beforeChange?: SwitchBeforeChange
}
