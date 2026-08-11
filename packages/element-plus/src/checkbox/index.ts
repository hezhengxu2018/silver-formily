import type { VueComponentProps } from '@silver-formily/vue'
import type { ElCheckboxGroup, CheckboxProps as ElementCheckboxProps } from 'element-plus'
import { connect, mapProps } from '@silver-formily/vue'
import { ElCheckbox } from 'element-plus'
import { composeExport, mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FCheckboxGroup from './checkbox-group.vue'

export type CheckboxProps = VueComponentProps<typeof ElCheckbox>
export type CheckboxComponent = typeof ElCheckbox
export type CheckboxGroupProps = VueComponentProps<typeof ElCheckboxGroup> & {
  options?: Array<ElementCheckboxProps>
  optionType?: 'default' | 'button'
}
export type CheckboxGroupComponent = typeof ElCheckboxGroup

const CheckboxGroup = connect<typeof FCheckboxGroup, CheckboxGroupProps>(
  FCheckboxGroup,
  mapProps({ dataSource: 'options', disabled: true }),
  mapReadPretty(PreviewText.Select, {
    multiple: true,
  }),
)

const InnerCheckbox = connect<typeof ElCheckbox>(
  ElCheckbox,
  mapProps({
    disabled: true,
  }),
)

export const Checkbox = composeExport(InnerCheckbox, {
  Group: CheckboxGroup,
})

export default Checkbox
