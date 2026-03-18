<script setup lang="ts">
import { computed } from 'vue'
import { useCleanAttrs } from '../__builtins__'

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

const isTextArea = computed(() => props.type === 'textarea')
const inputValue = computed(() => {
  return props.modelValue == null ? '' : String(props.modelValue)
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
    class="van-field__control"
    :type="isTextArea ? undefined : props.type"
    :value="inputValue"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
