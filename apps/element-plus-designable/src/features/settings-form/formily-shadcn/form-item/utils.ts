import type { Field, GeneralField } from '@silver-formily/core'
import { isVoidField } from '@silver-formily/core'
import { getFieldControlId } from '../utils'

export function getFeedbackMessage(field: Field) {
  return field.selfErrors.join(', ')
    || field.selfWarnings.join(', ')
    || field.selfSuccesses.join(', ')
}

export function determineFeedbackStatus(field: Field) {
  return field.validateStatus
}

export function fieldFeedbackMapper(props: Record<string, any>, field?: GeneralField) {
  if (!field || isVoidField(field))
    return props

  const inputField = field as Field
  const feedbackText = getFeedbackMessage(inputField)
  const feedbackStatus = determineFeedbackStatus(inputField)
  const asterisk = 'asterisk' in props
    ? props.asterisk
    : inputField.required && inputField.pattern !== 'readPretty'

  return {
    ...props,
    asterisk,
    controlId: props.controlId ?? getFieldControlId(field),
    feedbackStatus,
    feedbackText,
  }
}
