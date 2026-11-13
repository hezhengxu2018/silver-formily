import type { ComponentProps, ReactElement } from 'react'
import type { DateRangeValueProps, DateValueFormat, DateValueProps } from '../__builtins__/date-value'
import { mapProps } from '@silver-formily/react'
import { TimePicker as AntdTimePicker } from 'antd'
import { connectControl, mapLoadingIcon, mapReadPrettyControl } from '../__builtins__/connect-control'
import { mapDateValue } from '../__builtins__/date-value'
import { PreviewText } from '../preview-text'

export type TimePickerProps<F extends DateValueFormat = string> = DateValueProps<ComponentProps<typeof AntdTimePicker>, F>
export type TimeRangePickerProps<F extends DateValueFormat = string> = DateRangeValueProps<ComponentProps<typeof AntdTimePicker.RangePicker>, F>
export type TimePickerComponent = (<F extends DateValueFormat = string>(props: TimePickerProps<F>) => ReactElement) & Omit<typeof AntdTimePicker, 'RangePicker'> & {
  RangePicker: <F extends DateValueFormat = string>(props: TimeRangePickerProps<F>) => ReactElement
}

export const TimePicker = Object.assign(connectControl(AntdTimePicker, mapDateValue('time'), mapLoadingIcon(), mapReadPrettyControl(PreviewText.TimePicker)), {
  RangePicker: connectControl(AntdTimePicker.RangePicker, mapDateValue('time'), mapProps(props => ({ id: typeof props.id === 'string' ? { start: props.id, end: `${props.id}-end` } : props.id })), mapLoadingIcon(), mapReadPrettyControl(PreviewText.TimeRangePicker)),
}) as unknown as TimePickerComponent
export default TimePicker
