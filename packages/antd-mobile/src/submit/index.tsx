import type { IFormFeedback } from '@silver-formily/core'
import type { ButtonProps, ButtonRef } from 'antd-mobile/es/components/button'
import { observer, useParentForm } from '@silver-formily/react'
import { Button } from 'antd-mobile'
import { forwardRef, useRef } from 'react'

import { useFormButtonGroup } from '../form-button-group/context'

export interface ISubmitProps extends Omit<ButtonProps, 'type' | 'loading' | 'onClick'> {
  onClick?: (event: Parameters<NonNullable<ButtonProps['onClick']>>[0]) => ReturnType<NonNullable<ButtonProps['onClick']>> | boolean
  onSubmit?: (values: any) => any
  onSubmitSuccess?: (payload: any) => void
  onSubmitFailed?: (feedbacks: IFormFeedback[]) => void
  loading?: boolean
  submit?: boolean
}

export const Submit = observer(forwardRef<ButtonRef, ISubmitProps>(
  ({ onSubmit, onSubmitFailed, onSubmitSuccess, onClick, shape, submit = false, loading = false, disabled, children = '提交', ...props }, ref) => {
    const form = useParentForm()
    const group = useFormButtonGroup()
    const pending = useRef(false)
    const isLoading = Boolean(form?.submitting || loading)
    return (
      <Button
        color="primary"
        block
        {...props}
        shape={group?.shape ?? shape ?? 'rectangular'}
        ref={ref}
        type={onSubmit || submit ? 'button' : 'submit'}
        loading={isLoading}
        disabled={disabled || isLoading}
        onClick={(event) => {
          if (pending.current || isLoading || disabled) {
            event.preventDefault()
            return
          }
          if (onClick?.(event) === false) {
            event.preventDefault()
          }
          if (event.defaultPrevented || !onSubmit)
            return
          event.preventDefault()
          pending.current = true
          return Promise.resolve()
            .then(() => form.submit(onSubmit))
            .then(onSubmitSuccess)
            .catch(onSubmitFailed ?? console.error)
            .finally(() => { pending.current = false })
        }}
      >
        {children}
      </Button>
    )
  },
))

export default Submit
