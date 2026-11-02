import type { GeneralField } from '@silver-formily/core'
import type { ReactNode } from 'react'
import type { FeedbackMessage, InternalFeedbackProps } from './feedback'
import type { IFormItemProps } from './types'
import { isVoidField } from '@silver-formily/core'

function collectMessages(type: FeedbackMessage['type'], messages: ReactNode[]): FeedbackMessage[] {
  const content = messages.filter(message => message !== undefined && message !== null && message !== false && message !== '')
  return content.map(message => ({ type, message }))
}

export function mapFieldProps(props: IFormItemProps, field?: GeneralField): IFormItemProps & InternalFeedbackProps {
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
  const messages = [
    ...collectMessages('error', field.selfErrors),
    ...collectMessages('warning', field.selfWarnings),
  ]
  if (!messages.length)
    messages.push(...collectMessages('success', field.selfSuccesses))
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
    feedbackText: props.feedbackText,
    feedbackMessages: props.feedbackText !== undefined || field.validating || !messages.length ? undefined : messages,
  }
}
