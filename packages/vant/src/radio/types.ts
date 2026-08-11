import type { VueComponentProps } from '@silver-formily/vue'
import type {
  RadioGroupDirection,
  RadioLabelPosition,
  RadioShape,
  Radio as VanRadio,
  RadioGroupProps as VanRadioGroupProps,
  RadioProps as VanRadioProps,
} from 'vant'
import type {
  CheckerGroupOptionSettings,
  CheckerOptionBase,
  CheckerResolvedOption,
} from '../__builtins__'

export type RadioOptionValue = VanRadioProps['name']

export type RadioProps = Partial<VueComponentProps<typeof VanRadio>>

export interface RadioOption extends CheckerOptionBase<VanRadioProps, RadioOptionValue> {}

export type RadioOptionLike = RadioOption

export interface RadioGroupProps extends Partial<Pick<VanRadioGroupProps, 'checkedColor' | 'direction' | 'disabled' | 'iconSize' | 'modelValue' | 'shape'>>, CheckerGroupOptionSettings<RadioLabelPosition> {
  options?: RadioOption[]
  cancelable?: boolean
  readonly?: boolean
  readOnly?: boolean
}

export interface ResolvedRadioOption extends CheckerResolvedOption<VanRadioProps, RadioOption, 'radioProps', RadioOptionValue> {}

export interface RadioOptionSlotProps {
  option: ResolvedRadioOption
}

export type { RadioGroupDirection, RadioLabelPosition, RadioShape, VanRadioGroupProps, VanRadioProps }
