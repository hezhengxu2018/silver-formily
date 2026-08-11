import type { VueComponentProps } from '@silver-formily/vue'
import type { ElPopover } from 'element-plus'
import type { FormItemProps } from '../form-item/types'
import { connect, mapProps } from '@silver-formily/vue'
import { composeExport } from '../__builtins__/shared'
import { fieldFeedbackMapper } from '../form-item'
import FEditablePopover from './editable-popover.vue'
import FEditable from './editable.vue'
import './style.scss'

export type EditableProps = FormItemProps & { editProps?: FormItemProps }
export type EditablePopoverProps = VueComponentProps<typeof ElPopover>
export type EditableComponent = typeof FEditable
export type EditablePopoverComponent = typeof ElPopover

const EditableInner = connect<typeof FEditable, EditableProps>(FEditable, mapProps(
  {
    required: true,
    description: 'extra',
  },
  fieldFeedbackMapper,
))

const EditablePopover = connect<typeof FEditablePopover, EditablePopoverProps>(FEditablePopover, mapProps(
  {
    required: true,
    description: 'extra',
  },
  fieldFeedbackMapper,
))

export const Editable = composeExport(EditableInner, {
  Popover: EditablePopover,
})

export default Editable
