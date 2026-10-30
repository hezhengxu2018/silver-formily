import type { IFormItemProps } from './types'
import { List } from 'antd-mobile'
import { CloseCircleFill } from 'antd-mobile-icons'
import cls from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { FormItemWrapperWrapContext, usePrefixCls } from '../__builtins__'
import { FormLayoutShallowContext } from '../form-layout'
import { FormItemFeedback } from './feedback'
import { FormItemLabel } from './label'
import { useFormItemLayout, widthStyle } from './layout'

export function BaseItem(props: IFormItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [hasTrigger, setHasTrigger] = useState(false)
  useEffect(() => {
    const content = contentRef.current
    if (!content)
      return
    const item = content.closest('[data-form-item]')
    setHasTrigger(Array.from(content.querySelectorAll('[data-form-item-trigger]'))
      .some(trigger => trigger.closest('[data-form-item]') === item))
  }, [])
  const resolved = useFormItemLayout(props)
  const {
    children,
    clearable,
    value,
    onClear,
    label,
    labelStyle,
    wrapperStyle,
    help,
    required,
    asterisk = required,
    feedbackStatus,
    feedbackText,
    extra,
    gridSpan,
    className,
    style,
    colon: _colon,
    layout: _layout,
    labelAlign: _labelAlign,
    wrapperAlign: _wrapperAlign,
    labelWrap: _labelWrap,
    wrapperWrap: _wrapperWrap,
    labelWidth: _labelWidth,
    wrapperWidth: _wrapperWidth,
    bordered: _bordered,
    tooltipLayout: _tooltipLayout,
    tooltipIcon: _tooltipIcon,
    tooltip,
    ...nativeProps
  } = props
  const { layout, labelAlign, wrapperAlign, labelWrap, wrapperWrap, bordered } = resolved
  const prefixCls = usePrefixCls('formily-item')
  // The horizontal column owns the width; applying percentages again to the label would shrink it twice.
  const labelWidth = layout === 'horizontal' && resolved.labelWidth !== undefined ? '100%' : resolved.labelWidth
  const labelNode = label !== undefined && label !== null && label !== false && label !== ''
    ? (
        <FormItemLabel
          prefixCls={prefixCls}
          label={label}
          colon={resolved.colon}
          labelAlign={labelAlign}
          labelStyle={{ ...labelStyle, ...widthStyle(labelWidth) }}
          asterisk={asterisk}
          tooltip={tooltip}
          tooltipLayout={resolved.tooltipLayout}
          tooltipIcon={resolved.tooltipIcon}
        />
      )
    : undefined
  const empty = value === undefined || value === null || value === ''
    || (Array.isArray(value) && (value.length === 0 || value.every(item => item === null || item === undefined)))
  const arrowIcon = props.arrowIcon !== undefined
    ? props.arrowIcon
    : clearable && !props.disabled && !empty && onClear
      ? (
          <button
            type="button"
            className={`${prefixCls}-clear`}
            aria-label="清除"
            onClick={(event) => {
              event.stopPropagation()
              onClear()
            }}
          >
            <CloseCircleFill />
          </button>
        )
      : props.arrow !== undefined ? props.arrow : hasTrigger ? true : clearable || props.clickable || props.onClick ? undefined : false
  const control = (
    <div ref={contentRef} className={`${prefixCls}-control-content-component`} style={{ ...wrapperStyle, ...widthStyle(resolved.wrapperWidth) }}>
      <FormLayoutShallowContext.Provider value={null}>
        <FormItemWrapperWrapContext.Provider value={wrapperWrap ?? false}>
          {children}
        </FormItemWrapperWrapContext.Provider>
      </FormLayoutShallowContext.Provider>
    </div>
  )
  return (
    <List.Item
      {...nativeProps}
      data-form-item=""
      arrowIcon={arrowIcon}
      clickable={props.clickable ?? !!props.onClick}
      onClick={!props.disabled
        ? (event) => {
            const target = event.target
            if (target instanceof Element && (target.closest('[data-form-item]') !== event.currentTarget.closest('[data-form-item]') || target.closest('button, a[href], input, select, textarea, [role="button"], [data-form-item-trigger], [data-popup-field-ignore]')))
              return
            props.onClick?.(event)
            if (event.defaultPrevented)
              return
            const triggers = Array.from(contentRef.current?.querySelectorAll<HTMLElement>('[data-form-item-trigger]') ?? [])
              .filter(trigger => trigger.closest('[data-form-item]') === event.currentTarget.closest('[data-form-item]'))
            if (triggers.length === 1) {
              triggers[0].click()
              return
            }
            if (triggers.length || !(target instanceof Element) || !target.closest(`.${prefixCls}-label`))
              return
            const inputs = Array.from(contentRef.current?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input:not([type="hidden"]):not(:disabled), textarea:not(:disabled)') ?? [])
              .filter(input => input.closest('[data-form-item]') === event.currentTarget.closest('[data-form-item]'))
            if (inputs.length === 1)
              inputs[0].focus()
          }
        : undefined}
      style={{
        ...(resolved.labelWidth !== undefined && layout === 'horizontal' ? { '--prefix-width': typeof resolved.labelWidth === 'number' ? `${resolved.labelWidth}px` : resolved.labelWidth } : {}),
        ...style,
      }}
      className={cls(prefixCls, `${prefixCls}-layout-${layout}`, `${prefixCls}-label-align-${labelAlign}`, `${prefixCls}-control-align-${wrapperAlign}`, {
        [`${prefixCls}-${feedbackStatus}`]: !!feedbackStatus,
        [`${prefixCls}-feedback-has-text`]: !!feedbackText,
        [`${prefixCls}-label-wrap`]: labelWrap,
        [`${prefixCls}-control-wrap`]: wrapperWrap,
        [`${prefixCls}-bordered-none`]: !bordered,
      }, className)}
      title={layout === 'vertical' ? labelNode : undefined}
      prefix={layout === 'horizontal' ? labelNode : undefined}
      extra={extra !== undefined && extra !== null && extra !== false && extra !== '' ? <div className={`${prefixCls}-extra`}>{extra}</div> : undefined}
      description={feedbackText || (help !== undefined && help !== null && help !== false && help !== '')
        ? (
            <>
              {!!feedbackText && <FormItemFeedback prefixCls={prefixCls} feedbackStatus={feedbackStatus} feedbackText={feedbackText} />}
              {help !== undefined && help !== null && help !== false && help !== '' && <div className={`${prefixCls}-help-text`}>{help}</div>}
            </>
          )
        : undefined}
      data-grid-span={gridSpan}
    >
      <div className={`${prefixCls}-control`}>
        <div className={`${prefixCls}-control-content`}>
          {control}
        </div>
      </div>
    </List.Item>
  )
}
