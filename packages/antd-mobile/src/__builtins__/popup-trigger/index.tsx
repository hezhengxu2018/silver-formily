import type { ButtonHTMLAttributes } from 'react'
import cls from 'classnames'
import { createContext, forwardRef, useContext } from 'react'
import './style.less'

export const FormItemWrapperWrapContext = createContext(false)

export const PopupTrigger = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
  const wrapperWrap = useContext(FormItemWrapperWrapContext)
  return <button {...props} ref={ref} className={cls(className, 'adm-formily-popup-trigger')} data-wrapper-wrap={wrapperWrap} />
})
