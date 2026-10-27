import type { IFieldResetOptions, IFormFeedback } from '@silver-formily/core'
import type { ButtonProps } from 'antd-mobile/es/components/button'
import { useParentForm } from '@silver-formily/react'
import { Button } from 'antd-mobile'
import { useFormButtonGroup } from '../form-button-group/context'

export interface IResetProps extends IFieldResetOptions, Omit<ButtonProps, 'onClick'> {
  onClick?: (event: Parameters<NonNullable<ButtonProps['onClick']>>[0]) => ReturnType<NonNullable<ButtonProps['onClick']>> | boolean
  onResetValidateSuccess?: () => void
  onResetValidateFailed?: (feedbacks: IFormFeedback[]) => void
}

export function Reset({
  shape,
  block,
  forceClear,
  validate,
  onResetValidateSuccess,
  onResetValidateFailed,
  ...props
}: IResetProps) {
  const form = useParentForm()
  const group = useFormButtonGroup()

  return (
    <Button
      {...props}
      block={block ?? (group ? true : undefined)}
      shape={group?.shape ?? shape ?? (group ? 'rectangular' : undefined)}
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
