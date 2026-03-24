<script setup lang="ts">
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
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}>()

const { props: inputProps } = useCleanAttrs(['modelValue', 'onUpdate:modelValue', 'type'])
const formItemControlContext = useVantFormItemControlContext()

const isTextArea = computed(() => props.type === 'textarea')
const inputValue = computed(() => {
  return props.modelValue == null ? '' : String(props.modelValue)
})
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

function onFocus(event: FocusEvent) {
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
}
</script>

<template>
  <component
    :is="isTextArea ? 'textarea' : 'input'"
    v-bind="inputProps"
    :class="controlClasses"
    :disabled="resolvedDisabled"
    :readonly="resolvedReadonly"
    :type="isTextArea ? undefined : props.type"
    :value="inputValue"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
