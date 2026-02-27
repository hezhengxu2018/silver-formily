import type { ElPopover } from 'element-plus'
import type { IFormItemProps } from '../form-item/types'
import { connect, mapProps } from '@silver-formily/vue'
import { composeExport } from '../__builtins__/shared'
import { fieldFeedbackMapper } from '../form-item'
import FEditablePopover from './editable-popover.vue'
import FEditable from './editable.vue'
import './style.scss'

export type EditableProps = IFormItemProps
export type EditablePopoverProps = typeof ElPopover

const EditableInner = connect<typeof FEditable>(FEditable, mapProps(
  {
    required: true,
    description: 'extra',
  },
  fieldFeedbackMapper,
))

const EditablePopover = connect<typeof FEditablePopover>(FEditablePopover, mapProps(
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
