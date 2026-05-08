import type { GeneralField } from '@formily/core'
import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@silver-formily/vue'
import { callListener, composeExport } from '../__builtins__'
import FormBaseItem from './form-item.vue'
import { determineFeedbackStatus, getFeedbackMessage, getVanFieldBridgedProps } from './utils'
import './style.scss'

type FormItemMappedProps = Record<string, unknown> & {
  'asterisk'?: boolean
  'disabled'?: boolean | null
  'readonly'?: boolean | null
  'onUpdate:modelValue'?: unknown
}

export function fieldFeedbackMapper(props: Record<string, unknown>, field: GeneralField | null | undefined) {
  if (isVoidField(field) || !field) {
    return props
  }

  const mappedProps = props as FormItemMappedProps
  const {
    'onUpdate:modelValue': componentModelValueHandler,
    ...bridgedProps
  } = getVanFieldBridgedProps(field)
  const feedbackStatus = determineFeedbackStatus(field)
  const feedbackText = ['error', 'warning'].includes(feedbackStatus)
    ? getFeedbackMessage(field)
    : undefined
  const asterisk = 'asterisk' in mappedProps
    ? mappedProps.asterisk
    : field.required && field.pattern !== 'readPretty'
  const decoratorModelValueHandler = mappedProps['onUpdate:modelValue']
  const shouldBridgeFieldValue = Boolean(
    componentModelValueHandler
    || decoratorModelValueHandler
    || Object.keys(bridgedProps).length,
  )

  return {
    ...bridgedProps,
    ...mappedProps,
    feedbackStatus,
    feedbackText,
    fieldAddress: field.address?.toString(),
    fieldPath: field.path?.toString(),
    asterisk,
    ...(shouldBridgeFieldValue
      ? {
          'modelValue': field.value,
          'onUpdate:modelValue': (...args) => {
            field.onInput(...args)
            callListener(decoratorModelValueHandler, ...args)
            callListener(componentModelValueHandler, ...args)
          },
        }
      : {}),
    disabled: mappedProps.disabled || bridgedProps.disabled || field.pattern === 'disabled',
    readonly: mappedProps.readonly || bridgedProps.readonly || field.pattern === 'readOnly',
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
export type { FormItemContent, FormItemFeedbackStatus, FormItemProps } from './types'
