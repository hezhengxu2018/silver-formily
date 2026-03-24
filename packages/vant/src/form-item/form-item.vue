<script setup lang="ts">
import type { ComponentPublicInstance, PropType, VNode } from 'vue'
import { Field as VanField } from 'vant'
import { computed, isVNode, onBeforeUnmount, provide, ref, watch } from 'vue'
import { useCleanAttrs } from '../__builtins__'
import {
  hasDefinedValue,
  normalizeFormPath,
  useVantFormContext,
  useVantFormItemRegistry,
  vantFormInheritedPropKeys,
} from '../form/context'
import { vantFormItemControlContextKey } from './context'

defineOptions({
  name: 'FFormItem',
  inheritAttrs: false,
})

const props = defineProps({
  label: {
    type: [String, Number, Object] as PropType<FormItemContent>,
    default: undefined,
  },
  extra: {
    type: [String, Number, Object] as PropType<FormItemContent>,
    default: undefined,
  },
  feedbackText: {
    type: [String, Number, Object] as PropType<FormItemContent>,
    default: undefined,
  },
  feedbackStatus: {
    type: String as PropType<'error' | 'warning' | 'success' | 'pending'>,
    default: undefined,
  },
  fieldAddress: {
    type: String,
    default: undefined,
  },
  fieldPath: {
    type: String,
    default: undefined,
  },
  asterisk: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
})

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

type FormItemContent = string | number | VNode

const { props: attrs } = useCleanAttrs()
const formContext = useVantFormContext()
const formItemRegistry = useVantFormItemRegistry()
const fieldRef = ref<ComponentPublicInstance | null>(null)

function resolveControlFlag(name: 'showError' | 'showErrorMessage', defaultValue: boolean) {
  const localValue = attrs.value[name]
  if (hasDefinedValue(localValue)) {
    return Boolean(localValue)
  }

  const inheritedValue = formContext?.value[name]
  if (hasDefinedValue(inheritedValue)) {
    return Boolean(inheritedValue)
  }

  return defaultValue
}

const hasLabelSlot = computed(() => Boolean(slots.label) || isVNode(props.label))
const hasExtraSlot = computed(() => Boolean(slots.extra) || props.extra != null)
const showError = computed(() => resolveControlFlag('showError', false))
const showErrorMessage = computed(() => resolveControlFlag('showErrorMessage', true))
const hasErrorMessageSlot = computed(() => {
  return showErrorMessage.value
    && (Boolean(slots['error-message']) || isVNode(props.feedbackText))
})

const resolvedFeedbackMessage = computed(() => {
  if (!showErrorMessage.value)
    return undefined

  if (props.feedbackText == null)
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
    if (!hasDefinedValue(mergedProps[key]) && hasDefinedValue(inheritedProps[key])) {
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
    required: props.asterisk ?? resolvedFieldProps.value.fieldProps.required,
    error: resolvedFieldProps.value.error,
    errorMessage: resolvedFeedbackMessage.value ?? resolvedFieldProps.value.fieldProps.errorMessage,
  }
})

const normalizedFieldAddress = computed(() => normalizeFormPath(props.fieldAddress))
const normalizedFieldPath = computed(() => normalizeFormPath(props.fieldPath))

function resolveFieldElement() {
  const target = fieldRef.value
  const element = target?.$el
  return element instanceof HTMLElement ? element : null
}

let registeredEntry: { address?: string, el: HTMLElement, path?: string } | null = null

function syncFormItemRegistry() {
  if (!formItemRegistry) {
    return
  }

  if (registeredEntry) {
    formItemRegistry.unregister(registeredEntry)
    registeredEntry = null
  }

  const el = resolveFieldElement()
  if (!el) {
    return
  }

  const address = normalizedFieldAddress.value
  const path = normalizedFieldPath.value
  if (!address && !path) {
    return
  }

  registeredEntry = {
    address,
    el,
    path,
  }
  formItemRegistry.register(registeredEntry)
}

provide(vantFormItemControlContextKey, computed(() => ({
  disabled: resolvedFieldProps.value.fieldProps.disabled,
  error: resolvedFieldProps.value.error,
  inputAlign: resolvedFieldProps.value.fieldProps.inputAlign,
  readonly: resolvedFieldProps.value.fieldProps.readonly,
})))

watch([fieldRef, normalizedFieldAddress, normalizedFieldPath], syncFormItemRegistry, {
  flush: 'post',
  immediate: true,
})

onBeforeUnmount(() => {
  if (registeredEntry && formItemRegistry) {
    formItemRegistry.unregister(registeredEntry)
  }
})
</script>

<template>
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

    <template v-if="hasExtraSlot" #extra>
      <slot v-if="slots.extra" name="extra" />
      <component :is="props.extra" v-else-if="isVNode(props.extra)" />
      <template v-else>
        {{ props.extra }}
      </template>
    </template>

    <template v-if="hasErrorMessageSlot" #error-message="{ message }">
      <slot v-if="slots['error-message']" name="error-message" :message="message" />
      <component :is="props.feedbackText" v-else />
    </template>
  </VanField>
</template>
