<script setup lang="ts">
import type { StepperProps } from 'vant'
import { Stepper as VanStepper } from 'vant'
import { computed } from 'vue'
import { useCleanAttrs } from '../__builtins__'

defineOptions({
  name: 'FStepper',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<StepperProps>(), {
  showPlus: true,
  showMinus: true,
  showInput: true,
  longPress: true,
  autoFixed: true,
})
const { props: cleanProps } = useCleanAttrs()

// Keep Formily empty fields truly empty instead of letting Vant's Stepper
// eagerly fall back to its built-in defaultValue = 1.
const usesImplicitEmptyState = computed(() => {
  return props.defaultValue === undefined
    && (props.modelValue === undefined || props.modelValue === null || props.modelValue === '')
})

const stepperBindings = computed(() => {
  return {
    ...cleanProps.value,
    ...props,
    allowEmpty: usesImplicitEmptyState.value ? true : props.allowEmpty,
    modelValue: usesImplicitEmptyState.value ? '' : props.modelValue,
  }
})
</script>

<template>
  <VanStepper v-bind="stepperBindings" />
</template>
