import type { VantButtonBaseProps } from '../__builtins__'

export interface ResetProps extends VantButtonBaseProps {
  onClick?: (event: MouseEvent) => void | boolean
  forceClear?: boolean
  validate?: boolean
  onResetValidateSuccess?: (payload: any) => void
  onResetValidateFailed?: (error: any) => void
}
