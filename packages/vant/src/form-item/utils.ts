import type { Field, GeneralField } from '@formily/core'
import type { Field as VanField } from 'vant'
import { toJS } from '@formily/reactive'
import { isArr, isValid } from '@formily/shared'
import { createNamespace } from '../__builtins__'
import { Input } from '../input'

export const { prefixCls, b } = createNamespace('form-item')

const vantFieldBridgePropKeys = [
  'autofocus',
  'autosize',
  'clearable',
  'clearIcon',
  'clearTrigger',
  'disabled',
  'formatter',
  'formatTrigger',
  'id',
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

type VanFieldBridgePropKey = (typeof vantFieldBridgePropKeys)[number]
type VanFieldPublicProps = InstanceType<typeof VanField>['$props']
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}

export type VanFieldBridgedProps = Mutable<Partial<Pick<VanFieldPublicProps, VanFieldBridgePropKey>>>

function assignBridgedProp<Key extends keyof VanFieldBridgedProps>(
  props: VanFieldBridgedProps,
  key: Key,
  value: VanFieldBridgedProps[Key],
) {
  Object.assign(props, { [key]: value })
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
  const componentProps = typeof componentEntry === 'object' && isValid(componentEntry)
    ? componentEntry as Record<string, unknown>
    : {}

  if (component !== Input && component !== Input.TextArea) {
    return {} as VanFieldBridgedProps
  }

  const bridgedProps: VanFieldBridgedProps = {}

  vantFieldBridgePropKeys.forEach((key) => {
    if (key in componentProps) {
      assignBridgedProp(bridgedProps, key, componentProps[key] as VanFieldBridgedProps[typeof key])
    }
  })

  if (!('readonly' in bridgedProps) && 'readOnly' in componentProps) {
    assignBridgedProp(bridgedProps, 'readonly', componentProps.readOnly as VanFieldBridgedProps['readonly'])
  }

  const componentType = componentProps.type ?? (component === Input.TextArea ? 'textarea' : undefined)
  if (isValid(componentType)) {
    assignBridgedProp(bridgedProps, 'type', componentType as VanFieldBridgedProps['type'])
  }

  // `VanField`'s built-in clear icon visibility depends on its internal focused state.
  // With a custom input slot that state is not synced automatically, so default to
  // `always` unless the user explicitly chooses another trigger.
  if (bridgedProps.clearable && !('clearTrigger' in bridgedProps)) {
    assignBridgedProp(bridgedProps, 'clearTrigger', 'always' as VanFieldBridgedProps['clearTrigger'])
  }

  return bridgedProps
}
