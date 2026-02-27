<script lang="ts" setup>
import type { PropType } from 'vue'
import { useParentForm } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

defineOptions({
  name: 'FReset',
  inheritAttrs: false,
})

const props = defineProps({
  onClick: Function as PropType<(e: MouseEvent) => void | boolean>,
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

function handleClick(e: MouseEvent) {
  if (props.onClick && (props.onClick)?.(e) === false)
    return

  const form = formRef?.value
  form?.reset('*', {
    forceClear: props.forceClear,
  })
  props.validate && form?.validate()
    .then(props.onResetValidateSuccess)
    .catch(error => props.onResetValidateFailed?.(error))
}
</script>

<template>
  <ElButton v-bind="$attrs" @click="handleClick">
    <slot />
  </ElButton>
</template>
