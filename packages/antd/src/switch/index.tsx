import type { ComponentProps, ForwardRefExoticComponent } from 'react'
import { mapProps } from '@silver-formily/react'
import { Switch as AntdSwitch } from 'antd'
import { connectControl, mapLoading, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export type SwitchProps = ComponentProps<typeof AntdSwitch>
export type SwitchComponent = ForwardRefExoticComponent<SwitchProps>

export const Switch = connectControl<typeof AntdSwitch, SwitchComponent>(
  AntdSwitch,
  mapProps({ value: 'checked' }),
  mapLoading(),
  mapReadPrettyControl(PreviewText.Boolean),
)
export default Switch
