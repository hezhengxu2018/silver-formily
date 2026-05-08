<script setup lang="ts">
import type { CheckerOptionPropKey } from '../__builtins__'
import type { RadioGroupProps, RadioOption, ResolvedRadioOption, VanRadioProps } from './types'
import { Radio as VanRadio, RadioGroup as VanRadioGroup } from 'vant'
import { computed, useSlots } from 'vue'
import { resolveCheckerGroupOptions, useCleanAttrs, useHasCustomDefaultSlot } from '../__builtins__'

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
const { props: attrs } = useCleanAttrs()
const hasCustomDefaultSlot = useHasCustomDefaultSlot(slots.default)
const RADIO_OPTION_PROP_KEYS = [
  'checkedColor',
  'disabled',
  'iconSize',
  'labelDisabled',
  'labelPosition',
  'shape',
] satisfies Array<CheckerOptionPropKey<VanRadioProps>>

const resolvedOptions = computed<ResolvedRadioOption[]>(() => {
  return resolveCheckerGroupOptions<VanRadioProps, RadioOption, 'radioProps'>({
    options: props.options,
    optionPropsKey: 'radioProps',
    optionPropKeys: RADIO_OPTION_PROP_KEYS,
    labelPosition: props.labelPosition,
    labelDisabled: props.labelDisabled,
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

function onUpdateModelValue(value: unknown) {
  if (props.cancelable && value === props.modelValue) {
    emit('update:modelValue', undefined)
    return
  }

  emit('update:modelValue', value)
}
</script>

<template>
  <VanRadioGroup
    v-bind="radioGroupProps"
    @update:model-value="onUpdateModelValue"
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
