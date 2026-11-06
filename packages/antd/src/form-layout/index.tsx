import type { ConfigProviderProps } from 'antd'
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react'
import type { FormSize } from '../__builtins__'
import { ConfigProvider } from 'antd'
import cls from 'clsx'
import { createContext, forwardRef, useContext, useImperativeHandle } from 'react'
import { normalizeSize, usePrefixCls, useTokenStyle } from '../__builtins__'
import { useResponsiveFormLayout } from './use-responsive-form-layout'
import './style.css'

export interface IFormLayoutProps {
  prefixCls?: string
  className?: string
  style?: CSSProperties
  colon?: boolean
  requiredMark?: boolean | 'optional'
  labelAlign?: 'left' | 'right' | ('left' | 'right')[]
  wrapperAlign?: 'left' | 'right' | ('left' | 'right')[]
  labelWrap?: boolean
  wrapperWrap?: boolean
  labelWidth?: number | string
  wrapperWidth?: number | string
  labelCol?: number | number[]
  wrapperCol?: number | number[]
  fullness?: boolean
  size?: FormSize
  layout?: 'horizontal' | 'vertical' | 'inline' | ('horizontal' | 'vertical' | 'inline')[]
  direction?: 'ltr' | 'rtl'
  shallow?: boolean
  tooltipLayout?: 'icon' | 'text'
  tooltipIcon?: ReactNode
  feedbackLayout?: 'loose' | 'terse' | 'popover' | 'none'
  variant?: ConfigProviderProps['variant']
  breakpoints?: number[]
  spaceGap?: number
  gridColumnGap?: number
  gridRowGap?: number
}

export interface IFormLayoutContext extends Omit<IFormLayoutProps, 'layout' | 'labelAlign' | 'wrapperAlign' | 'labelCol' | 'wrapperCol'> {
  layout?: 'horizontal' | 'vertical' | 'inline'
  labelAlign?: 'left' | 'right'
  wrapperAlign?: 'left' | 'right'
  labelCol?: number
  wrapperCol?: number
}

export const FormLayoutDeepContext = createContext<IFormLayoutContext | null>(null)
export const FormLayoutShallowContext = createContext<IFormLayoutContext | null>(null)
export const useFormDeepLayout = () => useContext(FormLayoutDeepContext)
export const useFormShallowLayout = () => useContext(FormLayoutShallowContext)
export function useFormLayout(): IFormLayoutContext {
  return { ...useFormDeepLayout(), ...useFormShallowLayout() }
}

export const FormLayout = Object.assign(
  forwardRef<HTMLDivElement, PropsWithChildren<IFormLayoutProps>>(({ shallow = true, children, prefixCls, className, style, ...otherProps }, forwardedRef) => {
    const { ref, props } = useResponsiveFormLayout(otherProps)
    useImperativeHandle(forwardedRef, () => ref.current!)
    const inherited = useFormDeepLayout()
    const deep = { ...inherited }
    if (!shallow) {
      Object.assign(deep, props)
    }
    else {
      if (props.size !== undefined)
        deep.size = props.size
      if (props.colon !== undefined)
        deep.colon = props.colon
    }
    const prefix = usePrefixCls('formily-layout', { prefixCls })
    const tokenStyle = useTokenStyle()
    return (
      <ConfigProvider componentSize={normalizeSize(props.size ?? inherited?.size)} direction={props.direction} variant={props.variant}>
        <div ref={ref} dir={props.direction} className={cls('sf-layout', prefix, `sf-layout-${props.layout ?? 'horizontal'}`, className)} style={{ ...tokenStyle, ...style }}>
          <FormLayoutDeepContext.Provider value={deep}>
            <FormLayoutShallowContext.Provider value={shallow ? props : null}>
              {children}
            </FormLayoutShallowContext.Provider>
          </FormLayoutDeepContext.Provider>
        </div>
      </ConfigProvider>
    )
  }),
  { useFormLayout, useFormDeepLayout, useFormShallowLayout },
)

export default FormLayout
