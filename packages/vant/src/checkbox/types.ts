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
  CheckerGroupOptionSettings,
  CheckerOptionBase,
  CheckerResolvedOption,
} from '../__builtins__'

export type CheckboxOptionValue = VanCheckboxProps['name']

export type CheckboxProps = VanCheckboxProps

export interface CheckboxOption extends CheckerOptionBase<VanCheckboxProps, CheckboxOptionValue> {}

export type CheckboxOptionLike = CheckboxOption

export interface CheckboxGroupProps extends Pick<VanCheckboxGroupProps, 'checkedColor' | 'direction' | 'disabled' | 'iconSize' | 'max' | 'modelValue' | 'shape'>, CheckerGroupOptionSettings<CheckboxLabelPosition> {
  options?: CheckboxOption[]
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
