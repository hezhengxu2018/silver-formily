import type { PickerProps as AntPickerProps, PickerColumn, PickerColumnItem, PickerValue, PickerValueExtend } from 'antd-mobile/es/components/picker'
import { isField } from '@silver-formily/core'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { Picker as AntPicker } from 'antd-mobile'
import cls from 'classnames'
import { Fragment } from 'react'
import { PopupTrigger, usePopupPicker, usePrefixCls } from '../__builtins__'
import { PreviewText } from '../preview-text'
import './style.less'

export interface IPickerProps extends Omit<AntPickerProps, 'defaultValue' | 'visible' | 'children'> {
  onChange?: (value: PickerValue[]) => void
  /** Allow trigger content to wrap instead of scrolling horizontally. */
  triggerWrap?: boolean
  placeholder?: React.ReactNode
  disabled?: boolean
  readOnly?: boolean
  displayRender?: (value: PickerValue[], props: IPickerProps) => React.ReactNode
}

function getSelection(value: PickerValue[], columns: PickerColumn[] | ((value: PickerValue[]) => PickerColumn[])) {
  const raw = typeof columns === 'function' ? columns(value) : columns
  const normalized = (raw ?? []).map(column => column.map(item => typeof item === 'string' ? { label: item, value: item } : item))
  return { items: value.map((item, index) => normalized[index]?.find(option => option.value === item) ?? null) }
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
  const value = props.value ?? []
  const disabled = !!props.disabled
  const readOnly = !!props.readOnly
  const {
    value: _value,
    onChange: _onChange,
    placeholder: _placeholder,
    disabled: _disabled,
    readOnly: _readOnly,
    displayRender: _displayRender,
    triggerWrap: _triggerWrap,
    className: _className,
    style: _style,
    onConfirm: _onConfirm,
    onClose,
    afterClose,
    ...nativeProps
  } = props
  const popup = usePopupPicker({
    disabled,
    readOnly,
    onClose,
    afterClose,
    onConfirm: (next: PickerValue[], extend: PickerValueExtend) => {
      props.onChange?.(next)
      props.onConfirm?.(next, extend)
    },
  })
  const display = props.displayRender ? props.displayRender(value, props) : displayValue(value, props)
  const empty = value.length === 0 || value.every(item => item === null)
  return (
    <div className={cls(prefix, { 'adm-list-item-disabled': disabled }, props.className)} style={props.style}>
      <AntPicker
        {...nativeProps}
        popupClassName={cls(props.popupClassName, readOnly && `${prefix}-readonly-popup`)}
        value={value}
        visible={popup.visible}
        onConfirm={popup.onConfirm}
        onClose={popup.onClose}
        afterClose={popup.afterClose}
      />
      <PopupTrigger
        triggerWrap={props.triggerWrap}
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
        {empty ? props.placeholder ?? '请选择' : display}
      </PopupTrigger>
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
    }),
  ),
)
export default Picker
