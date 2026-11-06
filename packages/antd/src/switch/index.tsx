import { mapProps } from '@silver-formily/react'
import { Switch as AntdSwitch } from 'antd'
import { connectControl, mapLoading, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const Switch: typeof AntdSwitch = connectControl(AntdSwitch, mapProps({ value: 'checked' }), mapLoading(), mapReadPrettyControl(PreviewText.Boolean))
export default Switch
