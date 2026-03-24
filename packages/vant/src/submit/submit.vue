<script setup lang="ts">
import type { IFormFeedback } from '@formily/core'
import type { ButtonNativeType } from 'vant'
import type { PropType } from 'vue'
import { formilyComputed } from '@silver-formily/reactive-vue'
import { useParentForm } from '@silver-formily/vue'
import { buttonProps, ActionBarButton as VanActionBarButton, Button as VanButton } from 'vant'
import { computed, getCurrentInstance, useSlots } from 'vue'
import { useVantFormButtonGroupContext } from '../form-button-group/context'

defineOptions({
  name: 'FSubmit',
  inheritAttrs: false,
})

const props = defineProps({
  ...buttonProps,
  onClick: Function as PropType<(event: MouseEvent) => void | boolean>,
  onSubmit: Function as PropType<(values: any) => Promise<any> | any>,
  onSubmitSuccess: Function as PropType<(payload: any) => void>,
  onSubmitFailed: Function as PropType<(feedbacks: IFormFeedback[]) => void>,
  submit: Boolean,
})

const formRef = useParentForm()
const buttonGroupContext = useVantFormButtonGroupContext()
const rawProps = getCurrentInstance()?.vnode.props ?? {}
const slots = useSlots()

function hasExplicitProp(key: string) {
  return Object.prototype.hasOwnProperty.call(rawProps, key)
}

const resolvedNativeType = computed<ButtonNativeType>(() => (props.submit || props.onSubmit ? 'button' : 'submit'))
const isCompactGroup = computed(() => buttonGroupContext?.value.layout === 'compact')
const isLoading = formilyComputed(() => Boolean(formRef.value?.submitting || props.loading))
const isDisabled = computed(() => Boolean(isLoading.value || props.disabled))
const resolvedText = computed(() => props.text ?? '提交')
const resolvedType = computed(() => (hasExplicitProp('type') ? props.type : 'primary'))
const resolvedRound = computed(() => (hasExplicitProp('round') ? props.round : true))
const resolvedBlock = computed(() => (hasExplicitProp('block') ? props.block : true))

const buttonBindings = computed(() => {
  const {
    block: _block,
    disabled: _disabled,
    loading: _loading,
    nativeType: _nativeType,
    onClick: _onClick,
    onSubmit: _onSubmit,
    onSubmitFailed: _onSubmitFailed,
    onSubmitSuccess: _onSubmitSuccess,
    round: _round,
    submit: _submit,
    type: _type,
    ...buttonOptions
  } = props

  return {
    ...buttonOptions,
  }
})

const compactButtonBindings = computed(() => {
  return {
    color: props.color,
    disabled: isDisabled.value,
    icon: props.icon,
    loading: isLoading.value,
    replace: props.replace,
    text: resolvedText.value,
    to: props.to,
    type: resolvedType.value,
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
    :block="resolvedBlock"
    :disabled="isDisabled"
    :loading="isLoading"
    :native-type="resolvedNativeType"
    :round="resolvedRound"
    :type="resolvedType"
    @click="handleClick"
  >
    <template #default>
      <slot v-if="slots.default" />
      <template v-else>
        {{ resolvedText }}
      </template>
    </template>
  </VanButton>
</template>
