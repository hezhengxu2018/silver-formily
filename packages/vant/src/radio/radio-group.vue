<script setup lang="ts">
import type { RadioGroupProps, RadioOption, RadioOptionLike, ResolvedRadioOption } from './types'
import { isPlainObj, isValid } from '@formily/shared'
import { Radio as VanRadio, RadioGroup as VanRadioGroup } from 'vant'
import { computed, useSlots } from 'vue'
import { useCleanAttrs } from '../__builtins__'

defineOptions({
  name: 'FRadioGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RadioGroupProps>(), {
  options: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: unknown]
}>()

const slots = useSlots()
const { props: attrs } = useCleanAttrs(['options', 'onChange', 'onUpdate:modelValue'])
const hasCustomDefaultSlot = computed(() => {
  return Boolean(slots.default?.({}).length)
})

function isRadioOptionObject(option: RadioOptionLike): option is RadioOption {
  return isPlainObj(option)
}

function resolveOptionValue(option: RadioOptionLike) {
  if (!isRadioOptionObject(option))
    return option

  if ('value' in option)
    return option.value

  if ('name' in option)
    return option.name

  return option.label
}

function resolveOptionLabel(option: RadioOptionLike, value: unknown) {
  if (!isRadioOptionObject(option))
    return option

  return isValid(option.label)
    ? option.label
    : value
}

const resolvedOptions = computed<ResolvedRadioOption[]>(() => {
  return props.options.map((option) => {
    const value = resolveOptionValue(option)
    const label = resolveOptionLabel(option, value)
    const radioProps = isRadioOptionObject(option)
      ? (() => {
          const { label: _label, name: _name, value: _value, ...optionProps } = option

          return {
            ...optionProps,
            name: value,
            labelPosition: option.labelPosition ?? props.labelPosition,
            labelDisabled: option.labelDisabled ?? props.labelDisabled,
          }
        })()
      : {
          name: value,
          labelPosition: props.labelPosition,
          labelDisabled: props.labelDisabled,
        }

    return {
      ...(isRadioOptionObject(option) ? option : {}),
      label,
      value,
      radioProps,
    }
  })
})

const radioGroupProps = computed(() => {
  return {
    ...attrs.value,
    checkedColor: props.checkedColor,
    direction: props.direction,
    disabled: props.disabled,
    iconSize: props.iconSize,
    modelValue: props.modelValue,
    shape: props.shape,
  }
})
</script>

<template>
  <VanRadioGroup
    v-bind="radioGroupProps"
    @update:model-value="(value) => emit('update:modelValue', value)"
  >
    <slot v-if="hasCustomDefaultSlot" />
    <template v-else>
      <template v-for="(option, index) in resolvedOptions" :key="index">
        <VanRadio v-bind="option.radioProps">
          <slot v-if="slots.option" name="option" :option="option" />
          <template v-else>
            {{ option.label }}
          </template>
        </VanRadio>
      </template>
    </template>
  </VanRadioGroup>
</template>
