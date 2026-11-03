import type { IFormFeedback } from '@silver-formily/core'
import type { ButtonProps } from 'antd'
import type { ComponentRef, MouseEvent } from 'react'
import { observer, useParentForm } from '@silver-formily/react'
import { Button } from 'antd'
import { forwardRef, useRef } from 'react'

export interface ISubmitProps extends Omit<ButtonProps, 'onClick'> {
  onClick?: (event: MouseEvent<HTMLElement>) => unknown
  onSubmit?: (values: any) => any
  onSubmitSuccess?: (payload: any) => void
  onSubmitFailed?: (feedbacks: IFormFeedback[]) => void
}
export const Submit = observer(forwardRef<ComponentRef<typeof Button>, ISubmitProps>(
  ({ onSubmit, onSubmitSuccess, onSubmitFailed, onClick, loading, disabled, children = '提交', htmlType, ...props }, ref) => {
    const form = useParentForm()
    const pending = useRef(false)
    const busy = Boolean(form?.submitting || loading)
    return (
      <Button
        type="primary"
        {...props}
        ref={ref}
        htmlType={htmlType ?? (onSubmit ? 'button' : 'submit')}
        disabled={disabled || busy}
        loading={form?.submitting || loading}
        onClick={(event) => {
          if (pending.current || busy || disabled) {
            event.preventDefault()
            return
          }
          if (onClick?.(event) === false)
            event.preventDefault()
          if (event.defaultPrevented || !onSubmit)
            return
          event.preventDefault()
          pending.current = true
          void Promise.resolve().then(() => form.submit(onSubmit)).then(onSubmitSuccess).catch(onSubmitFailed ?? console.error).finally(() => {
            pending.current = false
          })
        }}
      >
        {children}
      </Button>
    )
  },
))
export default Submit
