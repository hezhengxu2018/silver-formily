import type { DatePickerProps as NativeDatePickerProps } from 'antd'
import type { Dayjs } from 'dayjs'
import type { ComponentProps, ReactElement } from 'react'
import type { DateRangeValueProps, DateValueFormat, DateValueProps } from '../__builtins__/date-value'
import { mapProps } from '@silver-formily/react'
import { DatePicker as AntdDatePicker } from 'antd'
import { connectControl, mapLoadingIcon, mapReadPrettyControl } from '../__builtins__/connect-control'
import { mapDateValue } from '../__builtins__/date-value'
import { PreviewText } from '../preview-text'

export type { DateValueFormat } from '../__builtins__/date-value'
export type DatePickerProps<F extends DateValueFormat = string, M extends boolean = false> = DateValueProps<NativeDatePickerProps<Dayjs, M>, F, M>
export type RangePickerProps<F extends DateValueFormat = string> = DateRangeValueProps<ComponentProps<typeof AntdDatePicker.RangePicker>, F>
type SinglePicker = <F extends DateValueFormat = string, M extends boolean = false>(props: DatePickerProps<F, M>) => ReactElement
type FixedPicker = <F extends DateValueFormat = string, M extends boolean = false>(props: Omit<DatePickerProps<F, M>, 'picker'>) => ReactElement
type DateTimePicker = <F extends DateValueFormat = string, M extends boolean = false>(props: DateValueProps<ComponentProps<typeof AntdDatePicker.TimePicker>, F, M>) => ReactElement
type RangePicker = <F extends DateValueFormat = string>(props: RangePickerProps<F>) => ReactElement
export type DatePickerComponent = SinglePicker & Omit<typeof AntdDatePicker, 'WeekPicker' | 'MonthPicker' | 'YearPicker' | 'QuarterPicker' | 'TimePicker' | 'RangePicker'> & {
  WeekPicker: FixedPicker
  MonthPicker: FixedPicker
  YearPicker: FixedPicker
  QuarterPicker: FixedPicker
  TimePicker: DateTimePicker
  RangePicker: RangePicker
}

export const DatePicker = Object.assign(connectControl(AntdDatePicker, mapDateValue(), mapLoadingIcon(), mapReadPrettyControl(PreviewText.DatePicker)), {
  WeekPicker: connectControl(AntdDatePicker.WeekPicker, mapDateValue('week'), mapLoadingIcon(), mapReadPrettyControl(PreviewText.DatePicker, { picker: 'week' })),
  MonthPicker: connectControl(AntdDatePicker.MonthPicker, mapDateValue('month'), mapLoadingIcon(), mapReadPrettyControl(PreviewText.DatePicker, { picker: 'month' })),
  YearPicker: connectControl(AntdDatePicker.YearPicker, mapDateValue('year'), mapLoadingIcon(), mapReadPrettyControl(PreviewText.DatePicker, { picker: 'year' })),
  QuarterPicker: connectControl(AntdDatePicker.QuarterPicker, mapDateValue('quarter'), mapLoadingIcon(), mapReadPrettyControl(PreviewText.DatePicker, { picker: 'quarter' })),
  TimePicker: connectControl(AntdDatePicker.TimePicker, mapDateValue('time'), mapLoadingIcon(), mapReadPrettyControl(PreviewText.TimePicker, { picker: 'time' })),
  RangePicker: connectControl(AntdDatePicker.RangePicker, mapDateValue(), mapProps(props => ({ id: typeof props.id === 'string' ? { start: props.id, end: `${props.id}-end` } : props.id })), mapLoadingIcon(), mapReadPrettyControl(PreviewText.DateRangePicker)),
}) as unknown as DatePickerComponent
export default DatePicker
