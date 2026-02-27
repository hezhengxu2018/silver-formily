import { connect, mapProps } from '@silver-formily/vue'
import { ElRadio } from 'element-plus'
import { composeExport, mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FRadioGroup from './radio-group.vue'
import './style.scss'

const RadioGroup = connect<typeof FRadioGroup>(
  FRadioGroup,
  mapProps({ dataSource: 'options', disabled: true }),
  mapReadPretty(PreviewText.Select),
)
export const Radio = composeExport(ElRadio, {
  Group: RadioGroup,
})

export default Radio
