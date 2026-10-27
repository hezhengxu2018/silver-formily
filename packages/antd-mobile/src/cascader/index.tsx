import type { CascaderProps as AntCascaderProps } from 'antd-mobile'
import type { CascaderOption, CascaderValue, CascaderValueExtend } from 'antd-mobile/es/components/cascader-view'
import { isField } from '@silver-formily/core'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { Cascader as AntCascader } from 'antd-mobile'
import cls from 'classnames'
import { Fragment, useMemo } from 'react'
import { PopupTrigger, usePopupPicker, usePrefixCls } from '../__builtins__'
import { PreviewText } from '../preview-text'
import './style.less'

export interface ICascaderProps extends Omit<AntCascaderProps, 'defaultValue' | 'visible' | 'children'> {
  onChange?: AntCascaderProps['onConfirm']
  /** Allow trigger content to wrap instead of scrolling horizontally. */
  triggerWrap?: boolean
  disabled?: boolean
  readOnly?: boolean
  displayRender?: (labels: React.ReactNode[], selectedOptions: (CascaderOption | null)[]) => React.ReactNode
}

function getSelection(value: CascaderValue[], props: ICascaderProps) {
  const valueName = props.fieldNames?.value ?? 'value'
  const childrenName = props.fieldNames?.children ?? 'children'
  let current = props.options ?? []
  return value.map((item) => {
    const selected = current.find(option => option[valueName] === item) ?? null
    current = selected?.[childrenName] ?? []
    return selected
  })
}

function displayValue(value: CascaderValue[], props: ICascaderProps) {
  const items = getSelection(value, props)
  const labels = items.map((item, index) => item?.[props.fieldNames?.label ?? 'label'] ?? value[index])
  if (props.displayRender)
    return props.displayRender(labels, items)
  return labels.map((label, index) => (
    <Fragment key={index}>
      {index > 0 && ' / '}
      {label}
    </Fragment>
  ))
}

function CascaderPreview(props: ICascaderProps) {
  const prefix = usePrefixCls('formily-cascader')
  const placeholder = PreviewText.usePlaceholder()
  const value = props.value ?? []
  const empty = value.length === 0 || value.every(item => item === null)
  const display = displayValue(value, props)
  return <span className={cls(prefix, props.className)} style={props.style}>{empty ? placeholder : display}</span>
}

function BaseCascader(props: ICascaderProps) {
  const prefix = usePrefixCls('formily-cascader')
  const value = props.value ?? []
  const disabled = !!props.disabled
  const readOnly = !!props.readOnly
  const options = useMemo(() => {
    if (!readOnly)
      return props.options
    const childrenName = props.fieldNames?.children ?? 'children'
    const disabledName = props.fieldNames?.disabled ?? 'disabled'
    function disableOptions(items: CascaderOption[]): CascaderOption[] {
      // Keep the native loading sentinel's identity for async options.
      if (items === AntCascader.optionSkeleton)
        return items
      return items.map((item) => {
        const children = item[childrenName]
        return {
          ...item,
          [disabledName]: true,
          ...(children ? { [childrenName]: disableOptions(children) } : {}),
        }
      })
    }
    return disableOptions(props.options ?? [])
  }, [props.options, props.fieldNames, readOnly])
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
    onConfirm: (next: CascaderValue[], extend: CascaderValueExtend) => {
      props.onChange?.(next, extend)
      props.onConfirm?.(next, extend)
    },
  })
  const display = displayValue(value, props)
  const empty = value.length === 0 || value.every(item => item === null)
  return (
    <div className={cls(prefix, { 'adm-list-item-disabled': disabled }, props.className)} style={props.style}>
      <AntCascader
        {...nativeProps}
        options={options}
        placeholder={props.placeholder}
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

export const Cascader = connect(
  BaseCascader,
  mapReadPretty(CascaderPreview),
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
export default Cascader
