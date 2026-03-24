<script setup lang="ts">
import type { IFormFeedback } from '@formily/core'
import type { ButtonNativeType } from 'vant'
import type { PropType } from 'vue'
import { formilyComputed } from '@silver-formily/reactive-vue'
import { useParentForm } from '@silver-formily/vue'
import { buttonProps, Button as VanButton } from 'vant'
import { computed, getCurrentInstance } from 'vue'

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
const rawProps = getCurrentInstance()?.vnode.props ?? {}

function hasExplicitProp(key: string) {
  return Object.prototype.hasOwnProperty.call(rawProps, key)
}

const resolvedNativeType = computed<ButtonNativeType>(() => (props.submit || props.onSubmit ? 'button' : 'submit'))
const isLoading = formilyComputed(() => Boolean(formRef.value?.submitting || props.loading))
const isDisabled = computed(() => Boolean(isLoading.value || props.disabled))
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

function handleClick(event: MouseEvent) {
  if (props.onClick?.(event) === false) {
    event.preventDefault()
    return
  }

  if (!props.onSubmit) {
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
  <VanButton
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
      <slot>提交</slot>
    </template>
  </VanButton>
</template>
