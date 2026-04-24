import type { ComputedRef, Slot } from 'vue'
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
  value: TValue
}

export type CheckerOptionLike<TOption extends CheckerOptionBase<any, any>> = TOption

export type CheckerOptionPropKey<TComponentProps extends object> = keyof Omit<TComponentProps, 'modelValue' | 'name'>

export type CheckerResolvedOption<
  TComponentProps extends object,
  TOption extends CheckerOptionBase<TComponentProps, TValue>,
  TPropsKey extends string,
  TValue = CheckerOptionValue,
> = TOption & {
  value: TValue
} & Record<TPropsKey, Partial<Omit<TComponentProps, 'modelValue'>>>

export function useHasCustomDefaultSlot(slot: Slot | undefined): ComputedRef<boolean> {
  return computed(() => {
    return Boolean(slot?.({}).length)
  })
}

export function resolveCheckerGroupOptions<
  TComponentProps extends CheckerGroupOptionSettings<TLabelPosition>,
  TOption extends CheckerOptionBase<TComponentProps, TValue>,
  TPropsKey extends string,
  TValue = CheckerOptionValue,
  TLabelPosition = unknown,
>(params: {
  options: TOption[]
  optionPropsKey: TPropsKey
  optionPropKeys?: ReadonlyArray<CheckerOptionPropKey<TComponentProps>>
} & CheckerGroupOptionSettings<TLabelPosition>): Array<CheckerResolvedOption<TComponentProps, TOption, TPropsKey, TValue>> {
  const { labelDisabled, labelPosition, optionPropKeys, optionPropsKey, options } = params
  const optionPropKeySet = optionPropKeys
    ? new Set<PropertyKey>(optionPropKeys)
    : undefined

  return options.map((option) => {
    const { label: _label, value, ...restOptionProps } = option
    const filteredOptionProps = optionPropKeySet
      ? Object.fromEntries(
          Object.entries(restOptionProps).filter(([key]) => optionPropKeySet.has(key)),
        )
      : restOptionProps
    const optionProps = {
      ...filteredOptionProps,
      name: value,
      labelPosition: option.labelPosition ?? labelPosition,
      labelDisabled: option.labelDisabled ?? labelDisabled,
    }

    return {
      ...option,
      value,
      [optionPropsKey]: optionProps,
    } as CheckerResolvedOption<TComponentProps, TOption, TPropsKey, TValue>
  })
}
