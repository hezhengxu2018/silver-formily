import type { CSSProperties } from 'react'
import { theme } from 'antd'
import bem from 'easy-bem'
import { createContext, useContext } from 'react'

export type FormSize = 'small' | 'default' | 'middle' | 'medium' | 'large'
export interface ControlContextValue {
  id?: string
}
export const ControlContext = createContext<ControlContextValue>({})

export function createBem(name: string) {
  return bem(`silver-formily-${name}`)
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
    '--silver-formily-color': token.colorText,
    '--silver-formily-secondary': token.colorTextSecondary,
    '--silver-formily-error': token.colorError,
    '--silver-formily-warning': token.colorWarning,
    '--silver-formily-success': token.colorSuccess,
    '--silver-formily-border': token.colorBorder,
    '--silver-formily-bg': token.colorBgContainer,
    '--silver-formily-primary': token.colorPrimary,
    '--silver-formily-radius': `${token.borderRadius}px`,
    '--silver-formily-font': `${token.fontSize}px`,
    '--silver-formily-height': `${height}px`,
  } as CSSProperties
}

export function pickDataProps(props: object) {
  return Object.fromEntries(Object.entries(props).filter(([key]) => key.startsWith('data-') || key.startsWith('aria-')))
}
