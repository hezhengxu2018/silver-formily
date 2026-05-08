import type { IFormFeedback } from '@formily/core'
import type { VantButtonBaseProps } from '../__builtins__'

export interface SubmitProps extends Omit<VantButtonBaseProps, 'nativeType'> {
  onClick?: (event: MouseEvent) => void | boolean
  onSubmit?: (values: any) => Promise<any> | any
  onSubmitSuccess?: (payload: any) => void
  onSubmitFailed?: (feedbacks: IFormFeedback[]) => void
  submit?: boolean
}
