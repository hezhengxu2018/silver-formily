import type { DatePickerProps as AntdDatePickerProps } from 'antd-mobile/es/components/date-picker'
import type { Dayjs } from 'dayjs'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { DatePicker as AntdDatePicker } from 'antd-mobile'
import cls from 'classnames'
import { dayjs, dayjsable, formatDayjsValue, usePopupPicker, usePrefixCls } from '../__builtins__'
import { PreviewText } from '../preview-text'
import QuarterDatePicker from './quarter-picker'
import './style.less'

export type IDatePickerValue = string | Date | Dayjs

export type DatePickerMode = 'date' | 'week' | 'month' | 'quarter' | 'year'

export interface IDatePickerProps extends Omit<
  AntdDatePickerProps,
  'value' | 'defaultValue' | 'visible' | 'children' | 'onChange'
> {
  placeholder?: string
  picker?: DatePickerMode
  format?:
    | string
    | ((value: Dayjs) => string)
  showTime?: boolean
  value?: IDatePickerValue
  onChange?: (value: string) => void
  disabled?: boolean
  readOnly?: boolean
}

type NormalizedDatePickerProps = Omit<IDatePickerProps, 'value' | 'onChange'> & {
  value?: Dayjs
  onChange: (value: IDatePickerValue) => void
}

function getDefaultFormat(props: IDatePickerProps) {
  const picker = props.picker
  if (picker === 'month') {
    return 'YYYY-MM'
  }
  else if (picker === 'quarter') {
    return 'YYYY-[Q]Q'
  }
  else if (picker === 'year') {
    return 'YYYY'
  }
  else if (picker === 'week') {
    return 'GGGG-[W]WW'
  }
  return props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
}

function normalizeDatePickerProps(props: IDatePickerProps): NormalizedDatePickerProps {
  const format = props.format || getDefaultFormat(props)
  const onChange = props.onChange
  const week = typeof props.value === 'string' && format === 'GGGG-[W]WW'
    ? /^(\d{4})-W(\d{2})$/.exec(props.value)
    : null
  return {
    ...props,
    format,
    value: week
      ? dayjs(`${week[1]}-01-04`).isoWeek(Number(week[2])).startOf('isoWeek')
      : dayjsable(props.value, typeof format === 'string' ? format : undefined),
    onChange: (value: IDatePickerValue) => {
      if (onChange) {
        onChange(formatDayjsValue(value, format, ''))
      }
    },
  }
}

function DatePickerPreview(props: IDatePickerProps) {
  return <PreviewText.DatePicker {...normalizeDatePickerProps(props)} />
}

export function BaseDatePicker(props: IDatePickerProps) {
  const prefix = usePrefixCls('formily-date-picker')
  const {
    onChange,
    placeholder,
    value,
    format,
    style,
    className,
    disabled = false,
    readOnly = false,
    picker,
    showTime,
    precision: _precision,
    onConfirm,
    onClose,
    afterClose,
    ...dateProps
  } = normalizeDatePickerProps(props)
  const popup = usePopupPicker({
    disabled,
    readOnly,
    onClose,
    afterClose,
    onConfirm: (next: Date) => {
      onChange?.(next)
      onConfirm?.(next)
    },
  })
  const precision = picker ?? _precision ?? (showTime ? 'second' : 'day')
  const NativePicker = precision === 'quarter' ? QuarterDatePicker : AntdDatePicker
  const val = formatDayjsValue(value, format, '')

  return (
    <div className={cls(prefix, { 'adm-list-item-disabled': disabled }, className)} style={style}>
      <NativePicker
        {...dateProps}
        className={cls(readOnly && `${prefix}-readonly-popup`)}
        precision={precision === 'date' ? 'day' : precision}
        value={value?.toDate()}
        visible={popup.visible}
        onConfirm={popup.onConfirm}
        onClose={popup.onClose}
        afterClose={popup.afterClose}
      />
      <button
        ref={popup.button}
        type="button"
        className={`${prefix}-trigger`}
        disabled={disabled}
        data-form-item-trigger=""
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        onClick={(event) => {
          event.stopPropagation()
          popup.open()
        }}
      >
        {val || (placeholder ?? '请选择')}
      </button>
    </div>
  )
}

export const DatePicker = connect(
  BaseDatePicker,
  mapReadPretty(DatePickerPreview),
  mapProps((props, field) => ({
    ...props,
    'aria-label': props['aria-label'] ?? (typeof field?.title === 'string' ? field.title : undefined),
    'disabled': props.disabled || field?.disabled,
    'readOnly': props.readOnly || field?.readOnly,
  })),
)

export default DatePicker
