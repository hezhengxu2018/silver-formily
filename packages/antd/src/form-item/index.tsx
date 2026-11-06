import type { TooltipProps } from 'antd'
import type { CSSProperties, ReactNode } from 'react'
import type { IFormItemProps } from './types'
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { isVoidField } from '@silver-formily/core'
import { connect, mapProps } from '@silver-formily/react'
import { ConfigProvider, Popover, Tooltip } from 'antd'
import cls from 'clsx'
import { isValidElement, useContext, useEffect, useId, useRef, useState } from 'react'
import { ControlContext, createBem, normalizeSize, pickDataProps, useTokenStyle } from '../__builtins__'
import { NativeFeedbackProvider, useFormItemFeedback } from '../__builtins__/feedback'
import { FormLayoutShallowContext, useFormLayout } from '../form-layout'
import './style.css'

const b = createBem('form-item')

export type { IFormItemProps } from './types'

const popoverIcons = {
  error: CloseCircleOutlined,
  warning: ExclamationCircleOutlined,
  success: CheckCircleOutlined,
}

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
    enableOutlineFeedback = true,
    tooltip,
    tooltipLayout = 'icon',
    tooltipIcon,
    getPopupContainer,
    fullness,
    size,
  } = settings
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
  const feedbackVisible = feedbackText !== undefined && feedbackText !== null && feedbackText !== false && feedbackText !== ''
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
  const PopoverIcon = feedbackStatus && feedbackStatus !== 'pending' ? popoverIcons[feedbackStatus] : undefined
  const feedback = useFormItemFeedback(settings)
  const control = (
    <ControlContext.Provider value={{ id: controlId }}>
      <ConfigProvider variant={props.variant} componentSize={normalizeSize(size)}>
        <NativeFeedbackProvider value={feedback.context}>
          <FormLayoutShallowContext.Provider value={null}>{children}</FormLayoutShallowContext.Provider>
        </NativeFeedbackProvider>
      </ConfigProvider>
    </ControlContext.Provider>
  )
  const labelContent = (
    <div className={b('label-content')} ref={labelRef}>
      <span ref={textRef}>
        {asterisk && requiredMark === true && <span className={b('asterisk')}>*</span>}
        <label htmlFor={controlId}>{label === ' ' ? '\u00A0' : label}</label>
        {!asterisk && requiredMark === 'optional' && !optionalMarkHidden && <span className={b('optional')}>{locale?.Form?.optional ?? '(optional)'}</span>}
      </span>
    </div>
  )
  return (
    <div
      {...pickDataProps(props)}
      data-grid-span={props.gridSpan}
      className={cls(b(), feedback.className, b({
        layout,
        'feedback-layout': feedbackLayout,
        'status': feedbackStatus,
        size,
        fullness,
        'outline': enableOutlineFeedback,
        'label-wrap': labelWrap,
        'wrapper-wrap': wrapperWrap,
        'feedback-visible': feedbackVisible,
      }), props.className)}
      style={{ ...tokenStyle, ...props.style }}
    >
      {hasLabel && (
        <div className={b('label')} style={{ justifyContent: layout === 'vertical' ? 'flex-start' : labelAlign === 'right' ? 'flex-end' : 'flex-start', ...labelSizing }}>
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
          {tooltip && tooltipLayout === 'icon' && !overflow && <Tooltip {...tooltipProps} getPopupContainer={getPopupContainer}><span className={b('tooltip')}>{tooltipIcon ?? <QuestionCircleOutlined />}</span></Tooltip>}
          {label !== ' ' && colon && <span className={b('colon')}>:</span>}
        </div>
      )}
      <div className={b('control')} style={controlSizing}>
        <div className={b('content')} style={{ justifyContent: wrapperAlign === 'right' ? 'flex-end' : 'flex-start' }}>
          {props.addonBefore !== undefined && <span className={b('addon')}>{props.addonBefore}</span>}
          <div className={b('component')} style={{ textAlign: wrapperAlign }}>
            {feedbackLayout === 'popover'
              ? (
                  <Popover
                    open={feedbackVisible}
                    placement="top"
                    autoAdjustOverflow
                    content={(
                      <div className={cls(b('popover-feedback'), b('popover-feedback', { status: feedbackStatus }))} style={tokenStyle} role={feedbackStatus === 'error' ? 'alert' : undefined}>
                        {PopoverIcon && <PopoverIcon />}
                        <span>{feedbackText}</span>
                      </div>
                    )}
                    getPopupContainer={getPopupContainer}
                  >
                    <div className={b('popover-anchor')}>{control}</div>
                  </Popover>
                )
              : control}
          </div>
          {props.addonAfter !== undefined && <span className={b('addon')}>{props.addonAfter}</span>}
        </div>
        {feedbackVisible && feedbackLayout !== 'popover' && feedbackLayout !== 'none' && <div className={b('help')} role={feedbackStatus === 'error' ? 'alert' : undefined}>{feedbackText}</div>}
        {extra !== undefined && <div className={b('extra')}>{extra}</div>}
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
