import type { Form as FormType, IFormFeedback } from '@formily/core'
import type { FieldTextAlign, FieldValidateTrigger } from 'vant'

export interface VantFormProps {
  colon?: boolean
  disabled?: boolean
  readonly?: boolean
  required?: boolean | 'auto'
  showError?: boolean
  labelWidth?: number | string
  labelAlign?: FieldTextAlign
  inputAlign?: FieldTextAlign
  scrollToError?: boolean
  scrollToErrorPosition?: ScrollLogicalPosition
  validateFirst?: boolean
  submitOnEnter?: boolean
  showErrorMessage?: boolean
  errorMessageAlign?: FieldTextAlign
  validateTrigger?: FieldValidateTrigger | FieldValidateTrigger[]
  form?: FormType
  onAutoSubmit?: (values: FormType['values']) => Promise<any> | any
  onAutoSubmitFailed?: (error: IFormFeedback[]) => void
}
