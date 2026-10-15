import type { SpaceProps } from 'antd-mobile/es/components/space'
import type { IFormItemProps } from '../form-item'
import { Space } from 'antd-mobile'
import cls from 'classnames'
/**
 * 1. FormItem网格布局
 * 2. 居中，居右，居左布局
 * 3. 行内布局
 * 4. 吸底布局
 */
import React, { useLayoutEffect, useRef, useState } from 'react'
import StickyBox from 'react-sticky-box'
import { usePrefixCls } from '../__builtins__'
import { BaseItem } from '../form-item'
import './style.less'

/**
 * react-sticky-box v2 不再导出 StickyBoxMode，也不再提供 onChangeMode 回调，
 * 这里保留类型以维持对外 API 兼容，运行时该回调不会触发。
 */
type StickyBoxMode = 'sticky' | 'relative' | 'fixed'

interface IStickyProps {
  offsetTop?: number
  offsetBottom?: number
  bottom?: boolean
  /** @deprecated react-sticky-box v2 已移除模式回调，该属性当前不生效 */
  onChangeMode?: (
    oldMode: StickyBoxMode | undefined,
    newMode: StickyBoxMode,
  ) => any
  style?: React.CSSProperties
  className?: string
  padding?: number
  align?: React.CSSProperties['textAlign']
  children?: React.ReactNode
}

type IFormButtonGroupProps = Omit<SpaceProps, 'align' | 'size'> & {
  align?: React.CSSProperties['textAlign']
  gutter?: number
}

function getInheritedBackgroundColor(el: HTMLElement) {
  // get default style for current browser
  const defaultStyle = getDefaultBackground() // typically "rgba(0, 0, 0, 0)"

  // get computed color for el
  const backgroundColor = window.getComputedStyle(el).backgroundColor

  // if we got a real value, return it
  if (backgroundColor !== defaultStyle)
    return backgroundColor

  // if we've reached the top parent el without getting an explicit color, return default
  if (!el.parentElement)
    return defaultStyle

  // otherwise, recurse and try again on parent element
  return getInheritedBackgroundColor(el.parentElement)
}

function getDefaultBackground() {
  // have to add to the document in order to use getComputedStyle
  const div = document.createElement('div')
  document.head.appendChild(div)
  const bg = window.getComputedStyle(div).backgroundColor
  document.head.removeChild(div)
  return bg
}

export const FormButtonGroup = Object.assign(
  ({ align = 'center', gutter, ...props }: IFormButtonGroupProps) => {
    const prefixCls = usePrefixCls('formily-button-group')
    const gap = (gutter ?? 0) > 0 ? `${gutter}px` : 'var(--gap)'
    return React.Children.count(props.children) > 0
      ? (
          <Space
            {...props}
            className={cls(prefixCls, props.className)}
            style={{
              ...props.style,
              '--gap-horizontal': gap,
              'alignItems':
            align === 'left'
              ? 'flex-start'
              : align === 'right'
                ? 'flex-end'
                : 'center',
              'display': 'flex',
            }}
          >
            {props.children}
          </Space>
        )
      : (
          <div className={cls(prefixCls, props.className)} style={props.style}>
            {props.children}
          </div>
        )
  },
  {
    FormItem: ({ gutter, ...props }: IFormItemProps & { gutter?: number }) => {
      const gap = (gutter ?? 0) > 0 ? `${gutter}px` : 'var(--gap)'
      return (
        <BaseItem
          {...props}
          label=" "
          style={{
            margin: 0,
            padding: 0,
            ...props.style,
            width: '100%',
          }}
        >
          {React.Children.count(props.children) > 0
            ? (
                <Space style={{ '--gap-horizontal': gap }}>{props.children}</Space>
              )
            : (
                props.children
              )}
        </BaseItem>
      )
    },

    Sticky: ({
      align = 'center',
      offsetTop,
      offsetBottom,
      onChangeMode: _onChangeMode,
      padding: _padding,
      ...props
    }: IStickyProps) => {
      const ref = useRef<HTMLDivElement>(null)
      const [color, setColor] = useState('transparent')
      const prefixCls = usePrefixCls('formily-button-group')

      useLayoutEffect(() => {
        if (ref.current) {
          const computed = getInheritedBackgroundColor(ref.current)
          if (computed !== color) {
            setColor(computed)
          }
        }
      })
      return (
        <StickyBox
          offsetTop={offsetTop}
          offsetBottom={offsetBottom}
          className={cls(`${prefixCls}-sticky`, props.className)}
          style={{
            backgroundColor: color,
            ...props.style,
          }}
          bottom
        >
          <div
            ref={ref}
            className={`${prefixCls}-sticky-inner`}
            style={{
              ...props.style,
              justifyContent:
            align === 'left'
              ? 'flex-start'
              : align === 'right'
                ? 'flex-end'
                : 'center',
            }}
          >
            {props.children}
          </div>
        </StickyBox>
      )
    },
  },
)

export default FormButtonGroup
