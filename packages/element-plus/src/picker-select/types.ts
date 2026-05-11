import type { Field } from '@formily/core'

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

export interface PickerSelectProps {
  options?: PickerSelectOption[]
  openPicker?: PickerSelectOpenPicker
  cacheSelectedOptions?: boolean
}
