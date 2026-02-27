import type { Field } from '@formily/core'
import { isArr } from '@formily/shared'

export function getFeedbackMessage(field: Field) {
  const messages = {
    errors: field.selfErrors.join(', '),
    warnings: field.selfWarnings.join(', '),
    successes: field.selfSuccesses.join(', '),
  }

  return messages.errors || messages.warnings || messages.successes
}

export function determineFeedbackStatus(field: Field) {
  return isArr(field.decorator)
    ? (field.decorator[1]?.feedbackStatus ?? field.validateStatus)
    : field.validateStatus
}
