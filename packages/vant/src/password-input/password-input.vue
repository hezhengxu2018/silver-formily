<script setup lang="ts">
import type { PasswordInputKeyboardProps, PasswordInputProps } from './types'
import { isValid } from '@formily/shared'
import { NumberKeyboard as VanNumberKeyboard, PasswordInput as VanPasswordInput } from 'vant'
import { computed, ref, watch } from 'vue'
import { useCleanAttrs } from '../__builtins__'
import { useVantFormItemControlContext } from '../form-item/context'

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

const { props: attrs } = useCleanAttrs([
  'disabled',
  'errorInfo',
  'focused',
  'gutter',
  'keyboard',
  'info',
  'length',
  'mask',
  'modelValue',
  'onBlur',
  'onClose',
  'onDelete',
  'onFocus',
  'onHide',
  'onInput',
  'onShow',
  'onUpdate:modelValue',
  'readOnly',
  'readonly',
])

const formItemControlContext = useVantFormItemControlContext()
const keyboardVisible = ref(false)

const resolvedDisabled = computed(() => {
  return props.disabled ?? formItemControlContext?.value.disabled ?? false
})

const resolvedReadonly = computed(() => {
  return props.readonly ?? props.readOnly ?? formItemControlContext?.value.readonly ?? false
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
  if (props.keyboard && typeof props.keyboard === 'object') {
    return props.keyboard
  }

  return {}
})

const resolvedFocused = computed(() => {
  if (resolvedDisabled.value || resolvedReadonly.value) {
    return false
  }

  return keyboardEnabled.value
    ? keyboardVisible.value
    : Boolean(props.focused)
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
    show: keyboardEnabled.value && keyboardVisible.value,
  }
})

watch(keyboardEnabled, (value) => {
  if (!value) {
    keyboardVisible.value = false
  }
})

watch([resolvedDisabled, resolvedReadonly], ([disabled, readonly]) => {
  if (disabled || readonly) {
    keyboardVisible.value = false
  }
})

watch([inputValue, resolvedLength], ([value, length]) => {
  if (keyboardVisible.value && Number.isFinite(length) && value.length >= length) {
    keyboardVisible.value = false
  }
})

function onFocus(event: TouchEvent) {
  if (resolvedDisabled.value || resolvedReadonly.value) {
    return
  }

  if (keyboardEnabled.value) {
    keyboardVisible.value = true
  }

  emit('focus', event)
}

function onKeyboardModelValueChange(value: string) {
  emit('update:modelValue', value.slice(0, resolvedLength.value))
}

function onKeyboardBlur() {
  keyboardVisible.value = false
  emit('blur')
}

function onKeyboardClose() {
  keyboardVisible.value = false
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
