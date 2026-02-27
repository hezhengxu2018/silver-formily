import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@silver-formily/vue'
import { composeExport } from '../__builtins__'
import FormBaseItem from './form-item.vue'
import { determineFeedbackStatus, getFeedbackMessage } from './utils'
import './style.scss'

export function fieldFeedbackMapper(props, field) {
  if (isVoidField(field) || !field) {
    return props
  }

  const feedbackText = getFeedbackMessage(field)
  const feedbackStatus = determineFeedbackStatus(field)
  const asterisk = 'asterisk' in props
    ? props.asterisk
    : field.required && field.pattern !== 'readPretty'

  return {
    ...props,
    feedbackText,
    feedbackStatus,
    asterisk,
  }
}

const Item = connect<typeof FormBaseItem>(
  FormBaseItem,
  mapProps(
    {
      validateStatus: true,
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
export type { IFormItemProps } from './types'
