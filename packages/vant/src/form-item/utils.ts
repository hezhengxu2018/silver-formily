import type { Field, GeneralField } from '@formily/core'
import { toJS } from '@formily/reactive'
import { isArr } from '@formily/shared'
import { Input } from '../input'

const vantFieldBridgePropKeys = [
  'autofocus',
  'autosize',
  'clearable',
  'clearIcon',
  'clearTrigger',
  'disabled',
  'formatter',
  'formatTrigger',
  'iconPrefix',
  'inputAlign',
  'leftIcon',
  'maxlength',
  'max',
  'min',
  'readonly',
  'rows',
  'onClear',
  'onUpdate:modelValue',
  'onClickInput',
  'onClickLeftIcon',
  'onClickRightIcon',
  'rightIcon',
  'showWordLimit',
  'type',
] as const

function pickKeys(source: Record<string, any>, keys: readonly string[]) {
  const result: Record<string, any> = {}

  keys.forEach((key) => {
    if (key in source) {
      result[key] = source[key]
    }
  })

  return result
}

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

export function getVanFieldBridgedProps(field: GeneralField) {
  const component = isArr(field.component)
    ? field.component[0]
    : field.component
  const componentEntry = isArr(field.component)
    ? toJS(field.component[1]) || {}
    : {}
  const componentProps = typeof componentEntry === 'object' && componentEntry != null
    ? componentEntry as Record<string, any>
    : {}

  if (component !== Input && component !== Input.TextArea) {
    return {}
  }

  const bridgedProps = pickKeys(componentProps, vantFieldBridgePropKeys)

  if (!('readonly' in bridgedProps) && 'readOnly' in componentProps) {
    bridgedProps.readonly = componentProps.readOnly
  }

  const componentType = componentProps.type ?? (component === Input.TextArea ? 'textarea' : undefined)
  if (componentType != null) {
    bridgedProps.type = componentType
  }

  // `VanField`'s built-in clear icon visibility depends on its internal focused state.
  // With a custom input slot that state is not synced automatically, so default to
  // `always` unless the user explicitly chooses another trigger.
  if (bridgedProps.clearable && !('clearTrigger' in bridgedProps)) {
    bridgedProps.clearTrigger = 'always'
  }

  return bridgedProps
}
