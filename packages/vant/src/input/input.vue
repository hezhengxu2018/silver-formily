<script setup lang="ts">
import { isValid } from '@formily/shared'
import { computed } from 'vue'
import { useCleanAttrs } from '../__builtins__'
import { useVantFormItemControlContext } from '../form-item/context'

defineOptions({
  name: 'FInput',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  modelValue?: string | number | null
  type?: string
}>(), {
  type: 'text',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { props: inputProps } = useCleanAttrs(['modelValue', 'onUpdate:modelValue', 'type'])
const formItemControlContext = useVantFormItemControlContext()
console.log(inputProps.value)
const isTextArea = computed(() => props.type === 'textarea')
const inputValue = computed(() => isValid(props.modelValue) ? String(props.modelValue) : '')
const controlClasses = computed(() => [
  'van-field__control',
  formItemControlContext?.value.error && 'van-field__control--error',
  formItemControlContext?.value.inputAlign && `van-field__control--${formItemControlContext.value.inputAlign}`,
])
const resolvedDisabled = computed(() => {
  return inputProps.value.disabled ?? formItemControlContext?.value.disabled
})
const resolvedReadonly = computed(() => {
  return inputProps.value.readonly ?? formItemControlContext?.value.readonly
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <component
    :is="isTextArea ? 'textarea' : 'input'"
    v-bind="inputProps"
    :class="controlClasses"
    :disabled="resolvedDisabled"
    :readonly="resolvedReadonly"
    :type="props.type"
    :value="inputValue"
    @input="onInput"
  />
</template>
