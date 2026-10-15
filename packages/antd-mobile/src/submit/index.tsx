import type { IFormFeedback } from '@silver-formily/core'
import type { ButtonProps } from 'antd-mobile/es/components/button'
import { observer, useParentForm } from '@silver-formily/react'
import { Button } from 'antd-mobile'
import React from 'react'

export interface ISubmitProps extends ButtonProps {
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => any
  onSubmit?: (values: any) => any
  onSubmitSuccess?: (payload: any) => void
  onSubmitFailed?: (feedbacks: IFormFeedback[]) => void
  children?: React.ReactNode
}

export const Submit = observer(
  ({ onSubmit, onSubmitFailed, onSubmitSuccess, ...props }: ISubmitProps) => {
    const form = useParentForm()
    return (
      <Button
        type={onSubmit ? 'button' : 'submit'}
        color="primary"
        block={true}
        {...props}
        loading={props.loading !== undefined ? props.loading : form.submitting}
        onClick={(e) => {
          if (props.onClick) {
            if (props.onClick(e) === false)
              return
          }
          if (onSubmit) {
            form.submit(onSubmit).then(onSubmitSuccess).catch(onSubmitFailed)
          }
        }}
      >
        <>{props.children}</>
      </Button>
    )
  },
  {
    forwardRef: true,
  },
)

export default Submit
