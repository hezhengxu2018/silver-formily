import type { SwitchProps } from 'antd-mobile'
import { connect, mapProps } from '@silver-formily/react'
import { Switch as AntdSwitch } from 'antd-mobile'

export type ISwitchProps = SwitchProps

export const Switch = connect(
  AntdSwitch,
  mapProps({ value: 'checked' }),
)

export default Switch
