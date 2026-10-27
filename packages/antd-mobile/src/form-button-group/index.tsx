import type { ButtonProps } from 'antd-mobile'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { Button } from 'antd-mobile'
import cls from 'classnames'
import React, { useContext, useMemo } from 'react'
import { usePrefixCls } from '../__builtins__'
import { FormButtonGroupContext, FormButtonGroupStickyContext } from './context'
import { FormButtonGroupSticky } from './sticky'
import './style.less'

export type FormButtonGroupLayout = 'vertical' | 'horizontal' | 'compact'

export interface IFormButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  shape?: ButtonProps['shape']
  layout?: FormButtonGroupLayout
  gap?: number | string
  inset?: boolean
  safeAreaInsetBottom?: boolean
}

export type { IFormButtonGroupStickyProps } from './sticky'

// Default direct native buttons to full width without adding layout wrappers.
function normalizeButtons(children: ReactNode, shape: ButtonProps['shape']): ReactNode {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child))
      return child
    if (child.type === React.Fragment) {
      const fragment = child as React.ReactElement<{ children?: ReactNode }>
      return React.cloneElement(fragment, {}, normalizeButtons(fragment.props.children, shape))
    }
    if (child.type === Button) {
      const button = child as React.ReactElement<ButtonProps>
      return React.cloneElement(button, { block: button.props.block ?? true, shape: shape ?? button.props.shape ?? 'rectangular' })
    }
    return child
  })
}

export const FormButtonGroup = Object.assign(
  ({ shape, layout = 'vertical', gap = 12, inset = true, safeAreaInsetBottom, className, style, children, ...props }: IFormButtonGroupProps) => {
    const prefixCls = usePrefixCls('formily-button-group')
    const stickyBottom = useContext(FormButtonGroupStickyContext)
    const context = useMemo(() => ({ shape }), [shape])
    return (
      <div
        {...props}
        className={cls(prefixCls, `${prefixCls}-${layout}`, {
          [`${prefixCls}-inset`]: inset,
          [`${prefixCls}-safe-area`]: safeAreaInsetBottom ?? stickyBottom,
        }, className)}
        style={{ '--formily-button-group-gap': typeof gap === 'number' ? `${gap}px` : gap, ...style } as CSSProperties}
      >
        <FormButtonGroupContext.Provider value={context}>
          <div className={`${prefixCls}-inner`}>{normalizeButtons(children, shape)}</div>
        </FormButtonGroupContext.Provider>
      </div>
    )
  },
  { Sticky: FormButtonGroupSticky },
)

export default FormButtonGroup
