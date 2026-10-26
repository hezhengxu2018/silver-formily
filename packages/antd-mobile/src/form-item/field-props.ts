import type { GeneralField } from '@silver-formily/core'
import type { ReactNode } from 'react'
import type { IFormItemProps } from './types'
import { isVoidField } from '@silver-formily/core'

function joinMessages(messages: ReactNode[]) {
  const content = messages.filter(message => message !== undefined && message !== null && message !== false && message !== '')
  return content.length ? content.flatMap((message, index) => index ? [', ', message] : [message]) : undefined
}

export function mapFieldProps(props: IFormItemProps, field?: GeneralField): IFormItemProps {
  if (!field)
    return props
  const common = {
    ...(props.disabled === undefined && field.disabled ? { disabled: true } : {}),
    label: props.label !== undefined ? props.label : field.title,
    extra: props.extra !== undefined ? props.extra : field.description,
  }
  if (isVoidField(field))
    return { ...common, asterisk: props.asterisk ?? (field.pattern !== 'readPretty' && (props.required ?? false)) }
  const onClear = props.onClear
  const messages = joinMessages(field.selfErrors)
    ?? joinMessages(field.selfWarnings)
    ?? joinMessages(field.selfSuccesses)
  return {
    ...common,
    ...(props.clearable
      ? {
          clearable: !props.disabled && field.editable,
          value: field.value,
          onClear: () => {
            if (props.disabled || !field.editable)
              return
            void field.onInput(undefined)
            onClear?.()
          },
        }
      : {}),
    asterisk: props.asterisk ?? (field.pattern !== 'readPretty' && (props.required ?? field.required)),
    feedbackStatus: props.feedbackStatus !== undefined
      ? props.feedbackStatus
      : field.validating ? 'pending' : field.validateStatus,
    feedbackText: props.feedbackText !== undefined
      ? props.feedbackText
      : field.validating ? undefined : messages,
  }
}
