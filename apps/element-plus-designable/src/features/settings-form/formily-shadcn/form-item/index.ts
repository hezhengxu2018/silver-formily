import { connect, mapProps } from '@silver-formily/vue'
import { composeExport } from '../../../renderer/shared'
import FormBaseItem from './FormItem.vue'
import { fieldFeedbackMapper } from './utils'

const Item = connect<typeof FormBaseItem>(
  FormBaseItem,
  mapProps(
    {
      description: 'description',
      required: true,
      title: 'label',
    },
    fieldFeedbackMapper,
  ),
)

export const FormItem = composeExport(Item, {
  BaseItem: FormBaseItem,
})

export default FormItem

export { default as FormBaseItem } from './FormItem.vue'
export { fieldFeedbackMapper } from './utils'
