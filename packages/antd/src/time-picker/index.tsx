import { mapProps } from '@silver-formily/react'
import { TimePicker as AntdTimePicker } from 'antd'
import { connectControl, mapLoadingIcon, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const TimePicker: typeof AntdTimePicker = Object.assign(connectControl(AntdTimePicker, mapLoadingIcon(), mapReadPrettyControl(PreviewText.TimePicker)), {
  RangePicker: connectControl(AntdTimePicker.RangePicker, mapProps(props => ({ id: typeof props.id === 'string' ? { start: props.id, end: `${props.id}-end` } : props.id })), mapLoadingIcon(), mapReadPrettyControl(PreviewText.TimeRangePicker)),
})
export default TimePicker
