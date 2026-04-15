<script setup lang="ts">
import type { InputProps } from './types'
import { isValid } from '@formily/shared'
import { computed } from 'vue'
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
const isTextArea = computed(() => props.type === 'textarea')
const inputValue = computed(() => isValid(props.modelValue) ? String(props.modelValue) : '')
const controlClasses = computed(() => [
  'van-field__control',
  formItemControlContext?.value.error && 'van-field__control--error',
  formItemControlContext?.value.inputAlign && `van-field__control--${formItemControlContext.value.inputAlign}`,
])

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
    :type="props.type"
    :value="inputValue"
    @input="onInput"
  />
</template>
