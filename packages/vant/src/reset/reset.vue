<script setup lang="ts">
import type { ResetProps } from './types'
import { formilyComputed } from '@silver-formily/reactive-vue'
import { useParentForm } from '@silver-formily/vue'
import { omit } from 'es-toolkit'
import { ActionBarButton as VanActionBarButton, Button as VanButton } from 'vant'
import { computed, useSlots } from 'vue'
import { useCleanAttrs } from '../__builtins__'
import { useVantFormButtonGroupContext } from '../form-button-group/context'

defineOptions({
  name: 'FReset',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ResetProps>(), {
  text: '重置',
  type: 'default',
  round: true,
  block: true,
  forceClear: false,
  validate: false,
})

const formRef = useParentForm()
const buttonGroupContext = useVantFormButtonGroupContext()
const slots = useSlots()
const { props: resetAttrs } = useCleanAttrs([
  'native-type',
  'nativeType',
])
const isCompactGroup = computed(() => buttonGroupContext?.value.layout === 'compact')
const isDisabled = formilyComputed(() => Boolean(formRef.value?.submitting || props.disabled))
const isLoading = computed(() => Boolean(props.loading))

const buttonBindings = computed(() => {
  return {
    ...resetAttrs.value,
    ...omit(props, [
      'block',
      'disabled',
      'loading',
      'onClick',
      'onResetValidateFailed',
      'onResetValidateSuccess',
      'forceClear',
      'round',
      'type',
      'validate',
    ]),
  }
})

const compactButtonBindings = computed(() => {
  return {
    ...resetAttrs.value,
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
    :block="props.block"
    :disabled="isDisabled"
    :loading="isLoading"
    native-type="button"
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
