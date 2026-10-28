import type { ReactNode } from 'react'
import type { ICheckListProps, ICheckListValue } from '../check-list'
import type { PopupContentCallbacks, PopupOptions } from '../create-popup'
import { isField } from '@silver-formily/core'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { Tag } from 'antd-mobile'
import cls from 'classnames'
import { Fragment, useEffect, useRef, useState } from 'react'
import { PopupTrigger, usePopupPicker, usePrefixCls } from '../__builtins__'
import { CheckList } from '../check-list'
import { createPopup } from '../create-popup'
import { PreviewText } from '../preview-text'
import { Space } from '../space'
import 'antd-mobile/es/components/picker'
import './style.less'

export interface ICheckListPickerProps extends Omit<ICheckListProps, 'defaultValue' | 'children'> {
  /** Allow trigger content to wrap instead of scrolling horizontally. */
  triggerWrap?: boolean
  placeholder?: ReactNode
  confirmText?: ReactNode
  cancelText?: ReactNode
  onConfirm?: (value: ICheckListValue[]) => void
  onCancel?: () => void
  onClose?: () => void
  popupProps?: PopupOptions
  displayRender?: (value: ICheckListValue[], props: ICheckListPickerProps) => ReactNode
}

function displayValue(props: ICheckListPickerProps) {
  const value = props.value ?? []
  if (props.displayRender)
    return props.displayRender(value, props)
  const labels = value.map((item) => {
    const option = props.options?.find(option => (typeof option === 'object' ? option.value : option) === item)
    const label = typeof option === 'object' ? option.label : option ?? item
    return props.multiple ? <Tag key={`${typeof item}:${item}`} style={{ fontSize: 'inherit' }}>{label}</Tag> : label
  })
  return props.multiple
    ? <Space direction="horizontal" wrap={props.triggerWrap ?? false} size={4}>{labels}</Space>
    : labels.map((label, index) => (
        <Fragment key={index}>
          {index > 0 && ' / '}
          {label}
        </Fragment>
      ))
}

function PickerPreview(props: ICheckListPickerProps) {
  const placeholder = PreviewText.usePlaceholder()
  return <span className={props.className} style={props.style}>{props.value?.length ? displayValue(props) : placeholder}</span>
}

function PopupContent({ picker, onConfirm, onCancel }: { picker: ICheckListPickerProps } & PopupContentCallbacks<ICheckListValue[]>) {
  const [draft, setDraft] = useState(picker.value ?? [])
  return (
    <div className="adm-picker adm-formily-check-list-picker-popup">
      {picker.multiple && (
        <div className="adm-picker-header">
          <a
            role="button"
            tabIndex={0}
            className="adm-picker-header-button"
            onClick={onCancel}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onCancel()
              }
            }}
          >
            {picker.cancelText ?? '取消'}
          </a>
          <a
            role="button"
            tabIndex={0}
            className="adm-picker-header-button"
            onClick={() => onConfirm(draft)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onConfirm(draft)
              }
            }}
          >
            {picker.confirmText ?? '确定'}
          </a>
        </div>
      )}
      <div className="adm-formily-check-list-picker-options">
        <CheckList
          options={picker.options}
          value={draft}
          onChange={(value) => {
            if (picker.multiple)
              setDraft(value)
            else
              onConfirm(value)
          }}
          multiple={picker.multiple}
          disabled={picker.disabled}
          readOnly={picker.readOnly}
          activeIcon={picker.activeIcon}
          extra={picker.extra}
          mode={picker.mode}
        />
      </div>
    </div>
  )
}

function BaseCheckListPicker(props: ICheckListPickerProps) {
  const prefix = usePrefixCls('formily-check-list-picker')
  const latest = useRef(props)
  latest.current = props
  const popup = usePopupPicker({
    disabled: props.disabled,
    readOnly: props.readOnly,
    onConfirm: (value: ICheckListValue[]) => {
      latest.current.onChange?.(value)
      latest.current.onConfirm?.(value)
    },
    onClose: () => latest.current.onClose?.(),
    afterClose: () => latest.current.popupProps?.afterClose?.(),
  })
  useEffect(() => {
    if (!popup.visible)
      return
    const picker = latest.current
    const controller = createPopup(PopupContent, { ...picker.popupProps, className: cls('adm-picker-popup', 'adm-formily-check-list-picker-popup-container', picker.popupProps?.className), afterClose: popup.afterClose })
    let disposed = false
    // createPopup uses flushSync, so mount its root outside React's commit phase.
    queueMicrotask(() => {
      if (disposed)
        return
      void controller.prompt({
        picker,
        onConfirm: popup.onConfirm,
        onCancel: () => latest.current.onCancel?.(),
        onClose: popup.onClose,
      })
    })
    return () => {
      disposed = true
      controller.close()
    }
  }, [popup.visible, popup.onConfirm, popup.onClose, popup.afterClose])
  return (
    <div className={cls(prefix, { 'adm-list-item-disabled': props.disabled }, props.className)} style={props.style}>
      <PopupTrigger
        triggerWrap={props.triggerWrap}
        ref={popup.button}
        type="button"
        className={`${prefix}-trigger`}
        disabled={props.disabled}
        data-form-item-trigger=""
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-labelledby']}
        onClick={(event) => {
          event.stopPropagation()
          popup.open()
        }}
      >
        {props.value?.length ? displayValue(props) : props.placeholder ?? '请选择'}
      </PopupTrigger>
    </div>
  )
}

export const CheckListPicker = connect(
  BaseCheckListPicker,
  mapReadPretty(PickerPreview),
  mapProps({ dataSource: 'options' }, (props, field) => ({
    ...props,
    'aria-label': props['aria-label'] ?? (typeof field?.title === 'string' ? field.title : undefined),
    'options': props.options ?? [],
    'value': isField(field) ? field.value ?? [] : props.value ?? [],
    'disabled': props.disabled || field?.disabled,
    'readOnly': props.readOnly || field?.readOnly,
  })),
)
export default CheckListPicker
