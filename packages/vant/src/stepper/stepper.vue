<script setup lang="ts">
import type { StepperProps } from 'vant'
import { Stepper as VanStepper } from 'vant'
import { computed, useAttrs } from 'vue'

defineOptions({
  name: 'FStepper',
  inheritAttrs: false,
})

const props = defineProps<StepperProps>()
const attrs = useAttrs()

const usesImplicitEmptyState = computed(() => {
  return props.defaultValue === undefined
    && (props.modelValue === undefined || props.modelValue === null || props.modelValue === '')
})

const stepperBindings = computed(() => {
  return {
    ...attrs,
    ...props,
    allowEmpty: usesImplicitEmptyState.value ? true : props.allowEmpty,
    modelValue: usesImplicitEmptyState.value ? '' : props.modelValue,
  }
})
</script>

<template>
  <VanStepper v-bind="stepperBindings" />
</template>
