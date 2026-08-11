import type { VueComponentProps } from '@silver-formily/vue'
import type { ElOption, ElOptionGroup, ElSelect } from 'element-plus'
import { connect, mapProps } from '@silver-formily/vue'
import { mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FSelect from './select.vue'

type SelectOption = VueComponentProps<typeof ElOption>
type SelectOptionGroup = VueComponentProps<typeof ElOptionGroup> & {
  options: SelectOption[]
}

export type SelectProps = VueComponentProps<typeof ElSelect> & {
  options?: Array<SelectOption | SelectOptionGroup>
}
export type SelectComponent = typeof ElSelect

export const Select = connect<typeof FSelect, SelectProps>(
  FSelect,
  mapProps({ dataSource: 'options', loading: true, disabled: true }),
  mapReadPretty(PreviewText.Select),
)

export default Select
