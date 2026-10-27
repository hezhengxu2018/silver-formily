import type { ButtonHTMLAttributes } from 'react'
import cls from 'classnames'
import { forwardRef } from 'react'
import './style.less'

interface PopupTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  triggerWrap?: boolean
}

export const PopupTrigger = forwardRef<HTMLButtonElement, PopupTriggerProps>(({ triggerWrap = false, className, ...props }, ref) => (
  <button {...props} ref={ref} className={cls(className, 'adm-formily-popup-trigger')} data-trigger-wrap={triggerWrap} />
))
