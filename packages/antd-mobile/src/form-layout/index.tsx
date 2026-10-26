import type { ListProps, ListRef } from 'antd-mobile/es/components/list'
import { List } from 'antd-mobile'
import cls from 'classnames'
import React, { createContext, useContext, useRef } from 'react'
import { usePrefixCls } from '../__builtins__'
import { FormLayoutRootContext } from './root-context'

export interface IFormLayoutProps extends ListProps {
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
  layout?: 'vertical' | 'horizontal'
  labelAlign?: 'right' | 'left'
  wrapperAlign?: 'right' | 'left'
  colon?: boolean
  labelWrap?: boolean
  labelWidth?: number | string
  wrapperWidth?: number | string
  wrapperWrap?: boolean
  shallow?: boolean
  bordered?: boolean
  spaceGap?: number
  gridColumnGap?: number
  gridRowGap?: number
  tooltipLayout?: 'icon' | 'text'
  tooltipIcon?: React.ReactNode
}

export type IFormLayoutContext = IFormLayoutProps
export const FormLayoutDeepContext = createContext<IFormLayoutContext | null>(null)
export const FormLayoutShallowContext = createContext<IFormLayoutContext | null>(null)
export const useFormDeepLayout = () => useContext(FormLayoutDeepContext)
export const useFormShallowLayout = () => useContext(FormLayoutShallowContext)
export function useFormLayout() {
  return {
    ...useFormDeepLayout(),
    ...useFormShallowLayout(),
  }
}

export const FormLayout = Object.assign(
  ({ shallow = true, children, prefixCls, className, style, ...props }: IFormLayoutProps) => {
    const rootRef = useRef<ListRef>(null)
    const deepLayout = useFormDeepLayout()
    const formPrefixCls = usePrefixCls('form', { prefixCls })
    const layoutPrefixCls = usePrefixCls('formily-layout', { prefixCls })
    const layoutClassName = cls(
      layoutPrefixCls,
      {
        [`${formPrefixCls}-${props.layout}`]: true,
      },
      className,
    )
    const renderChildren = () => {
      const newDeepLayout = {
        ...deepLayout,
      }
      if (!shallow) {
        Object.assign(newDeepLayout, props)
      }
      return (
        <FormLayoutDeepContext.Provider value={newDeepLayout}>
          <FormLayoutShallowContext.Provider value={shallow ? props : null}>
            {children}
          </FormLayoutShallowContext.Provider>
        </FormLayoutDeepContext.Provider>
      )
    }

    return (
      <FormLayoutRootContext.Provider value={rootRef}>
        <List ref={rootRef} className={layoutClassName} style={style} mode={props.mode}>
          {renderChildren()}
        </List>
      </FormLayoutRootContext.Provider>
    )
  },
  { useFormLayout, useFormDeepLayout, useFormShallowLayout },
)

export default FormLayout
