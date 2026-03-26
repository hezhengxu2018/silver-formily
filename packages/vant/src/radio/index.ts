import { connect, mapProps, mapReadPretty } from '@silver-formily/vue'
import { Radio as VanRadio } from 'vant'
import { composeExport } from '../__builtins__'
import { PreviewText } from '../preview-text'
import FRadioGroup from './radio-group.vue'

const RadioGroup = connect<typeof FRadioGroup>(
  FRadioGroup,
  mapProps({
    dataSource: 'options',
    disabled: true,
    readOnly: 'readonly',
  }),
  mapReadPretty(PreviewText.Select),
)

export const Radio = composeExport(VanRadio, {
  Group: RadioGroup,
})

export default Radio

export type {
  RadioGroupDirection,
  RadioGroupProps,
  RadioLabelPosition,
  RadioOption,
  RadioOptionLike,
  RadioOptionSlotProps,
  RadioShape,
  ResolvedRadioOption,
  VanRadioGroupProps,
  VanRadioProps,
} from './types'
