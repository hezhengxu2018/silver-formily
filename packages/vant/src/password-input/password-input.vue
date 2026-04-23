<script setup lang="ts">
import type { PasswordInputKeyboardProps, PasswordInputProps } from './types'
import { isObj, isValid } from '@formily/shared'
import { NumberKeyboard as VanNumberKeyboard, PasswordInput as VanPasswordInput } from 'vant'
import { computed, ref, watch } from 'vue'
import { useCleanAttrs, useHasExplicitVNodeProp } from '../__builtins__'

defineOptions({
  name: 'FPasswordInput',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PasswordInputProps>(), {
  keyboard: false,
  mask: true,
  length: 6,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'blur': []
  'close': []
  'delete': []
  'focus': [event: TouchEvent]
  'hide': []
  'input': [value: string]
  'show': []
}>()

const { props: attrs } = useCleanAttrs()
const hasExplicitVNodeProp = useHasExplicitVNodeProp()
const isFocusedControlled = hasExplicitVNodeProp('focused')
const keyboardVisible = ref(false)

const canInteract = computed(() => {
  return !props.disabled && !props.readonly
})

const inputValue = computed(() => {
  return isValid(props.modelValue) ? String(props.modelValue) : ''
})

const keyboardEnabled = computed(() => props.keyboard !== false && isValid(props.keyboard))

const resolvedLength = computed(() => {
  const nextValue = Number(props.length)

  return Number.isFinite(nextValue)
    ? Math.max(Math.trunc(nextValue), 0)
    : Infinity
})

const keyboardConfig = computed<PasswordInputKeyboardProps>(() => {
  if (isObj(props.keyboard)) {
    return props.keyboard
  }

  return {}
})

const resolvedFocused = computed(() => {
  if (!canInteract.value) {
    return false
  }

  if (isFocusedControlled) {
    return Boolean(props.focused)
  }

  return keyboardEnabled.value
    ? keyboardVisible.value
    : false
})

const passwordInputProps = computed(() => {
  return {
    ...attrs.value,
    errorInfo: props.errorInfo,
    focused: resolvedFocused.value,
    gutter: props.gutter,
    info: props.info,
    length: props.length,
    mask: props.mask,
    value: inputValue.value,
  }
})

const numberKeyboardProps = computed(() => {
  return {
    ...keyboardConfig.value,
    maxlength: resolvedLength.value,
    modelValue: inputValue.value,
    show: keyboardEnabled.value && resolvedFocused.value,
  }
})

function setKeyboardVisible(value: boolean) {
  if (isFocusedControlled) {
    return
  }

  keyboardVisible.value = value
}

function openKeyboard() {
  if (!keyboardEnabled.value || !canInteract.value) {
    return
  }

  setKeyboardVisible(true)
}

function closeKeyboard() {
  setKeyboardVisible(false)
}

watch([keyboardEnabled, canInteract], ([enabled, interactive]) => {
  if (!enabled || !interactive) {
    closeKeyboard()
  }
})

watch([inputValue, resolvedLength], ([value, length]) => {
  if (keyboardVisible.value && Number.isFinite(length) && value.length >= length) {
    closeKeyboard()
  }
})

function onFocus(event: TouchEvent) {
  if (!canInteract.value) {
    return
  }

  openKeyboard()
  emit('focus', event)
}

function onKeyboardModelValueChange(value: string) {
  emit('update:modelValue', value.slice(0, resolvedLength.value))
}

function onKeyboardBlur() {
  closeKeyboard()
  emit('blur')
}

function onKeyboardClose() {
  closeKeyboard()
  emit('close')
}

function onKeyboardDelete() {
  emit('delete')
}

function onKeyboardInput(value: string) {
  emit('input', value)
}
</script>

<template>
  <VanPasswordInput
    v-bind="passwordInputProps"
    @focus="onFocus"
  />

  <VanNumberKeyboard
    v-if="keyboardEnabled"
    v-bind="numberKeyboardProps"
    @update:model-value="onKeyboardModelValueChange"
    @blur="onKeyboardBlur"
    @close="onKeyboardClose"
    @delete="onKeyboardDelete"
    @hide="emit('hide')"
    @input="onKeyboardInput"
    @show="emit('show')"
  />
</template>
