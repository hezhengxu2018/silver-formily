import type {
  RadioGroupDirection,
  RadioLabelPosition,
  RadioShape,
  RadioGroupProps as VanRadioGroupProps,
  RadioProps as VanRadioProps,
} from 'vant'

export type RadioOptionValue = unknown

export interface RadioOption extends Partial<Omit<VanRadioProps, 'modelValue' | 'name'>> {
  label?: any
  value?: RadioOptionValue
  name?: RadioOptionValue
}

export type RadioOptionLike = RadioOption | string | number | boolean

export interface RadioGroupProps extends Pick<VanRadioGroupProps, 'checkedColor' | 'direction' | 'disabled' | 'iconSize' | 'modelValue' | 'shape'> {
  options?: RadioOptionLike[]
  readonly?: boolean
  readOnly?: boolean
  labelPosition?: RadioLabelPosition
  labelDisabled?: boolean
}

export interface ResolvedRadioOption extends Omit<RadioOption, 'name'> {
  label?: any
  value: RadioOptionValue
  radioProps: Partial<Omit<VanRadioProps, 'modelValue'>> & {
    name: RadioOptionValue
  }
}

export interface RadioOptionSlotProps {
  option: ResolvedRadioOption
}

export type { RadioGroupDirection, RadioLabelPosition, RadioShape, VanRadioGroupProps, VanRadioProps }
