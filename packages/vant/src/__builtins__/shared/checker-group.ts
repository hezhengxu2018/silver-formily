import type { ComputedRef, Slot } from 'vue'
import { isPlainObj, isValid } from '@formily/shared'
import { computed } from 'vue'

export type CheckerOptionValue = unknown

export interface CheckerGroupOptionSettings<TLabelPosition = unknown> {
  labelPosition?: TLabelPosition
  labelDisabled?: boolean
}

export type CheckerOptionBase<
  TComponentProps extends object = Record<string, unknown>,
  TValue = CheckerOptionValue,
> = Partial<Omit<TComponentProps, 'modelValue' | 'name'>> & CheckerGroupOptionSettings & {
  label?: any
  value?: TValue
  name?: TValue
}

export type CheckerOptionLike<TOption extends CheckerOptionBase<any, any>> = TOption | string | number | boolean

export type CheckerResolvedOption<
  TComponentProps extends object,
  TOption extends CheckerOptionBase<TComponentProps, TValue>,
  TPropsKey extends string,
  TValue = CheckerOptionValue,
> = Omit<TOption, 'name'> & {
  label?: any
  value: TValue
} & Record<TPropsKey, Partial<Omit<TComponentProps, 'modelValue'>> & {
  name: TValue
}>

export function useHasCustomDefaultSlot(slot: Slot | undefined): ComputedRef<boolean> {
  return computed(() => {
    return Boolean(slot?.({}).length)
  })
}

function isCheckerOptionObject<
  TComponentProps extends object,
  TOption extends CheckerOptionBase<TComponentProps, TValue>,
  TValue = CheckerOptionValue,
>(option: CheckerOptionLike<TOption>): option is TOption {
  return isPlainObj(option)
}

function resolveCheckerOptionValue<
  TComponentProps extends object,
  TOption extends CheckerOptionBase<TComponentProps, TValue>,
  TValue = CheckerOptionValue,
>(option: CheckerOptionLike<TOption>): TValue {
  if (!isCheckerOptionObject(option))
    return option as TValue

  if ('value' in option)
    return option.value as TValue

  if ('name' in option)
    return option.name as TValue

  return option.label as TValue
}

function resolveCheckerOptionLabel<
  TComponentProps extends object,
  TOption extends CheckerOptionBase<TComponentProps, TValue>,
  TValue = CheckerOptionValue,
>(option: CheckerOptionLike<TOption>, value: TValue) {
  if (!isCheckerOptionObject(option))
    return option

  return isValid(option.label)
    ? option.label
    : value
}

export function resolveCheckerGroupOptions<
  TComponentProps extends CheckerGroupOptionSettings<TLabelPosition>,
  TOption extends CheckerOptionBase<TComponentProps, TValue>,
  TPropsKey extends string,
  TValue = CheckerOptionValue,
  TLabelPosition = unknown,
>(params: {
  options: Array<CheckerOptionLike<TOption>>
  optionPropsKey: TPropsKey
} & CheckerGroupOptionSettings<TLabelPosition>): Array<CheckerResolvedOption<TComponentProps, TOption, TPropsKey, TValue>> {
  const { labelDisabled, labelPosition, optionPropsKey, options } = params

  return options.map((option) => {
    const value = resolveCheckerOptionValue(option)
    const label = resolveCheckerOptionLabel(option, value)
    const optionProps = isCheckerOptionObject(option)
      ? (() => {
          const { label: _label, name: _name, value: _value, ...restOptionProps } = option

          return {
            ...restOptionProps,
            name: value,
            labelPosition: option.labelPosition ?? labelPosition,
            labelDisabled: option.labelDisabled ?? labelDisabled,
          }
        })()
      : {
          name: value,
          labelPosition,
          labelDisabled,
        }

    return {
      ...(isCheckerOptionObject(option) ? option : {}),
      label,
      value,
      [optionPropsKey]: optionProps,
    } as CheckerResolvedOption<TComponentProps, TOption, TPropsKey, TValue>
  })
}
