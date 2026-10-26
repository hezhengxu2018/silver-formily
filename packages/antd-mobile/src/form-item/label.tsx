import type { IFormItemProps } from './types'
import { Popover } from 'antd-mobile'
import { ExclamationCircleOutline } from 'antd-mobile-icons'
import cls from 'classnames'
import { useOverflow } from './use-overflow'

export function FormItemLabel({ prefixCls, label, colon, labelStyle, labelAlign, asterisk, tooltip, tooltipLayout, tooltipIcon }: Pick<IFormItemProps, 'label' | 'colon' | 'labelStyle' | 'labelAlign' | 'asterisk' | 'tooltip' | 'tooltipLayout' | 'tooltipIcon'> & { prefixCls: string }) {
  const { containerRef, contentRef, overflow } = useOverflow()
  const textTooltip = overflow || (tooltipLayout === 'text' && !!tooltip)
  const text = (
    <span className={`${prefixCls}-label-content`} ref={containerRef}>
      <span ref={contentRef}>
        {label}
        {colon && <span>:</span>}
      </span>
    </span>
  )
  return (
    <div className={cls(`${prefixCls}-label`, `${prefixCls}-label-align-${labelAlign}`, { [`${prefixCls}-label-tooltip`]: textTooltip })} style={labelStyle}>
      {asterisk && <span className={`${prefixCls}-asterisk`}>*</span>}
      <Popover
        placement="top-start"
        className={`${prefixCls}-tooltip`}
        trigger={textTooltip ? 'click' : undefined}
        visible={textTooltip ? undefined : false}
        content={overflow
          ? (
              <>
                <div>{label}</div>
                <div>{tooltip}</div>
              </>
            )
          : tooltip}
      >
        {text}
      </Popover>
      {!!tooltip && tooltipLayout === 'icon' && !overflow && (
        <span className={`${prefixCls}-label-tooltip-icon`}>
          <Popover placement="top-start" className={`${prefixCls}-tooltip`} mode="dark" trigger="click" content={tooltip}>
            <button type="button" aria-label="字段说明">{tooltipIcon === undefined ? <ExclamationCircleOutline /> : tooltipIcon}</button>
          </Popover>
        </span>
      )}
    </div>
  )
}
