<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { FormItemProps } from './types'
import { isValid } from '@formily/shared'
import { isNil } from 'es-toolkit'
import { Field as VanField } from 'vant'
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
</script>

<template>
  <div :class="rootClass">
    <VanField ref="fieldRef" v-bind="formItemProps">
      <template v-if="slots['left-icon']" #left-icon>
        <slot name="left-icon" />
      </template>

      <template v-if="hasLabelSlot" #label>
        <slot v-if="slots.label" name="label" />
        <component :is="props.label" v-else />
      </template>

      <template #input>
        <slot v-if="slots.input" name="input" />
        <slot v-else />
      </template>

      <template v-if="slots.button" #button>
        <slot name="button" />
      </template>

      <template v-if="slots['right-icon']" #right-icon>
        <slot name="right-icon" />
      </template>

      <template v-if="slots.extra" #extra>
        <slot name="extra" />
      </template>

      <template v-if="hasErrorMessageSlot" #error-message="{ message }">
        <slot v-if="slots['error-message']" name="error-message" :message="message" />
        <component :is="props.feedbackText" v-else />
      </template>
    </VanField>

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
