import type { IFormItemProps } from './types'
import { Popover } from 'antd-mobile'
import { ExclamationCircleOutline } from 'antd-mobile-icons'
import cls from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useOverflow } from './use-overflow'

export function FormItemLabel({ prefixCls, label, colon, labelStyle, labelAlign, asterisk, tooltip, tooltipLayout, tooltipIcon }: Pick<IFormItemProps, 'label' | 'colon' | 'labelStyle' | 'labelAlign' | 'asterisk' | 'tooltip' | 'tooltipLayout' | 'tooltipIcon'> & { prefixCls: string }) {
  const { containerRef, contentRef, overflow } = useOverflow()
  const textTooltip = overflow || (tooltipLayout === 'text' && !!tooltip)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const touchRef = useRef<{ x: number, y: number } | undefined>(undefined)
  const longPressedRef = useRef(false)
  const suppressClickUntilRef = useRef(0)
  const cancelTimer = () => {
    clearTimeout(timerRef.current)
    timerRef.current = undefined
  }
  useEffect(() => {
    setVisible(false)
    return cancelTimer
  }, [textTooltip, label, tooltip])
  const text = (
    <span
      className={`${prefixCls}-label-content`}
      ref={containerRef}
      onTouchStart={(event) => {
        cancelTimer()
        longPressedRef.current = false
        suppressClickUntilRef.current = 0
        touchRef.current = undefined
        if (!textTooltip || event.touches.length !== 1)
          return
        const touch = event.touches[0]
        touchRef.current = { x: touch.clientX, y: touch.clientY }
        timerRef.current = setTimeout(() => {
          longPressedRef.current = true
          setVisible(true)
        }, 500)
      }}
      onTouchMove={(event) => {
        const start = touchRef.current
        const touch = event.touches[0]
        if (!start || event.touches.length !== 1 || Math.hypot(touch.clientX - start.x, touch.clientY - start.y) > 10) {
          cancelTimer()
          setVisible(false)
        }
      }}
      onTouchEnd={() => {
        cancelTimer()
        if (longPressedRef.current)
          suppressClickUntilRef.current = Date.now() + 800
      }}
      onTouchCancel={() => {
        cancelTimer()
        setVisible(false)
        if (longPressedRef.current)
          suppressClickUntilRef.current = Date.now() + 800
      }}
      onClickCapture={(event) => {
        if (Date.now() < suppressClickUntilRef.current) {
          event.preventDefault()
          event.stopPropagation()
          suppressClickUntilRef.current = 0
          return
        }
        setVisible(false)
      }}
      onContextMenu={(event) => {
        if (textTooltip)
          event.preventDefault()
      }}
    >
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
        visible={textTooltip && visible}
        onVisibleChange={(nextVisible) => {
          // Keep click-away dismissal, but only a long press may open the text tooltip.
          if (!nextVisible)
            setVisible(false)
        }}
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
