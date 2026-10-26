import type { DatePickerProps as AntdDatePickerProps } from 'antd-mobile/es/components/date-picker'
import type { Dayjs } from 'dayjs'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { DatePicker as AntdDatePicker } from 'antd-mobile'
import cls from 'classnames'
import { useCallback, useRef, useState } from 'react'
import { dayjs, dayjsable, formatDayjsValue, usePrefixCls } from '../__builtins__'
import { PreviewText } from '../preview-text'
import QuarterDatePicker from './quarter-picker'
import './style.less'

type DateValue = string | Date | Dayjs | Dayjs[]

type PickerMode = 'date' | 'week' | 'month' | 'quarter' | 'year'

export type IDatePickerProps<PickerProps> = Omit<
  PickerProps,
  'value' | 'defaultValue' | 'visible' | 'children' | 'onChange'
> & {
  placeholder?: string
  picker?: PickerMode
  format?:
    | string
    | ((value: Dayjs) => string)
    | (string | ((value: Dayjs) => string)[])
  showTime?: boolean
  value?: DateValue
  onChange?: (value: DateValue) => void
  disabled?: boolean
  readOnly?: boolean
}

export type RangePickerProps = Record<string, never>

function mapDateFormat<T>() {
  const getDefaultFormat = (props: IDatePickerProps<T>) => {
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
  return (props: any): IDatePickerProps<T> => {
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
        : dayjsable(props.value, format),
      onChange: (value: DateValue) => {
        if (onChange) {
          onChange(formatDayjsValue(value, format))
        }
      },
    } as IDatePickerProps<T>
  }
}

function DatePickerPreview(props: IDatePickerProps<AntdDatePickerProps>) {
  return <PreviewText.DatePicker {...mapDateFormat<AntdDatePickerProps>()(props)} />
}

export function BaseDatePicker(props: IDatePickerProps<AntdDatePickerProps>) {
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
  } = mapDateFormat<AntdDatePickerProps>()(props)
  const button = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)
  const active = useRef(false)
  const latest = useRef({ disabled, readOnly, onChange, onConfirm })
  latest.current = { disabled, readOnly, onChange, onConfirm }
  const open = useCallback(() => {
    if (latest.current.disabled || active.current)
      return
    active.current = true
    setVisible(true)
  }, [])
  const precision = picker ?? _precision ?? (showTime ? 'second' : 'day')
  const NativePicker = precision === 'quarter' ? QuarterDatePicker : AntdDatePicker
  const val = formatDayjsValue(value, format, '')

  return (
    <div className={cls(prefix, { 'adm-list-item-disabled': disabled }, className)} style={style}>
      <NativePicker
        {...dateProps}
        className={cls(readOnly && `${prefix}-readonly-popup`)}
        precision={precision === 'date' ? 'day' : precision as AntdDatePickerProps['precision']}
        value={(value as Dayjs)?.toDate()}
        visible={visible}
        onConfirm={(next) => {
          const current = latest.current
          if (!current.disabled && !current.readOnly) {
            current.onChange?.(next)
            current.onConfirm?.(next)
          }
        }}
        onClose={() => {
          setVisible(false)
          onClose?.()
        }}
        afterClose={() => {
          active.current = false
          button.current?.focus()
          afterClose?.()
        }}
      />
      <button
        ref={button}
        type="button"
        className={`${prefix}-trigger`}
        disabled={disabled}
        data-form-item-trigger=""
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        onClick={(event) => {
          event.stopPropagation()
          open()
        }}
      >
        {val ? Array.isArray(val) ? val.join('~') : val : placeholder ?? '请选择'}
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
