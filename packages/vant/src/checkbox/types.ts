import type {
  CheckboxGroupDirection,
  CheckboxGroupToggleAllOptions,
  CheckboxLabelPosition,
  CheckboxShape,
  CheckboxThemeVars,
  CheckboxGroupProps as VanCheckboxGroupProps,
  CheckboxProps as VanCheckboxProps,
} from 'vant'
import type {
  CheckerOptionLike as BaseCheckerOptionLike,
  CheckerOptionValue as BaseCheckerOptionValue,
  CheckerGroupOptionSettings,
  CheckerOptionBase,
  CheckerResolvedOption,
} from '../__builtins__'

export type CheckboxOptionValue = BaseCheckerOptionValue

export type CheckboxProps = VanCheckboxProps

export interface CheckboxOption extends CheckerOptionBase<VanCheckboxProps, CheckboxOptionValue> {}

export type CheckboxOptionLike = BaseCheckerOptionLike<CheckboxOption>

export interface CheckboxGroupProps extends Pick<VanCheckboxGroupProps, 'checkedColor' | 'direction' | 'disabled' | 'iconSize' | 'max' | 'modelValue' | 'shape'>, CheckerGroupOptionSettings<CheckboxLabelPosition> {
  options?: CheckboxOptionLike[]
}

export interface ResolvedCheckboxOption extends CheckerResolvedOption<VanCheckboxProps, CheckboxOption, 'checkboxProps', CheckboxOptionValue> {}

export interface CheckboxOptionSlotProps {
  option: ResolvedCheckboxOption
}

export type {
  CheckboxGroupDirection,
  CheckboxGroupToggleAllOptions,
  CheckboxLabelPosition,
  CheckboxShape,
  CheckboxThemeVars,
  VanCheckboxGroupProps,
  VanCheckboxProps,
}
