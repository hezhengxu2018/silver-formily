import { connect, mapProps } from '@silver-formily/react'
import { Switch as AntdSwitch } from 'antd-mobile'

export const Switch = connect(
  AntdSwitch,
  mapProps({ value: 'checked' }),
)

export default Switch
