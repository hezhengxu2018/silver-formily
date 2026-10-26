import type { CascadePickerProps as AntCascadePickerProps, CascadePickerOption } from 'antd-mobile/es/components/cascade-picker'
import type { PickerValue, PickerValueExtend } from 'antd-mobile/es/components/picker'
import { isField } from '@silver-formily/core'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { CascadePicker as AntCascadePicker } from 'antd-mobile'
import cls from 'classnames'
import { Fragment, useCallback, useRef, useState } from 'react'
import { usePrefixCls } from '../__builtins__'
import { PreviewText } from '../preview-text'
import './style.less'

export type ICascadePickerProps = Omit<AntCascadePickerProps, 'value' | 'defaultValue' | 'visible' | 'children'> & {
  value?: PickerValue[]
  onChange?: (value: PickerValue[], extend: PickerValueExtend) => void
  onConfirm?: (value: PickerValue[], extend: PickerValueExtend) => void
  onCancel?: () => void
  onClose?: () => void
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
    readOnly: _readOnly,
    displayRender: _displayRender,
    className: _className,
    style: _style,
    onConfirm: _onConfirm,
    onClose,
    afterClose,
    ...nativeProps
  } = props
  const display = displayValue(value, props)
  const empty = value.length === 0 || value.every(item => item === null)
  return (
    <div className={cls(prefix, { 'adm-list-item-disabled': disabled }, props.className)} style={props.style}>
      <AntCascadePicker
        {...nativeProps}
        popupClassName={cls(props.popupClassName, readOnly && `${prefix}-readonly-popup`)}
        value={value}
        visible={visible}
        onConfirm={(next, extend) => {
          const current = latest.current
          if (!current.disabled && !current.readOnly) {
            current.props.onChange?.(next, extend)
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
      'readPretty': field?.readPretty,
    }),
  ),
)
export default CascadePicker
