import type { CascadePickerProps as AntCascadePickerProps, CascadePickerOption } from 'antd-mobile/es/components/cascade-picker'
import type { PickerValue, PickerValueExtend } from 'antd-mobile/es/components/picker'
import { isField } from '@silver-formily/core'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { CascadePicker as AntCascadePicker } from 'antd-mobile'
import cls from 'classnames'
import { Fragment } from 'react'
import { usePopupPicker, usePrefixCls } from '../__builtins__'
import { PreviewText } from '../preview-text'
import './style.less'

export interface ICascadePickerProps extends Omit<AntCascadePickerProps, 'defaultValue' | 'visible' | 'children'> {
  onChange?: AntCascadePickerProps['onConfirm']
  placeholder?: React.ReactNode
  disabled?: boolean
  readOnly?: boolean
  displayRender?: (labels: React.ReactNode[], selectedOptions: (CascadePickerOption | null)[]) => React.ReactNode
}

function getSelection(value: PickerValue[], options: CascadePickerOption[]) {
  let current = options
  return value.map((item) => {
    const selected = current.find(option => option.value === item) ?? null
    current = selected?.children ?? []
    return selected
  })
}

function displayValue(value: PickerValue[], props: ICascadePickerProps) {
  const items = getSelection(value, props.options ?? [])
  const labels = items.map((item, index) => item?.label ?? value[index])
  if (props.displayRender)
    return props.displayRender(labels, items)
  return labels.map((label, index) => (
    <Fragment key={index}>
      {index > 0 && ' / '}
      {label}
    </Fragment>
  ))
}

function PickerPreview(props: ICascadePickerProps) {
  const prefix = usePrefixCls('formily-cascade-picker')
  const placeholder = PreviewText.usePlaceholder()
  const value = props.value ?? []
  const empty = value.length === 0 || value.every(item => item === null)
  const display = displayValue(value, props)
  return <span className={cls(prefix, props.className)} style={props.style}>{empty ? placeholder : display}</span>
}

export function BasePicker(props: ICascadePickerProps) {
  const prefix = usePrefixCls('formily-cascade-picker')
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
      props.onChange?.(next, extend)
      props.onConfirm?.(next, extend)
    },
  })
  const display = displayValue(value, props)
  const empty = value.length === 0 || value.every(item => item === null)
  return (
    <div className={cls(prefix, { 'adm-list-item-disabled': disabled }, props.className)} style={props.style}>
      <AntCascadePicker
        {...nativeProps}
        popupClassName={cls(props.popupClassName, readOnly && `${prefix}-readonly-popup`)}
        value={value}
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
        {empty ? props.placeholder ?? '请选择' : display}
      </button>
    </div>
  )
}

export const CascadePicker = connect(
  BasePicker,
  mapReadPretty(PickerPreview),
  mapProps(
    { dataSource: 'options' },
    (props, field) => ({
      ...props,
      'aria-label': props['aria-label'] ?? (typeof field?.title === 'string' ? field.title : undefined),
      'options': props.options ?? [],
      'value': isField(field) ? field.value ?? [] : props.value ?? [],
      'disabled': props.disabled || field?.disabled,
      'readOnly': props.readOnly || field?.readOnly,
    }),
  ),
)
export default CascadePicker
