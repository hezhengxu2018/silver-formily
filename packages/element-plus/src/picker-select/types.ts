import type { Field } from '@silver-formily/core'
import type { OptionValueProps } from '../__builtins__/shared/option-value'

export interface PickerSelectOption {
  label: string
  value: any
  disabled?: boolean
  raw?: any
}

export interface PickerSelectOpenContext {
  field?: Field
  dataSource: PickerSelectOption[]
  multiple: boolean
}

export type PickerSelectOpenPicker = (
  ctx: PickerSelectOpenContext,
) => Promise<PickerSelectOption | PickerSelectOption[] | null | undefined> | PickerSelectOption | PickerSelectOption[] | null | undefined

export interface PickerSelectProps extends OptionValueProps {
  options?: PickerSelectOption[]
  openPicker?: PickerSelectOpenPicker
  cacheSelectedOptions?: boolean
  valueKey?: string
}
