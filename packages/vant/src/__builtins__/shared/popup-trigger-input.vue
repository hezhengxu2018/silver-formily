<script setup lang="ts">
import { computed } from 'vue'
import { useVantFormItemControlContext } from '../../form-item/context'

defineOptions({
  name: 'PopupTriggerInput',
  inheritAttrs: false,
})

const props = defineProps<{
  inputProps?: Record<string, any>
  disabled?: boolean
  value?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const formItemControlContext = useVantFormItemControlContext()
const inputId = computed(() => {
  const explicitId = props.inputProps?.id
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
])
</script>

<template>
  <input
    v-bind="props.inputProps"
    :id="inputId"
    type="text"
    :aria-labelledby="labelledBy"
    :class="controlClasses"
    data-allow-mismatch="attribute"
    :disabled="props.disabled"
    readonly
    :value="props.value"
    :placeholder="props.placeholder"
    @click="(event) => emit('click', event)"
  >
</template>
