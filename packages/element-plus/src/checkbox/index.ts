import { connect, mapProps } from '@silver-formily/vue'
import { ElCheckbox } from 'element-plus'
import { composeExport, mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FCheckboxGroup from './checkbox-group.vue'

const CheckboxGroup = connect<typeof FCheckboxGroup>(
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
