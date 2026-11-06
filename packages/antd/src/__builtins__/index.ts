import type { CSSProperties } from 'react'
import { ConfigProvider, theme } from 'antd'
import { createContext, useContext } from 'react'

export type FormSize = 'small' | 'default' | 'middle' | 'medium' | 'large'
export interface ControlContextValue {
  id?: string
}
export const ControlContext = createContext<ControlContextValue>({})

export function usePrefixCls(name: string, props?: { prefixCls?: string }) {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext)
  return getPrefixCls(name, props?.prefixCls)
}

export function normalizeSize(size?: FormSize) {
  return size === 'default' || size === 'middle' ? 'medium' : size
}

export function useControlProps<T extends { id?: string, size?: string, status?: string, variant?: string }>(props: T) {
  const context = useContext(ControlContext)
  return {
    ...props,
    id: props.id ?? context.id,
  } as T
}

export function useTokenStyle(size?: FormSize): CSSProperties {
  const { token } = theme.useToken()
  const height = size === 'small' ? token.controlHeightSM : size === 'large' ? token.controlHeightLG : token.controlHeight
  return {
    '--sf-color': token.colorText,
    '--sf-secondary': token.colorTextSecondary,
    '--sf-error': token.colorError,
    '--sf-warning': token.colorWarning,
    '--sf-success': token.colorSuccess,
    '--sf-border': token.colorBorder,
    '--sf-bg': token.colorBgContainer,
    '--sf-primary': token.colorPrimary,
    '--sf-radius': `${token.borderRadius}px`,
    '--sf-font': `${token.fontSize}px`,
    '--sf-height': `${height}px`,
  } as CSSProperties
}

export function pickDataProps(props: object) {
  return Object.fromEntries(Object.entries(props).filter(([key]) => key.startsWith('data-') || key.startsWith('aria-')))
}
