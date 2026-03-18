<script setup lang="ts">
import type { VNode } from 'vue'
import { Field as VanField } from 'vant'
import { computed, isVNode } from 'vue'
import { useCleanAttrs } from '../__builtins__'

defineOptions({
  name: 'FFormItem',
  inheritAttrs: false,
})

const props = defineProps<{
  label?: FormItemContent
  extra?: FormItemContent
  feedbackText?: FormItemContent
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending'
  asterisk?: boolean
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

type FormItemContent = string | number | VNode

const { props: attrs } = useCleanAttrs()

const hasLabelSlot = computed(() => Boolean(slots.label) || isVNode(props.label))
const hasExtraSlot = computed(() => Boolean(slots.extra) || props.extra != null)
const hasErrorMessageSlot = computed(() => Boolean(slots['error-message']) || isVNode(props.feedbackText))

const resolvedLabel = computed<string | number | undefined>(() => {
  if (isVNode(props.label))
    return undefined

  return props.label
})

const resolvedFeedbackMessage = computed(() => {
  if (props.feedbackText == null)
    return undefined

  if (isVNode(props.feedbackText))
    return ' '

  return String(props.feedbackText)
})

const formItemProps = computed(() => {
  const showError = ['error', 'warning'].includes(props.feedbackStatus ?? '')

  return {
    ...attrs.value,
    label: hasLabelSlot.value ? undefined : resolvedLabel.value,
    required: props.asterisk ?? attrs.value.required,
    error: showError || attrs.value.error,
    errorMessage: resolvedFeedbackMessage.value ?? attrs.value.errorMessage,
  }
})
</script>

<template>
  <VanField v-bind="formItemProps">
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
