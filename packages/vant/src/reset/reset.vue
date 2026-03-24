<script setup lang="ts">
import type { PropType } from 'vue'
import { formilyComputed } from '@silver-formily/reactive-vue'
import { useParentForm } from '@silver-formily/vue'
import { buttonProps, ActionBarButton as VanActionBarButton, Button as VanButton } from 'vant'
import { computed, getCurrentInstance, useSlots } from 'vue'
import { useVantFormButtonGroupContext } from '../form-button-group/context'

defineOptions({
  name: 'FReset',
  inheritAttrs: false,
})

const props = defineProps({
  ...buttonProps,
  onClick: Function as PropType<(event: MouseEvent) => void | boolean>,
  forceClear: {
    type: Boolean,
    default: false,
  },
  validate: {
    type: Boolean,
    default: false,
  },
  onResetValidateSuccess: Function as PropType<(payload: any) => void>,
  onResetValidateFailed: Function as PropType<(error: any) => void>,
})

const formRef = useParentForm()
const buttonGroupContext = useVantFormButtonGroupContext()
const rawProps = getCurrentInstance()?.vnode.props ?? {}
const slots = useSlots()

function hasExplicitProp(key: string) {
  return Object.prototype.hasOwnProperty.call(rawProps, key)
}

const isCompactGroup = computed(() => buttonGroupContext?.value.layout === 'compact')
const isDisabled = formilyComputed(() => Boolean(formRef.value?.submitting || props.disabled))
const resolvedText = computed(() => props.text ?? '重置')
const resolvedType = computed(() => (hasExplicitProp('type') ? props.type : 'default'))
const resolvedRound = computed(() => (hasExplicitProp('round') ? props.round : true))
const resolvedBlock = computed(() => (hasExplicitProp('block') ? props.block : true))

const buttonBindings = computed(() => {
  const {
    block: _block,
    disabled: _disabled,
    nativeType: _nativeType,
    onClick: _onClick,
    onResetValidateFailed: _onResetValidateFailed,
    onResetValidateSuccess: _onResetValidateSuccess,
    forceClear: _forceClear,
    round: _round,
    type: _type,
    validate: _validate,
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
    loading: props.loading,
    replace: props.replace,
    text: resolvedText.value,
    to: props.to,
    type: resolvedType.value,
    url: props.url,
  }
})

function handleClick(event: MouseEvent) {
  if (props.onClick?.(event) === false) {
    event.preventDefault()
    return
  }

  const form = formRef.value
  form?.reset('*', {
    forceClear: props.forceClear,
  })

  if (!props.validate) {
    return
  }

  form?.validate()
    .then(props.onResetValidateSuccess)
    .catch(error => props.onResetValidateFailed?.(error))
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
    native-type="button"
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
