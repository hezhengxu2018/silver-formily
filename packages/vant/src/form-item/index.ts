import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@silver-formily/vue'
import { composeExport } from '../__builtins__'
import FormBaseItem from './form-item.vue'
import { determineFeedbackStatus, getFeedbackMessage, getVanFieldBridgedProps } from './utils'

function callListener(listener, ...args) {
  if (Array.isArray(listener)) {
    listener.forEach(fn => typeof fn === 'function' && fn(...args))
    return
  }

  if (typeof listener === 'function') {
    listener(...args)
  }
}

export function fieldFeedbackMapper(props, field) {
  if (isVoidField(field) || !field) {
    return props
  }

  const {
    'onUpdate:modelValue': componentModelValueHandler,
    ...bridgedProps
  } = getVanFieldBridgedProps(field)
  const feedbackStatus = determineFeedbackStatus(field)
  const feedbackText = ['error', 'warning'].includes(feedbackStatus)
    ? getFeedbackMessage(field)
    : undefined
  const asterisk = 'asterisk' in props
    ? props.asterisk
    : field.required && field.pattern !== 'readPretty'
  const decoratorModelValueHandler = props['onUpdate:modelValue']

  return {
    ...bridgedProps,
    ...props,
    feedbackStatus,
    feedbackText,
    asterisk,
    'modelValue': field.value,
    'onUpdate:modelValue': (...args) => {
      field.onInput(...args)
      callListener(decoratorModelValueHandler, ...args)
      callListener(componentModelValueHandler, ...args)
    },
    'disabled': props.disabled || bridgedProps.disabled || field.pattern === 'disabled',
    'readonly': props.readonly || bridgedProps.readonly || field.pattern === 'readOnly',
  }
}

const Item = connect<typeof FormBaseItem>(
  FormBaseItem,
  mapProps(
    {
      title: 'label',
      required: true,
      description: 'extra',
    },
    fieldFeedbackMapper,
  ),
)

export const FormItem = composeExport(Item, {
  BaseItem: FormBaseItem,
})

export default FormItem

export { default as FormBaseItem } from './form-item.vue'
