import type { IFormItemProps } from './types'
import { List } from 'antd-mobile'
import cls from 'classnames'
import { usePrefixCls } from '../__builtins__'
import { FormLayoutShallowContext } from '../form-layout'
import { FormItemFeedback } from './feedback'
import { FormItemLabel } from './label'
import { useFormItemLayout, widthStyle } from './layout'

export function BaseItem(props: IFormItemProps) {
  const resolved = useFormItemLayout(props)
  const {
    children,
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
          labelAlign={labelAlign}
          labelStyle={{ ...labelStyle, ...widthStyle(labelWidth) }}
          asterisk={asterisk}
          tooltip={tooltip}
          tooltipLayout={resolved.tooltipLayout}
          tooltipIcon={resolved.tooltipIcon}
        />
      )
    : undefined
  const control = (
    <div className={`${prefixCls}-control-content-component`} style={{ ...wrapperStyle, ...widthStyle(resolved.wrapperWidth) }}>
      <FormLayoutShallowContext.Provider value={null}>{children}</FormLayoutShallowContext.Provider>
    </div>
  )
  return (
    <List.Item
      {...nativeProps}
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
      data-grid-span={gridSpan}
    >
      <div className={`${prefixCls}-control`}>
        <div className={`${prefixCls}-control-content`}>
          {control}
        </div>
        {!!feedbackText && <FormItemFeedback prefixCls={prefixCls} feedbackStatus={feedbackStatus} feedbackText={feedbackText} />}
        {help !== undefined && help !== null && help !== false && help !== '' && <div className={`${prefixCls}-help-text`}>{help}</div>}
      </div>
    </List.Item>
  )
}
