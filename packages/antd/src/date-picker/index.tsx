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
type RangePicker = <F extends DateValueFormat = string>(props: RangePickerProps<F>) => ReactElement
export type DatePickerComponent = SinglePicker & Omit<typeof AntdDatePicker, 'WeekPicker' | 'MonthPicker' | 'YearPicker' | 'QuarterPicker' | 'TimePicker' | 'RangePicker'> & {
  WeekPicker: FixedPicker
  MonthPicker: FixedPicker
  YearPicker: FixedPicker
  QuarterPicker: FixedPicker
  RangePicker: RangePicker
}

export const DatePicker: DatePickerComponent = Object.assign(
  connectControl<typeof AntdDatePicker, Omit<DatePickerComponent, 'WeekPicker' | 'MonthPicker' | 'YearPicker' | 'QuarterPicker' | 'TimePicker' | 'RangePicker'> & SinglePicker>(AntdDatePicker, mapDateValue(), mapLoadingIcon(), mapReadPrettyControl(PreviewText.DatePicker)),
  {
    WeekPicker: connectControl<typeof AntdDatePicker.WeekPicker, FixedPicker>(
      AntdDatePicker.WeekPicker,
      mapDateValue('week'),
      mapLoadingIcon(),
      mapReadPrettyControl(PreviewText.DatePicker, { picker: 'week' }),
    ),
    MonthPicker: connectControl<typeof AntdDatePicker.MonthPicker, FixedPicker>(
      AntdDatePicker.MonthPicker,
      mapDateValue('month'),
      mapLoadingIcon(),
      mapReadPrettyControl(PreviewText.DatePicker, { picker: 'month' }),
    ),
    YearPicker: connectControl<typeof AntdDatePicker.YearPicker, FixedPicker>(
      AntdDatePicker.YearPicker,
      mapDateValue('year'),
      mapLoadingIcon(),
      mapReadPrettyControl(PreviewText.DatePicker, { picker: 'year' }),
    ),
    QuarterPicker: connectControl<typeof AntdDatePicker.QuarterPicker, FixedPicker>(
      AntdDatePicker.QuarterPicker,
      mapDateValue('quarter'),
      mapLoadingIcon(),
      mapReadPrettyControl(PreviewText.DatePicker, { picker: 'quarter' }),
    ),
    RangePicker: connectControl<typeof AntdDatePicker.RangePicker, RangePicker>(
      AntdDatePicker.RangePicker,
      mapDateValue(),
      mapProps(props => ({ id: typeof props.id === 'string' ? { start: props.id, end: `${props.id}-end` } : props.id })),
      mapLoadingIcon(),
      mapReadPrettyControl(PreviewText.DateRangePicker),
    ),
  },
)

export default DatePicker
