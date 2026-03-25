<script setup lang="ts">
import type { SubmitProps } from './types'
import { formilyComputed } from '@silver-formily/reactive-vue'
import { useParentForm } from '@silver-formily/vue'
import { omit } from 'lodash-es'
import { ActionBarButton as VanActionBarButton, Button as VanButton } from 'vant'
import { computed, useSlots } from 'vue'
import { useVantFormButtonGroupContext } from '../form-button-group/context'

defineOptions({
  name: 'FSubmit',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SubmitProps>(), {
  text: '提交',
  type: 'primary',
  round: true,
  block: true,
  submit: false,
})

const formRef = useParentForm()
const buttonGroupContext = useVantFormButtonGroupContext()
const slots = useSlots()
const nativeType = computed(() => (props.submit || props.onSubmit ? 'button' : 'submit'))
const isLoading = formilyComputed(() => Boolean(formRef.value?.submitting || props.loading))
const isDisabled = computed(() => Boolean(isLoading.value || props.disabled))
const isCompactGroup = computed(() => buttonGroupContext?.value.layout === 'compact')

const buttonBindings = computed(() => {
  return omit(props, [
    'block',
    'disabled',
    'loading',
    'nativeType',
    'onClick',
    'onSubmit',
    'onSubmitFailed',
    'onSubmitSuccess',
    'round',
    'submit',
    'type',
  ])
})

const compactButtonBindings = computed(() => {
  return {
    color: props.color,
    disabled: isDisabled.value,
    icon: props.icon,
    loading: isLoading.value,
    replace: props.replace,
    text: props.text,
    to: props.to,
    type: props.type,
    url: props.url,
  }
})

function requestNativeSubmit(event: MouseEvent) {
  const target = event.currentTarget instanceof HTMLElement
    ? event.currentTarget
    : event.target instanceof HTMLElement
      ? event.target
      : null
  const form = target?.closest('form')

  if (!form) {
    return
  }

  if (typeof form.requestSubmit === 'function') {
    form.requestSubmit()
    return
  }

  form.dispatchEvent(new Event('submit', {
    bubbles: true,
    cancelable: true,
  }))
}

function handleClick(event: MouseEvent) {
  if (props.onClick?.(event) === false) {
    event.preventDefault()
    return
  }

  if (!props.onSubmit) {
    if (isCompactGroup.value) {
      event.preventDefault()
      requestNativeSubmit(event)
    }

    return
  }

  event.preventDefault()

  const form = formRef.value
  form?.submit(props.onSubmit)
    .then(props.onSubmitSuccess)
    .catch(props.onSubmitFailed ?? console.error)
}
</script>

<template>
  <VanActionBarButton
    v-if="isCompactGroup"
    v-bind="compactButtonBindings"
    @click="handleClick"
  >
    <template v-if="slots.default" #default>
      <slot />
    </template>
  </VanActionBarButton>
  <VanButton
    v-else
    v-bind="buttonBindings"
    :block="props.block"
    :disabled="isDisabled"
    :loading="isLoading"
    :native-type="nativeType"
    :round="props.round"
    :type="props.type"
    @click="handleClick"
  >
    <template #default>
      <slot v-if="slots.default" />
      <template v-else>
        {{ props.text }}
      </template>
    </template>
  </VanButton>
</template>
