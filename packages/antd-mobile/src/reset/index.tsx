import type { IFieldResetOptions, IFormFeedback } from '@silver-formily/core'
import type { ButtonProps } from 'antd-mobile/es/components/button'
import { useParentForm } from '@silver-formily/react'
import { Button } from 'antd-mobile'
import React from 'react'

export interface IResetProps extends IFieldResetOptions, ButtonProps {
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => any
  onResetValidateSuccess?: (payload: any) => void
  onResetValidateFailed?: (feedbacks: IFormFeedback[]) => void
}

export const Reset: React.FC<IResetProps> = ({
  forceClear,
  validate,
  onResetValidateSuccess,
  onResetValidateFailed,
  ...props
}) => {
  const form = useParentForm()

  return (
    <Button
      {...props}
      onClick={(e) => {
        if (props.onClick) {
          if (props.onClick(e) === false)
            return
        }
        form
          .reset('*', {
            forceClear,
            validate,
          })
          .then(onResetValidateSuccess)
          .catch(onResetValidateFailed)
      }}
    >
      {props.children}
    </Button>
  )
}

export default Reset
