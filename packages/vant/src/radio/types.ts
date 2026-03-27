import type {
  RadioGroupDirection,
  RadioLabelPosition,
  RadioShape,
  RadioGroupProps as VanRadioGroupProps,
  RadioProps as VanRadioProps,
} from 'vant'
import type {
  CheckerOptionLike as BaseCheckerOptionLike,
  CheckerOptionValue as BaseCheckerOptionValue,
  CheckerGroupOptionSettings,
  CheckerOptionBase,
  CheckerResolvedOption,
} from '../__builtins__'

export type RadioOptionValue = BaseCheckerOptionValue

export interface RadioOption extends CheckerOptionBase<VanRadioProps, RadioOptionValue> {}

export type RadioOptionLike = BaseCheckerOptionLike<RadioOption>

export interface RadioGroupProps extends Pick<VanRadioGroupProps, 'checkedColor' | 'direction' | 'disabled' | 'iconSize' | 'modelValue' | 'shape'>, CheckerGroupOptionSettings<RadioLabelPosition> {
  options?: RadioOptionLike[]
  readonly?: boolean
  readOnly?: boolean
}

export interface ResolvedRadioOption extends CheckerResolvedOption<VanRadioProps, RadioOption, 'radioProps', RadioOptionValue> {}

export interface RadioOptionSlotProps {
  option: ResolvedRadioOption
}

export type { RadioGroupDirection, RadioLabelPosition, RadioShape, VanRadioGroupProps, VanRadioProps }
