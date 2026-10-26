import type { PickerProps as AntPickerProps, PickerColumn, PickerColumnItem, PickerValue, PickerValueExtend } from 'antd-mobile/es/components/picker'
import { isField } from '@silver-formily/core'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { Picker as AntPicker } from 'antd-mobile'
import cls from 'classnames'
import { Fragment, useCallback, useRef, useState } from 'react'
import { usePrefixCls } from '../__builtins__'
import { PreviewText } from '../preview-text'
import './style.less'

export type IPickerProps = Omit<AntPickerProps, 'value' | 'defaultValue' | 'visible' | 'children'> & {
  value?: PickerValue[]
  onChange?: (value: PickerValue[]) => void
  onConfirm?: (value: PickerValue[], extend: PickerValueExtend) => void
  onCancel?: () => void
  onClose?: () => void
  placeholder?: React.ReactNode
  disabled?: boolean
  readOnly?: boolean
  displayRender?: (value: PickerValue[], props: IPickerProps) => React.ReactNode
}

function getSelection(value: PickerValue[], columns: PickerColumn[] | ((value: PickerValue[]) => PickerColumn[])) {
  const raw = typeof columns === 'function' ? columns(value) : columns
  const normalized = (raw ?? []).map(column => column.map(item => typeof item === 'string' ? { label: item, value: item } : item))
  return { columns: normalized, items: value.map((item, index) => normalized[index]?.find(option => option.value === item) ?? null) }
}

function displayValue(value: PickerValue[], props: IPickerProps) {
  const { items } = getSelection(value, props.columns)
  return items.map((item: PickerColumnItem | null, index) => (
    <Fragment key={index}>
      {index > 0 && ' / '}
      {item?.label ?? value[index]}
    </Fragment>
  ))
}

function PickerPreview(props: IPickerProps) {
  const prefix = usePrefixCls('formily-picker')
  const placeholder = PreviewText.usePlaceholder()
  const value = props.value ?? []
  const empty = value.length === 0 || value.every(item => item === null)
  const display = props.displayRender ? props.displayRender(value, props) : displayValue(value, props)
  return <span className={cls(prefix, props.className)} style={props.style}>{empty ? placeholder : display}</span>
}

function BasePicker(props: IPickerProps) {
  const prefix = usePrefixCls('formily-picker')
  const button = useRef<HTMLButtonElement>(null)
  const value = props.value ?? []
  const disabled = !!props.disabled
  const readOnly = !!props.readOnly
  const [visible, setVisible] = useState(false)
  const active = useRef(false)
  const latest = useRef({ props, disabled, readOnly })
  latest.current = { props, disabled, readOnly }
  const open = useCallback(() => {
    if (latest.current.disabled || active.current)
      return
    active.current = true
    setVisible(true)
  }, [])
  const {
    value: _value,
    onChange: _onChange,
    placeholder: _placeholder,
    disabled: _disabled,
    displayRender: _displayRender,
    className: _className,
    style: _style,
    onConfirm: _onConfirm,
    onClose,
    afterClose,
    ...nativeProps
  } = props
  const display = props.displayRender ? props.displayRender(value, props) : displayValue(value, props)
  const empty = value.length === 0 || value.every(item => item === null)
  return (
    <div className={cls(prefix, { 'adm-list-item-disabled': disabled }, props.className)} style={props.style}>
      <AntPicker
        {...nativeProps}
        popupClassName={cls(props.popupClassName, readOnly && `${prefix}-readonly-popup`)}
        value={value}
        visible={visible}
        onConfirm={(next, extend) => {
          const current = latest.current
          if (!current.disabled && !current.readOnly) {
            current.props.onChange?.(next)
            current.props.onConfirm?.(next, extend)
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
        {empty ? props.placeholder ?? '请选择' : display}
      </button>
    </div>
  )
}

export const BasePopupPicker = BasePicker
export const Picker = connect(
  BasePicker,
  mapReadPretty(PickerPreview),
  mapProps(
    { dataSource: 'columns' },
    (props, field) => ({
      ...props,
      'aria-label': props['aria-label'] ?? (typeof field?.title === 'string' ? field.title : undefined),
      'columns': props.columns ?? [],
      'value': isField(field) ? field.value ?? [] : props.value ?? [],
      'disabled': props.disabled || field?.disabled,
      'readOnly': props.readOnly || field?.readOnly,
      'readPretty': field?.readPretty,
    }),
  ),
)
export default Picker
