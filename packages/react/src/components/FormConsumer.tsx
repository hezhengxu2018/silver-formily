import type { ComponentType } from 'react'
import type { IFormSpyProps } from '../types'
import { observer } from '@silver-formily/reactive-react'
import { isFn } from '@silver-formily/shared'
import { Fragment } from 'react'
import { useForm } from '../hooks'

export const FormConsumer: ComponentType<IFormSpyProps> = observer((props) => {
  const children = isFn(props.children) ? props.children(useForm()) : null
  return <Fragment>{children}</Fragment>
})

FormConsumer.displayName = 'FormConsumer'
