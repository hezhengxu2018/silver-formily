import type { DatePickerProps as AntdDatePickerProps } from 'antd-mobile/es/components/date-picker'
import type { VirtualInputRef } from 'antd-mobile/es/components/virtual-input'
import type { Dayjs } from 'dayjs'
import { connect, mapReadPretty } from '@silver-formily/react'
import { DatePicker as AntdDatePicker, VirtualInput } from 'antd-mobile'
import { CloseCircleFill } from 'antd-mobile-icons'
import cls from 'classnames'

import React, { useRef, useState } from 'react'
import { dayjsable, formatDayjsValue, usePrefixCls } from '../__builtins__'
import { PreviewText } from '../preview-text'
import QuarterDatePicker from './quarter-picker'

type DateValue = string | Date | Dayjs | Dayjs[]

type PickerMode = 'date' | 'week' | 'month' | 'quarter' | 'year'

export type IDatePickerProps<PickerProps> = Exclude<
  PickerProps,
  'value' | 'onChange'
> & {
  placeholder?: string
  clearable?: boolean
  picker?: PickerMode
  format?:
    | string
    | ((value: Dayjs) => string)
    | (string | ((value: Dayjs) => string)[])
  showTime?: boolean
  value: DateValue
  onChange: (value: DateValue) => void
}

export type RangePickerProps = Record<string, never>

type ComposedDatePicker = React.FC<AntdDatePickerProps> & {
  RangePicker?: React.FC<RangePickerProps>
}

function mapDateFormat<T>() {
  const getDefaultFormat = (props: IDatePickerProps<T>) => {
    const picker = props.picker
    if (picker === 'month') {
      return 'YYYY-MM'
    }
    else if (picker === 'quarter') {
      return 'YYYY-\\QQ'
    }
    else if (picker === 'year') {
      return 'YYYY'
    }
    else if (picker === 'week') {
      return 'gggg-wo'
    }
    return props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  }
  return (props: any): IDatePickerProps<T> => {
    const format = props.format || getDefaultFormat(props)
    const onChange = props.onChange
    return {
      ...props,
      format,
      value: dayjsable(props.value, format === 'gggg-wo' ? 'gggg-ww' : format),
      onChange: (value: DateValue) => {
        if (onChange) {
          onChange(formatDayjsValue(value, format))
        }
      },
    } as IDatePickerProps<T>
  }
}

export const BaseDatePicker: React.FC<IDatePickerProps<AntdDatePickerProps>> = (
  props,
) => {
  const prefix = usePrefixCls('formily-date-picker')
  const {
    onChange,
    placeholder,
    value,
    format,
    clearable,
    style,
    picker,
    precision: _precision,
    ...dateProps
  } = mapDateFormat<AntdDatePickerProps>()(props)
  const inputRef = useRef<VirtualInputRef>(null)
  const [visible, setVisible] = useState(false)

  const onDateChange = (value: Date) => {
    onChange?.(value)
  }

  const val = formatDayjsValue(value, format, '')

  const renderDatePicker = () => {
    const precision = picker ?? _precision

    const props = {
      ...dateProps,
      precision,
      visible,
      value: (value as Dayjs)?.toDate(),
      getContainer: null,
      onClose: () => {
        setVisible(false)
        inputRef.current?.focus()
      },
      onConfirm: onDateChange,
    }
    const Picker
      = (precision?.indexOf('quarter') ?? -1) > -1
        ? QuarterDatePicker
        : AntdDatePicker

    return <Picker {...(props as any)} />
  }

  return (
    <div className={cls(prefix)}>
      <VirtualInput
        placeholder={placeholder}
        value={Array.isArray(val) ? val.join('~') : val}
        ref={inputRef}
        style={{ '--caret-width': '1px', '--caret-color': '#666666', ...style }}
        onClick={() => {
          setVisible(true)
        }}
      />
      {clearable && value && (
        <div className={`${prefix}-clear`} onClick={() => onChange?.('')}>
          <CloseCircleFill />
        </div>
      )}
      {renderDatePicker()}
    </div>
  )
}

export const DatePicker: ComposedDatePicker = connect(
  BaseDatePicker,
  mapReadPretty(PreviewText.DatePicker),
) as ComposedDatePicker

/*
 DatePicker.RangePicker = connect(
 AntdDatePicker.RangePicker,
 mapProps(mapDateFormat()),
 mapReadPretty(PreviewText.DateRangePicker)
 )
 */

export default DatePicker
