<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { FormItemProps } from './types'
import { isValid } from '@formily/shared'
import { isNil } from 'es-toolkit'
import { Cell as VanCell, Icon as VanIcon } from 'vant'
import { computed, isVNode, provide, ref } from 'vue'
import { useCleanAttrs, useHasExplicitVNodeProp } from '../__builtins__'
import { useVantFormContext, vantFormInheritedPropKeys } from '../form/context'
import { useVantFormItemRegistration } from '../form/hooks'
import { vantFormItemControlContextKey } from './context'
import { b } from './utils'

defineOptions({
  name: 'FFormItem',
  inheritAttrs: false,
})

const props = defineProps<FormItemProps>()
const emit = defineEmits<{
  'clear': [event: MouseEvent]
  'clickInput': [event: MouseEvent]
  'clickLeftIcon': [event: MouseEvent]
  'clickRightIcon': [event: MouseEvent]
  'update:modelValue': [value: string]
}>()

const slots = defineSlots<{
  'default'?: () => any
  'input'?: () => any
  'label'?: () => any
  'extra'?: () => any
  'button'?: () => any
  'left-icon'?: () => any
  'right-icon'?: () => any
  'error-message'?: (props: { message: string }) => any
}>()

const { props: attrs } = useCleanAttrs()
const hasExplicitVNodeProp = useHasExplicitVNodeProp()
const formContext = useVantFormContext()
const fieldRef = ref<ComponentPublicInstance | null>(null)
const focused = ref(false)

function resolveControlFlag(name: 'showError' | 'showErrorMessage', defaultValue: boolean) {
  const localValue = attrs.value[name]
  if (!isNil(localValue)) {
    return Boolean(localValue)
  }

  const inheritedValue = formContext?.value[name]
  if (!isNil(inheritedValue)) {
    return Boolean(inheritedValue)
  }

  return defaultValue
}

function resolveModelText(value: unknown) {
  if (isNil(value)) {
    return ''
  }

  return ['number', 'string'].includes(typeof value) ? String(value) : ''
}

const hasLabelSlot = computed(() => Boolean(slots.label) || isVNode(props.label))
const hasExtraProp = computed(() => isValid(props.extra))
const showError = computed(() => resolveControlFlag('showError', false))
const showErrorMessage = computed(() => resolveControlFlag('showErrorMessage', true))
const hasErrorMessageSlot = computed(() => {
  return showErrorMessage.value
    && (Boolean(slots['error-message']) || isVNode(props.feedbackText))
})

const resolvedFeedbackMessage = computed(() => {
  if (!showErrorMessage.value)
    return undefined

  if (!isValid(props.feedbackText))
    return undefined

  if (isVNode(props.feedbackText))
    return ' '

  return String(props.feedbackText)
})

const resolvedFieldProps = computed(() => {
  const hasFeedbackError = ['error', 'warning'].includes(props.feedbackStatus ?? '')
  const inheritedProps = formContext?.value ?? {}
  const mergedProps = { ...attrs.value }

  vantFormInheritedPropKeys.forEach((key) => {
    if (isNil(mergedProps[key]) && !isNil(inheritedProps[key])) {
      mergedProps[key] = inheritedProps[key]
    }
  })

  const {
    showError: _showError,
    showErrorMessage: _showErrorMessage,
    ...fieldProps
  } = mergedProps

  const error = fieldProps.error || (showError.value && hasFeedbackError)

  return {
    error,
    fieldProps,
  }
})

const formItemProps = computed(() => {
  return {
    ...resolvedFieldProps.value.fieldProps,
    label: hasLabelSlot.value ? undefined : props.label as string | number | undefined,
    required: hasExplicitVNodeProp('asterisk')
      ? props.asterisk
      : resolvedFieldProps.value.fieldProps.required,
    error: resolvedFieldProps.value.error,
    errorMessage: resolvedFeedbackMessage.value ?? resolvedFieldProps.value.fieldProps.errorMessage,
  }
})

const hasFieldBorder = computed(() => resolvedFieldProps.value.fieldProps.border !== false)
const shouldShowClear = computed(() => {
  if (!resolvedFieldProps.value.fieldProps.clearable || resolvedFieldProps.value.fieldProps.readonly) {
    return false
  }

  const hasValue = resolveModelText(resolvedFieldProps.value.fieldProps.modelValue) !== ''
  if (!hasValue) {
    return false
  }

  const clearTrigger = resolvedFieldProps.value.fieldProps.clearTrigger ?? 'focus'
  return clearTrigger === 'always' || (clearTrigger === 'focus' && focused.value)
})
const labelStyle = computed(() => {
  const labelWidth = formItemProps.value.labelWidth
  const labelAlign = formItemProps.value.labelAlign
  const style: Record<string, string> = {}

  if (labelWidth && labelAlign !== 'top') {
    style.width = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth
  }

  if (labelAlign && labelAlign !== 'top') {
    style.textAlign = labelAlign
  }

  return style
})
const topLabelStyle = computed(() => {
  const labelWidth = formItemProps.value.labelWidth
  if (!labelWidth || formItemProps.value.labelAlign !== 'top') {
    return undefined
  }

  return {
    width: typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth,
  }
})
const fieldClass = computed(() => {
  const labelAlign = formItemProps.value.labelAlign
  return [
    'van-field',
    formItemProps.value.error && 'van-field--error',
    formItemProps.value.disabled && 'van-field--disabled',
    labelAlign && `van-field--label-${labelAlign}`,
  ]
})
const labelClass = computed(() => {
  return [
    'van-field__label',
    formItemProps.value.labelAlign && `van-field__label--${formItemProps.value.labelAlign}`,
    formItemProps.value.required && 'van-field__label--required',
  ]
})
const resolvedErrorMessage = computed(() => {
  return resolvedFeedbackMessage.value ?? resolvedFieldProps.value.fieldProps.errorMessage
})
const resolvedErrorMessageText = computed(() => {
  return resolveModelText(resolvedErrorMessage.value)
})
const hasErrorMessage = computed(() => {
  return showErrorMessage.value && resolvedErrorMessageText.value !== ''
})
const fieldBodyClass = computed(() => [
  'van-field__body',
  slots.input && 'van-field__body--custom',
])
const modelValueLength = computed(() => {
  return resolveModelText(resolvedFieldProps.value.fieldProps.modelValue).length
})
const extraClass = b('extra')
const extraWrapperClass = b('extra-wrapper')

const rootClass = computed(() => {
  return [
    b(),
    b({
      'with-extra': hasExtraProp.value,
      'borderless': !hasFieldBorder.value,
    }),
  ]
})

useVantFormItemRegistration({
  fieldAddress: () => props.fieldAddress,
  fieldPath: () => props.fieldPath,
  fieldRef,
})

provide(vantFormItemControlContextKey, computed(() => ({
  disabled: resolvedFieldProps.value.fieldProps.disabled,
  error: resolvedFieldProps.value.error,
  inputAlign: resolvedFieldProps.value.fieldProps.inputAlign,
  readonly: resolvedFieldProps.value.fieldProps.readonly,
})))

function onClear(event: MouseEvent) {
  event.preventDefault()
  emit('update:modelValue', '')
  emit('clear', event)
}
</script>

<template>
  <div :class="rootClass">
    <VanCell
      ref="fieldRef"
      :class="fieldClass"
      :border="formItemProps.border"
      :center="formItemProps.center"
      :is-link="formItemProps.isLink"
      :clickable="formItemProps.clickable"
      :size="formItemProps.size"
      :arrow-direction="formItemProps.arrowDirection"
      :title-style="formItemProps.labelAlign === 'top' ? topLabelStyle : labelStyle"
      value-class="van-field__value"
      :title-class="labelClass"
      @focusin="focused = true"
      @focusout="focused = false"
    >
      <template #icon>
        <template v-if="formItemProps.labelAlign !== 'top'">
          <slot v-if="slots['left-icon']" name="left-icon" />
          <div v-else-if="formItemProps.leftIcon" class="van-field__left-icon" @click="emit('clickLeftIcon', $event)">
            <VanIcon :name="formItemProps.leftIcon" :class-prefix="formItemProps.iconPrefix" />
          </div>
        </template>
      </template>

      <template #title>
        <template v-if="formItemProps.labelAlign === 'top'">
          <slot v-if="slots['left-icon']" name="left-icon" />
          <div v-else-if="formItemProps.leftIcon" class="van-field__left-icon" @click="emit('clickLeftIcon', $event)">
            <VanIcon :name="formItemProps.leftIcon" :class-prefix="formItemProps.iconPrefix" />
          </div>
        </template>

        <template v-if="hasLabelSlot">
          <slot v-if="slots.label" name="label" />
          <component :is="props.label" v-else />
          <span v-if="formItemProps.colon">:</span>
        </template>
        <label
          v-else-if="isValid(formItemProps.label)"
        >
          {{ formItemProps.label }}<span v-if="formItemProps.colon">:</span>
        </label>
      </template>

      <template #value>
        <div :class="fieldBodyClass">
          <div v-if="slots.input" class="van-field__control" @click="emit('clickInput', $event)">
            <slot name="input" />
          </div>
          <slot v-else />

          <VanIcon
            v-if="shouldShowClear"
            :name="formItemProps.clearIcon || 'clear'"
            class="van-field__clear"
            @click="onClear"
          />

          <template v-if="slots['right-icon']">
            <div class="van-field__right-icon" @click="emit('clickRightIcon', $event)">
              <slot name="right-icon" />
            </div>
          </template>
          <div
            v-else-if="formItemProps.rightIcon"
            class="van-field__right-icon"
            @click="emit('clickRightIcon', $event)"
          >
            <VanIcon :name="formItemProps.rightIcon" :class-prefix="formItemProps.iconPrefix" />
          </div>

          <div v-if="slots.button" class="van-field__button">
            <slot name="button" />
          </div>
        </div>

        <div
          v-if="formItemProps.showWordLimit && formItemProps.maxlength"
          class="van-field__word-limit"
        >
          <span class="van-field__word-num">{{ modelValueLength }}</span>/{{ formItemProps.maxlength }}
        </div>

        <div
          v-if="hasErrorMessage"
          class="van-field__error-message"
          :class="formItemProps.errorMessageAlign ? `van-field__error-message--${formItemProps.errorMessageAlign}` : ''"
        >
          <slot
            v-if="hasErrorMessageSlot"
            name="error-message"
            :message="resolvedErrorMessageText"
          >
            <component :is="props.feedbackText" />
          </slot>
          <template v-else>
            {{ resolvedErrorMessageText }}
          </template>
        </div>
      </template>

      <template v-if="slots.extra" #extra>
        <slot name="extra" />
      </template>
    </VanCell>

    <div v-if="hasExtraProp" :class="extraWrapperClass">
      <div :class="extraClass">
        <component :is="props.extra" v-if="isVNode(props.extra)" />
        <template v-else>
          {{ props.extra }}
        </template>
      </div>
    </div>
  </div>
</template>
