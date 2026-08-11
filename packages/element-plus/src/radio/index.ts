import type { VueComponentProps } from '@silver-formily/vue'
import type { RadioProps as ElementRadioProps, ElRadioGroup } from 'element-plus'
import { connect, mapProps } from '@silver-formily/vue'
import { ElRadio } from 'element-plus'
import { composeExport, mapReadPretty } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FRadioGroup from './radio-group.vue'
import './style.scss'

export type RadioProps = VueComponentProps<typeof ElRadio>
export type RadioComponent = typeof ElRadio
export type RadioGroupProps = VueComponentProps<typeof ElRadioGroup> & {
  options?: Array<ElementRadioProps | string | number>
  optionType?: 'default' | 'button'
}
export type RadioGroupComponent = typeof ElRadioGroup

const RadioGroup = connect<typeof FRadioGroup, RadioGroupProps>(
  FRadioGroup,
  mapProps({ dataSource: 'options', disabled: true }),
  mapReadPretty(PreviewText.Select),
)
export const Radio = composeExport(ElRadio, {
  Group: RadioGroup,
})

export default Radio
