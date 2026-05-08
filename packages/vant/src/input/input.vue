<script setup lang="ts">
import type { InputProps } from './types'
import { isValid } from '@formily/shared'
import { computed, onBeforeUnmount, ref, watchEffect } from 'vue'
import { useCleanAttrs } from '../__builtins__'
import { useVantFormItemControlContext } from '../form-item/context'

defineOptions({
  name: 'FInput',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { props: inputProps } = useCleanAttrs()
const formItemControlContext = useVantFormItemControlContext()
const inputElement = ref<HTMLInputElement | HTMLTextAreaElement>()
const isTextArea = computed(() => props.type === 'textarea')
const inputValue = computed(() => isValid(props.modelValue) ? String(props.modelValue) : '')
const nativeInputProps = computed(() => {
  const {
    formatter: _formatter,
    formatTrigger: _formatTrigger,
    ...attrs
  } = inputProps.value

  return attrs
})
const resolvedFormatTrigger = computed(() => props.formatTrigger === 'onBlur' ? 'onBlur' : 'onChange')
const inputId = computed(() => {
  const explicitId = inputProps.value.id
  if (typeof explicitId === 'string' && explicitId) {
    return explicitId
  }

  return formItemControlContext?.value.inputId
})
const labelledBy = computed(() => formItemControlContext?.value.labelId)
const controlClasses = computed(() => [
  'van-field__control',
  formItemControlContext?.value.error && 'van-field__control--error',
  formItemControlContext?.value.inputAlign && `van-field__control--${formItemControlContext.value.inputAlign}`,
  isTextArea.value && !inputProps.value.autosize && 'van-field__control--min-height',
])

function focusInputElement() {
  const element = inputElement.value
  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    element.focus()
  }
}

watchEffect(() => {
  formItemControlContext?.value.registerInputController?.({
    focus: focusInputElement,
    id: inputId.value,
  })
})

onBeforeUnmount(() => {
  formItemControlContext?.value.registerInputController?.(null)
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  const nextValue = resolvedFormatTrigger.value === 'onChange'
    ? props.formatter?.(target.value) ?? target.value
    : target.value

  if (target.value !== nextValue) {
    target.value = nextValue
  }

  emit('update:modelValue', nextValue)
}

function onBlur(event: FocusEvent) {
  if (resolvedFormatTrigger.value !== 'onBlur') {
    return
  }

  const target = event.target as HTMLInputElement | HTMLTextAreaElement | null
  if (!target) {
    return
  }

  const nextValue = props.formatter?.(target.value) ?? target.value

  if (target.value !== nextValue) {
    target.value = nextValue
  }

  emit('update:modelValue', nextValue)
}
</script>

<template>
  <component
    :is="isTextArea ? 'textarea' : 'input'"
    v-bind="nativeInputProps"
    :id="inputId"
    ref="inputElement"
    :aria-labelledby="labelledBy"
    :class="controlClasses"
    data-allow-mismatch="attribute"
    :type="isTextArea ? undefined : props.type"
    :value="inputValue"
    @blur="onBlur"
    @input="onInput"
  />
</template>
