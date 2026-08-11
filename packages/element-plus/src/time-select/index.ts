import type { VueComponentProps } from '@silver-formily/vue'
import { connect, mapProps } from '@silver-formily/vue'
import { ElTimeSelect } from 'element-plus'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'

export type TimeSelectProps = VueComponentProps<typeof ElTimeSelect>
export type TimeSelectComponent = typeof ElTimeSelect

export const TimeSelect = connect<typeof ElTimeSelect>(
  ElTimeSelect,
  mapProps({ disabled: 'disabled', editable: 'editable' }),
  mapReadPretty(PreviewText.Input),
)

export default TimeSelect
