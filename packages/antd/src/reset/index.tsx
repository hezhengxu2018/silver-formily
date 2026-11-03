import type { IFieldResetOptions, IFormFeedback } from '@silver-formily/core'
import type { ButtonProps } from 'antd'
import type { ComponentRef, MouseEvent } from 'react'
import { useParentForm } from '@silver-formily/react'
import { Button } from 'antd'
import { forwardRef } from 'react'

export interface IResetProps extends IFieldResetOptions, Omit<ButtonProps, 'onClick'> {
  onClick?: (event: MouseEvent<HTMLElement>) => unknown
  onResetValidateSuccess?: (payload: any) => void
  onResetValidateFailed?: (feedbacks: IFormFeedback[]) => void
}
export const Reset = forwardRef<ComponentRef<typeof Button>, IResetProps>(
  ({ forceClear, validate, onResetValidateSuccess, onResetValidateFailed, onClick, children = '重置', htmlType = 'button', ...props }, ref) => {
    const form = useParentForm()
    return (
      <Button
        {...props}
        htmlType={htmlType}
        ref={ref}
        onClick={(event) => {
          if (onClick?.(event) === false)
            event.preventDefault()
          if (event.defaultPrevented)
            return
          void form.reset('*', { forceClear, validate })
            .then(() => {
              if (validate && form.invalid)
                throw form.errors
            })
            .then(onResetValidateSuccess)
            .catch(onResetValidateFailed ?? console.error)
        }}
      >
        {children}
      </Button>
    )
  },
)
export default Reset
