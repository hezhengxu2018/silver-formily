import type { ButtonProps } from 'antd-mobile'
import { createContext, useContext } from 'react'

export interface FormButtonGroupContextValue {
  shape?: ButtonProps['shape']
}

export const FormButtonGroupContext = createContext<FormButtonGroupContextValue | null>(null)

export function useFormButtonGroup() {
  return useContext(FormButtonGroupContext)
}

export const FormButtonGroupStickyContext = createContext(false)
