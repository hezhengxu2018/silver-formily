import type { TooltipProps } from 'antd'
import type { CSSProperties, ReactNode } from 'react'
import type { IFormItemProps } from './types'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { isVoidField } from '@silver-formily/core'
import { connect, mapProps } from '@silver-formily/react'
import { ConfigProvider, Popover, Tooltip } from 'antd'
import cls from 'classnames'
import { isValidElement, useContext, useEffect, useId, useRef, useState } from 'react'
import { ControlContext, pickDataProps, usePrefixCls, useTokenStyle } from '../__builtins__'
import { FormLayoutShallowContext, useFormLayout } from '../form-layout'
import './style.css'

export type { IFormItemProps } from './types'

export function BaseItem({ children, ...props }: IFormItemProps) {
  const inherited = useFormLayout()
  const settings: IFormItemProps & { requiredMark?: boolean | 'optional' } = { ...inherited, ...Object.fromEntries(Object.entries(props).filter(([, value]) => value !== undefined)) }
  const {
    label,
    labelFor,
    labelStyle,
    wrapperStyle,
    labelWidth,
    wrapperWidth,
    labelCol,
    wrapperCol,
    labelAlign = 'right',
    wrapperAlign = 'left',
    labelWrap,
    wrapperWrap,
    layout = 'horizontal',
    colon = true,
    asterisk,
    requiredMark = true,
    optionalMarkHidden,
    extra,
    feedbackText,
    feedbackLayout = 'loose',
    feedbackStatus,
    feedbackIcon,
    enableOutlineFeedback = true,
    tooltip,
    tooltipLayout = 'icon',
    tooltipIcon,
    getPopupContainer,
    fullness,
    size,
  } = settings
  const prefix = usePrefixCls('formily-item', props)
  const generatedId = useId()
  const controlId = labelFor ?? generatedId
  const tokenStyle = useTokenStyle(size)
  const { locale } = useContext(ConfigProvider.ConfigContext)
  const labelRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [overflow, setOverflow] = useState(false)
  useEffect(() => {
    const element = labelRef.current
    const content = textRef.current
    if (!element || !content)
      return
    const update = () => setOverflow(!labelWrap && content.getBoundingClientRect().width > element.clientWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    observer.observe(content)
    return () => observer.disconnect()
  }, [label, labelWrap, layout])
  const hasLabel = label !== undefined && label !== null && label !== false && label !== ''
  const feedbackVisible = feedbackText !== undefined && feedbackText !== null && feedbackText !== ''
  const tooltipProps: TooltipProps = tooltip && typeof tooltip === 'object' && !isValidElement(tooltip) && !Array.isArray(tooltip)
    ? tooltip as TooltipProps
    : { title: tooltip as ReactNode }
  const title = tooltipProps.title
  const tooltipContent = typeof title === 'function' ? title() : title
  const colMode = !labelWidth && !wrapperWidth && layout !== 'vertical'
  const labelSizing: CSSProperties = {
    ...(colMode && labelCol !== undefined ? { flex: `0 0 ${labelCol / 24 * 100}%`, maxWidth: `${labelCol / 24 * 100}%` } : {}),
    ...(labelWidth !== undefined ? { width: labelWidth, flexShrink: 0 } : {}),
    ...labelStyle,
  }
  const controlSizing: CSSProperties = {
    ...(colMode && wrapperCol !== undefined ? { flex: `0 0 ${wrapperCol / 24 * 100}%`, maxWidth: `${wrapperCol / 24 * 100}%` } : {}),
    ...(wrapperWidth !== undefined ? { width: wrapperWidth, flex: 'none' } : {}),
    ...wrapperStyle,
  }
  const status = enableOutlineFeedback && (feedbackStatus === 'error' || feedbackStatus === 'warning') ? feedbackStatus : undefined
  const control = (
    <ControlContext.Provider value={{ id: controlId, size, status }}>
      <ConfigProvider variant={props.variant ?? (feedbackIcon ? 'borderless' : undefined)}>
        <FormLayoutShallowContext.Provider value={null}>{children}</FormLayoutShallowContext.Provider>
      </ConfigProvider>
    </ControlContext.Provider>
  )
  const labelContent = (
    <div className="sf-item-label-content" ref={labelRef}>
      <span ref={textRef}>
        {asterisk && requiredMark === true && <span className="sf-item-asterisk">*</span>}
        <label htmlFor={controlId}>{label === ' ' ? '\u00A0' : label}</label>
        {!asterisk && requiredMark === 'optional' && !optionalMarkHidden && <span className="sf-item-optional">{locale?.Form?.optional ?? '(optional)'}</span>}
      </span>
    </div>
  )
  return (
    <div
      {...pickDataProps(props)}
      data-grid-span={props.gridSpan}
      className={cls('sf-item', prefix, `sf-item-${layout}`, `sf-item-feedback-${feedbackLayout}`, {
        'sf-item-fullness': fullness,
        'sf-item-outline': enableOutlineFeedback,
        'sf-item-feedback-border': feedbackIcon,
        'sf-item-label-wrap': labelWrap,
        'sf-item-wrapper-wrap': wrapperWrap,
        'sf-item-feedback-visible': feedbackVisible,
        [`sf-item-${feedbackStatus}`]: feedbackStatus,
        [`sf-item-size-${size}`]: size,
      }, props.className)}
      style={{ ...tokenStyle, ...props.style }}
    >
      {hasLabel && (
        <div className="sf-item-label" style={{ justifyContent: layout === 'vertical' ? 'flex-start' : labelAlign === 'right' ? 'flex-end' : 'flex-start', ...labelSizing }}>
          {(overflow || (tooltip && tooltipLayout === 'text'))
            ? (
                <Tooltip
                  {...tooltipProps}
                  title={overflow
                    ? (
                        <>
                          {label}
                          {tooltipContent && <div>{tooltipContent as ReactNode}</div>}
                        </>
                      )
                    : tooltipContent}
                  getPopupContainer={getPopupContainer}
                >
                  {labelContent}
                </Tooltip>
              )
            : labelContent}
          {tooltip && tooltipLayout === 'icon' && !overflow && <Tooltip {...tooltipProps} getPopupContainer={getPopupContainer}><span className="sf-item-tooltip">{tooltipIcon ?? <QuestionCircleOutlined />}</span></Tooltip>}
          {label !== ' ' && colon && <span className="sf-item-colon">:</span>}
        </div>
      )}
      <div className="sf-item-control" style={controlSizing}>
        <div className="sf-item-content" style={{ justifyContent: wrapperAlign === 'right' ? 'flex-end' : 'flex-start' }}>
          {props.addonBefore !== undefined && <span className="sf-item-addon">{props.addonBefore}</span>}
          <div className="sf-item-component">
            {feedbackLayout === 'popover'
              ? <Popover open={feedbackVisible} content={feedbackText} getPopupContainer={getPopupContainer}><div>{control}</div></Popover>
              : control}
          </div>
          {feedbackIcon && <span className="sf-item-feedback-icon">{feedbackIcon}</span>}
          {props.addonAfter !== undefined && <span className="sf-item-addon">{props.addonAfter}</span>}
        </div>
        {feedbackVisible && feedbackLayout !== 'popover' && feedbackLayout !== 'none' && <div className="sf-item-help" role={feedbackStatus === 'error' ? 'alert' : undefined}>{feedbackText}</div>}
        {extra !== undefined && <div className="sf-item-extra">{extra}</div>}
      </div>
    </div>
  )
}

export const FormItem = Object.assign(connect(BaseItem, mapProps((props, field) => {
  if (!field)
    return props
  if (isVoidField(field)) {
    return {
      label: props.label !== undefined ? props.label : field.title,
      extra: props.extra !== undefined ? props.extra : field.description,
    }
  }
  const message = field.validating ? undefined : [field.selfErrors, field.selfWarnings, field.selfSuccesses].find(messages => messages.length)?.join(', ')
  return {
    label: props.label !== undefined ? props.label : field.title,
    labelFor: props.labelFor ?? field.componentProps.id,
    extra: props.extra !== undefined ? props.extra : field.description,
    asterisk: props.asterisk ?? (field.required && field.pattern !== 'readPretty'),
    optionalMarkHidden: props.optionalMarkHidden ?? (field.pattern === 'readPretty' && props.asterisk === undefined),
    feedbackStatus: props.feedbackStatus ?? (field.validating || field.validateStatus === 'validating' ? 'pending' : field.validateStatus),
    feedbackText: props.feedbackText !== undefined ? props.feedbackText : message,
  }
})), { BaseItem })

export default FormItem
