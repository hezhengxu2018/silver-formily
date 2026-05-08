<script setup lang="ts">
import type { CheckerOptionPropKey } from '../__builtins__'
import type {
  CheckboxGroupProps,
  CheckboxOption,
  ResolvedCheckboxOption,
  VanCheckboxProps,
} from './types'
import { Checkbox as VanCheckbox, CheckboxGroup as VanCheckboxGroup } from 'vant'
import { computed, useSlots } from 'vue'
import { resolveCheckerGroupOptions, useCleanAttrs, useHasCustomDefaultSlot } from '../__builtins__'

defineOptions({
  name: 'FCheckboxGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  options: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: unknown[]]
  'change': [value: unknown[]]
}>()

const slots = useSlots()
const { props: attrs } = useCleanAttrs(['options'])
const hasCustomDefaultSlot = useHasCustomDefaultSlot(slots.default)
const CHECKBOX_OPTION_PROP_KEYS = [
  'bindGroup',
  'checkedColor',
  'disabled',
  'iconSize',
  'indeterminate',
  'labelDisabled',
  'labelPosition',
  'shape',
] satisfies Array<CheckerOptionPropKey<VanCheckboxProps>>

const resolvedOptions = computed<ResolvedCheckboxOption[]>(() => {
  return resolveCheckerGroupOptions<VanCheckboxProps, CheckboxOption, 'checkboxProps'>({
    options: props.options,
    optionPropsKey: 'checkboxProps',
    optionPropKeys: CHECKBOX_OPTION_PROP_KEYS,
    labelPosition: props.labelPosition,
    labelDisabled: props.labelDisabled,
  })
})

const checkboxGroupProps = computed(() => {
  return {
    ...attrs.value,
    checkedColor: props.checkedColor,
    direction: props.direction,
    disabled: props.disabled,
    iconSize: props.iconSize,
    max: props.max,
    modelValue: props.modelValue ?? [],
    shape: props.shape,
  }
})
</script>

<template>
  <VanCheckboxGroup
    v-bind="checkboxGroupProps"
    @update:model-value="(value) => emit('update:modelValue', value)"
    @change="(value) => emit('change', value)"
  >
    <slot v-if="hasCustomDefaultSlot" />
    <template v-else>
      <template v-for="(option, index) in resolvedOptions" :key="index">
        <VanCheckbox v-bind="option.checkboxProps">
          <slot v-if="$slots.option" name="option" :option="option" />
          <template v-else>
            {{ option.label }}
          </template>
        </VanCheckbox>
      </template>
    </template>
  </VanCheckboxGroup>
</template>
