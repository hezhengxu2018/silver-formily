import type { Form as FormType, IFormFeedback } from '@silver-formily/core'
import type { JSXComponent } from '@silver-formily/react'
import type { PropsWithChildren, ReactNode, SyntheticEvent } from 'react'
import type { IFormLayoutProps } from '../form-layout'
import { FormProvider, useParentForm } from '@silver-formily/react'
import { createElement, useRef } from 'react'
import { FormLayout } from '../form-layout'
import { PreviewText } from '../preview-text'
import { FormRootContext } from './root-context'

export interface FormProps extends IFormLayoutProps {
  form?: FormType
  component?: JSXComponent
  onAutoSubmit?: (values: any) => any
  onAutoSubmitFailed?: (feedbacks: IFormFeedback[]) => void
  previewTextPlaceholder?: ReactNode
}
export function Form({ form, component = 'form', onAutoSubmit, onAutoSubmitFailed, previewTextPlaceholder = 'N/A', children, ...props }: PropsWithChildren<FormProps>) {
  const parent = useParentForm()
  const pending = useRef(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const current = form ?? parent
  if (!current)
    throw new Error('Form requires a form instance from createForm or a parent FormProvider')
  const content = (
    <FormRootContext.Provider value={rootRef}>
      <PreviewText.Placeholder value={previewTextPlaceholder}>
        <FormLayout {...props} ref={rootRef}>
          {createElement(component, {
            onSubmit(event: SyntheticEvent<HTMLFormElement>) {
              event.preventDefault()
              event.stopPropagation()
              if (pending.current || current.submitting)
                return
              pending.current = true
              void Promise.resolve().then(() => current.submit(onAutoSubmit)).catch(onAutoSubmitFailed ?? console.error).finally(() => {
                pending.current = false
              })
            },
          }, children)}
        </FormLayout>
      </PreviewText.Placeholder>
    </FormRootContext.Provider>
  )
  return form ? <FormProvider form={form}>{content}</FormProvider> : content
}
export default Form
