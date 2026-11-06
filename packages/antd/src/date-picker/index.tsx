import { mapProps } from '@silver-formily/react'
import { DatePicker as AntdDatePicker } from 'antd'
import { connectControl, mapLoadingIcon, mapReadPrettyControl } from '../__builtins__/connect-control'
import { PreviewText } from '../preview-text'

export const DatePicker: typeof AntdDatePicker = Object.assign(connectControl(AntdDatePicker, mapLoadingIcon(), mapReadPrettyControl(PreviewText.DatePicker)), {
  WeekPicker: connectControl(AntdDatePicker.WeekPicker, mapLoadingIcon(), mapReadPrettyControl(PreviewText.DatePicker, { picker: 'week' })),
  MonthPicker: connectControl(AntdDatePicker.MonthPicker, mapLoadingIcon(), mapReadPrettyControl(PreviewText.DatePicker, { picker: 'month' })),
  YearPicker: connectControl(AntdDatePicker.YearPicker, mapLoadingIcon(), mapReadPrettyControl(PreviewText.DatePicker, { picker: 'year' })),
  QuarterPicker: connectControl(AntdDatePicker.QuarterPicker, mapLoadingIcon(), mapReadPrettyControl(PreviewText.DatePicker, { picker: 'quarter' })),
  TimePicker: connectControl(AntdDatePicker.TimePicker, mapLoadingIcon(), mapReadPrettyControl(PreviewText.TimePicker, { picker: 'time' })),
  RangePicker: connectControl(AntdDatePicker.RangePicker, mapProps(props => ({ id: typeof props.id === 'string' ? { start: props.id, end: `${props.id}-end` } : props.id })), mapLoadingIcon(), mapReadPrettyControl(PreviewText.DateRangePicker)),
})
export default DatePicker
