import type { CalendarPickerProps as NativeProps } from 'antd-mobile/es/components/calendar-picker'
import type { Dayjs } from 'dayjs'
import type { ReactNode } from 'react'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { CalendarPicker as NativeCalendarPicker } from 'antd-mobile'
import cls from 'classnames'
import { useState } from 'react'
import { dayjsable, formatDayjsValue, PopupTrigger, usePopupPicker, usePrefixCls } from '../__builtins__'
import { PreviewText } from '../preview-text'
import './style.less'

export type ICalendarPickerValue = string | Date | Dayjs

interface CalendarPickerCommonProps extends Omit<NativeProps, 'selectionMode' | 'value' | 'defaultValue' | 'onChange' | 'onConfirm' | 'visible'> {
  placeholder?: ReactNode
  format?: string | ((value: Dayjs) => string)
  disabled?: boolean
  readOnly?: boolean
}

export type ICalendarPickerProps = CalendarPickerCommonProps & ({
  selectionMode?: 'single'
  value?: ICalendarPickerValue | null
  onChange?: (value: string | null) => void
  onConfirm?: (value: Date | null) => void
} | {
  selectionMode: 'range'
  value?: [ICalendarPickerValue, ICalendarPickerValue] | null
  onChange?: (value: [string, string] | null) => void
  onConfirm?: (value: [Date, Date] | null) => void
})

function displayValue(props: ICalendarPickerProps) {
  const format = props.format ?? 'YYYY-MM-DD'
  if (!props.value)
    return ''
  const display = (value: ICalendarPickerValue) => formatDayjsValue(dayjsable(value, typeof format === 'string' ? format : undefined), format, '')
  return props.selectionMode === 'range'
    ? props.value.map(display).join(' ~ ')
    : display(props.value)
}

function CalendarPickerPreview(props: ICalendarPickerProps) {
  const placeholder = PreviewText.usePlaceholder()
  return <span className={props.className} style={props.style}>{displayValue(props) || placeholder}</span>
}

export function BaseCalendarPicker(props: ICalendarPickerProps) {
  const prefix = usePrefixCls('formily-calendar-picker')
  const {
    value: _value,
    selectionMode = 'single',
    onChange: _onChange,
    onConfirm: _onConfirm,
    placeholder = '请选择',
    format = 'YYYY-MM-DD',
    disabled = false,
    readOnly = false,
    className,
    style,
    onClose,
    ...nativeProps
  } = props
  const [draft, setDraft] = useState<Date | [Date, Date] | null>(null)
  const popup = usePopupPicker({
    disabled,
    readOnly,
    onClose,
    onConfirm: (next: Date | [Date, Date] | null) => {
      const display = (date: Date) => formatDayjsValue(date, format, '')
      if (props.selectionMode === 'range') {
        const range = Array.isArray(next) ? next : null
        props.onChange?.(range ? [display(range[0]), display(range[1])] : null)
        props.onConfirm?.(range)
      }
      else {
        const date = next instanceof Date ? next : null
        props.onChange?.(date ? display(date) : null)
        props.onConfirm?.(date)
      }
    },
  })
  const pickerProps = selectionMode === 'range'
    ? { selectionMode, value: Array.isArray(draft) ? draft : null, onChange: setDraft }
    : { selectionMode, value: draft instanceof Date ? draft : null, onChange: setDraft }

  return (
    <div className={cls(prefix, { 'adm-list-item-disabled': disabled }, className)} style={style}>
      <NativeCalendarPicker
        {...nativeProps}
        {...pickerProps}
        popupClassName={cls(props.popupClassName, readOnly && `${prefix}-readonly-popup`)}
        visible={popup.visible}
        onConfirm={popup.onConfirm}
        onClose={() => {
          popup.onClose()
          popup.afterClose()
        }}
      />
      <PopupTrigger
        ref={popup.button}
        type="button"
        className={`${prefix}-trigger`}
        disabled={disabled}
        data-form-item-trigger=""
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        onClick={(event) => {
          event.stopPropagation()
          const parse = (value: ICalendarPickerValue) => dayjsable(value, typeof format === 'string' ? format : undefined)!.toDate()
          setDraft(props.value ? props.selectionMode === 'range' ? [parse(props.value[0]), parse(props.value[1])] : parse(props.value) : null)
          popup.open()
        }}
      >
        {displayValue(props) || placeholder}
      </PopupTrigger>
    </div>
  )
}

export const CalendarPicker = connect(
  BaseCalendarPicker,
  mapReadPretty(CalendarPickerPreview),
  mapProps((props, field) => ({
    ...props,
    'aria-label': props['aria-label'] ?? (typeof field?.title === 'string' ? field.title : undefined),
    'disabled': props.disabled || field?.disabled,
    'readOnly': props.readOnly || field?.readOnly,
  })),
)

export default CalendarPicker
