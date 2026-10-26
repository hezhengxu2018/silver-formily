import type { Form as FormType, IFormFeedback } from '@silver-formily/core'
import type { IFormLayoutProps } from '../form-layout'
import { FormProvider, useForm } from '@silver-formily/react'
import React from 'react'
import { FormLayout } from '../form-layout'
import { PreviewText } from '../preview-text'

export interface IFormProps extends IFormLayoutProps {
  form?: FormType
  previewTextPlaceholder?: React.ReactNode
  onAutoSubmit?: (values: FormType['values']) => any
  onAutoSubmitFailed?: (error: IFormFeedback[]) => void
}

export function Form({ form, previewTextPlaceholder, onAutoSubmit, onAutoSubmitFailed, children, ...props }: IFormProps) {
  const parentForm = useForm()
  const currentForm = form ?? parentForm

  if (!currentForm)
    return null

  return (
    <FormProvider form={currentForm}>
      <PreviewText.Placeholder value={previewTextPlaceholder}>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            currentForm.submit(onAutoSubmit).catch(error => onAutoSubmitFailed?.(error))
          }}
        >
          <FormLayout {...props}>{children}</FormLayout>
        </form>
      </PreviewText.Placeholder>
    </FormProvider>
  )
}

export default Form
