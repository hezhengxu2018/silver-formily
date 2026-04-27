<script setup lang="ts">
import type { ComponentPublicInstance, CSSProperties } from 'vue'
import type { VantFormItemInputController } from './context'
import type { FormItemProps } from './types'
import { isValid } from '@formily/shared'
import { isNil } from 'es-toolkit'
import { Cell as VanCell, Icon as VanIcon } from 'vant'
import { computed, isVNode, provide, ref, useId } from 'vue'
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
const baseId = useId()
const inputController = ref<VantFormItemInputController | null>(null)

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
const fieldProps = computed(() => resolvedFieldProps.value.fieldProps)

const effectiveLabel = computed<string | number | undefined>(() => {
  const label = hasLabelSlot.value ? undefined : props.label
  if (typeof label === 'string' || typeof label === 'number') {
    return label
  }

  return undefined
})
const labelId = computed(() => isValid(effectiveLabel.value) ? `${baseId}-label` : undefined)
const fallbackInputId = computed(() => {
  const explicitId = fieldProps.value.id
  if (typeof explicitId === 'string' && explicitId) {
    return explicitId
  }

  return `${baseId}-input`
})
const inputId = computed(() => inputController.value?.id || fallbackInputId.value)
const labelFor = computed(() => slots.input ? undefined : inputId.value)
const isRequired = computed(() => {
  return hasExplicitVNodeProp('asterisk')
    ? props.asterisk
    : fieldProps.value.required
})
const hasFieldError = computed(() => resolvedFieldProps.value.error)

const hasFieldBorder = computed(() => fieldProps.value.border !== false)
const isLink = computed(() => Boolean(fieldProps.value.isLink))
const shouldShowClear = computed(() => {
  if (!fieldProps.value.clearable || fieldProps.value.readonly) {
    return false
  }

  const hasValue = resolveModelText(fieldProps.value.modelValue) !== ''
  if (!hasValue) {
    return false
  }

  const clearTrigger = fieldProps.value.clearTrigger ?? 'focus'
  return clearTrigger === 'always' || (clearTrigger === 'focus' && focused.value)
})
const labelStyle = computed(() => {
  const labelWidth = fieldProps.value.labelWidth
  const labelAlign = fieldProps.value.labelAlign
  const style: Record<string, string> = {}

  if (labelWidth && labelAlign !== 'top') {
    style.width = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth
  }

  if (labelAlign && labelAlign !== 'top') {
    style.textAlign = labelAlign
  }

  return style
})
const titleStyle = computed(() => {
  const customStyle = fieldProps.value.titleStyle
  if (typeof customStyle === 'string') {
    return customStyle
  }

  return {
    ...labelStyle.value,
    ...(customStyle as CSSProperties | undefined),
  }
})
const topLabelStyle = computed(() => {
  const labelWidth = fieldProps.value.labelWidth
  if (!labelWidth || fieldProps.value.labelAlign !== 'top') {
    return undefined
  }

  return {
    width: typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth,
  }
})
const fieldClass = computed(() => {
  const labelAlign = fieldProps.value.labelAlign
  return [
    'van-field',
    hasFieldError.value && 'van-field--error',
    fieldProps.value.disabled && 'van-field--disabled',
    labelAlign && `van-field--label-${labelAlign}`,
  ]
})
const labelClass = computed(() => {
  const labelAlign = fieldProps.value.labelAlign
  return [
    'van-field__label',
    labelAlign && `van-field__label--${labelAlign}`,
    isRequired.value && 'van-field__label--required',
    fieldProps.value.labelClass,
    fieldProps.value.titleClass,
  ]
})
const valueClass = computed(() => [
  'van-field__value',
  fieldProps.value.valueClass,
])
const resolvedErrorMessage = computed(() => {
  return resolvedFeedbackMessage.value ?? fieldProps.value.errorMessage
})
const resolvedErrorMessageText = computed(() => {
  return resolveModelText(resolvedErrorMessage.value)
})
const hasErrorMessage = computed(() => {
  return showErrorMessage.value && resolvedErrorMessageText.value !== ''
})
const fieldBodyClass = computed(() => [
  'van-field__body',
])
const inputSlotClass = computed(() => [
  'van-field__control',
  hasFieldError.value && 'van-field__control--error',
  fieldProps.value.inputAlign && `van-field__control--${fieldProps.value.inputAlign}`,
  slots.input && 'van-field__control--custom',
])
const modelValueLength = computed(() => {
  return resolveModelText(fieldProps.value.modelValue).length
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
  disabled: fieldProps.value.disabled,
  error: hasFieldError.value,
  inputAlign: fieldProps.value.inputAlign,
  inputId: fallbackInputId.value,
  labelId: labelId.value,
  readonly: fieldProps.value.readonly,
  registerInputController,
})))

function resolveFieldRootElement() {
  const fieldInstance = fieldRef.value
  if (!fieldInstance) {
    return null
  }

  if ('$el' in fieldInstance) {
    return fieldInstance.$el as HTMLElement | null
  }

  return null
}

function focusInput() {
  if (fieldProps.value.disabled) {
    return
  }

  inputController.value?.focus()
  if (inputController.value) {
    return
  }

  const control = resolveFieldRootElement()
    ?.querySelector<HTMLElement>('.van-field__control')

  if (!control) {
    return
  }

  if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement) {
    control.focus()
    if (control.readOnly) {
      control.click()
    }
    return
  }

  control.click()
}

function clickFieldControl() {
  if (fieldProps.value.disabled) {
    return
  }

  resolveFieldRootElement()
    ?.querySelector<HTMLElement>('.van-field__control')
    ?.click()
}

function isInteractiveClickTarget(target: EventTarget | null, root: HTMLElement | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  const interactiveElement = target.closest([
    'label',
    '.van-field__control',
    '.van-field__clear',
    '.van-field__left-icon',
    '.van-field__right-icon',
    '.van-field__button',
    '.van-popup',
    '.van-overlay',
    'a',
    'button',
    'input',
    'textarea',
    'select',
    '[role="button"]',
  ].join(', '))

  return Boolean(interactiveElement && interactiveElement !== root)
}

function onLabelClick(event: MouseEvent) {
  event.preventDefault()
  focusInput()
}

function onCellClick(event: MouseEvent) {
  if (!isLink.value) {
    return
  }

  const cellElement = resolveFieldRootElement()
  if (!(event.target instanceof Node) || !cellElement?.contains(event.target)) {
    return
  }

  if (isInteractiveClickTarget(event.target, cellElement)) {
    return
  }

  clickFieldControl()
}

function registerInputController(controller: VantFormItemInputController | null) {
  inputController.value = controller
}

function onClear(event: MouseEvent) {
  event.preventDefault()
  emit('update:modelValue', '')
  emit('clear', event)
}
</script>

<template>
  <component :is="fieldProps.tag || 'div'" :class="rootClass">
    <VanCell
      ref="fieldRef"
      :class="fieldClass"
      tag="div"
      :border="fieldProps.border"
      :center="fieldProps.center"
      :is-link="isLink"
      :clickable="fieldProps.clickable"
      :size="fieldProps.size"
      :arrow-direction="fieldProps.arrowDirection"
      :title-style="titleStyle"
      :value-class="valueClass"
      :title-class="labelClass"
      @click="onCellClick"
      @focusin="focused = true"
      @focusout="focused = false"
    >
      <template #icon>
        <template v-if="fieldProps.labelAlign !== 'top'">
          <slot v-if="slots['left-icon']" name="left-icon" />
          <div v-else-if="fieldProps.leftIcon" class="van-field__left-icon" @click="emit('clickLeftIcon', $event)">
            <VanIcon :name="fieldProps.leftIcon" :class-prefix="fieldProps.iconPrefix" />
          </div>
        </template>
      </template>

      <template #title>
        <template v-if="fieldProps.labelAlign === 'top'">
          <slot v-if="slots['left-icon']" name="left-icon" />
          <div v-else-if="fieldProps.leftIcon" class="van-field__left-icon" @click="emit('clickLeftIcon', $event)">
            <VanIcon :name="fieldProps.leftIcon" :class-prefix="fieldProps.iconPrefix" />
          </div>
        </template>

        <template v-if="hasLabelSlot">
          <slot v-if="slots.label" name="label" />
          <component :is="props.label" v-else />
          <span v-if="fieldProps.colon">:</span>
        </template>
        <label
          v-else-if="isValid(effectiveLabel)"
          :id="labelId"
          :for="labelFor"
          :style="fieldProps.labelAlign === 'top' ? topLabelStyle : undefined"
          data-allow-mismatch="attribute"
          @click="onLabelClick"
        >
          {{ effectiveLabel }}<span v-if="fieldProps.colon">:</span>
        </label>
      </template>

      <template #value>
        <div :class="fieldBodyClass">
          <div v-if="slots.input" :class="inputSlotClass" @click="emit('clickInput', $event)">
            <slot name="input" />
          </div>
          <slot v-else />

          <VanIcon
            v-if="shouldShowClear"
            :name="fieldProps.clearIcon || 'clear'"
            class="van-field__clear"
            @click="onClear"
          />

          <template v-if="slots['right-icon']">
            <div class="van-field__right-icon" @click="emit('clickRightIcon', $event)">
              <slot name="right-icon" />
            </div>
          </template>
          <div
            v-else-if="fieldProps.rightIcon"
            class="van-field__right-icon"
            @click="emit('clickRightIcon', $event)"
          >
            <VanIcon :name="fieldProps.rightIcon" :class-prefix="fieldProps.iconPrefix" />
          </div>

          <div v-if="slots.button" class="van-field__button">
            <slot name="button" />
          </div>
        </div>

        <div
          v-if="fieldProps.showWordLimit && fieldProps.maxlength"
          class="van-field__word-limit"
        >
          <span class="van-field__word-num">{{ modelValueLength }}</span>/{{ fieldProps.maxlength }}
        </div>

        <div
          v-if="hasErrorMessage"
          class="van-field__error-message"
          :class="fieldProps.errorMessageAlign ? `van-field__error-message--${fieldProps.errorMessageAlign}` : ''"
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
  </component>
</template>
