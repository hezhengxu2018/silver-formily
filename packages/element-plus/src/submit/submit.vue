<script lang="ts" setup>
import type { IFormFeedback } from '@formily/core'
import type { PropType } from 'vue'
import { useParentForm } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

defineOptions({
  name: 'FSubmit',
  inheritAttrs: false,
})

const props = defineProps({
  onClick: Function as PropType<(e: MouseEvent) => any>,
  onSubmit: Function as PropType<(values: any) => Promise<any>>,
  onSubmitSuccess: Function as PropType<(payload: any) => void>,
  onSubmitFailed: Function as PropType<(feedbacks: IFormFeedback[]) => void>,
  submit: Boolean,
  loading: Boolean,
})

const formRef = useParentForm()

function handleClick(e: MouseEvent) {
  if (props.onClick?.(e) === false)
    return
  if (props.onSubmit) {
    const form = formRef?.value
    form?.submit(props.onSubmit)
      .then(props.onSubmitSuccess)
      .catch(props.onSubmitFailed ?? console.error)
  }
}
</script>

<template>
  <ElButton
    :native-type="props.submit ? 'button' : 'submit'"
    type="primary"
    v-bind="$attrs"
    :loading="formRef?.submitting ?? props.loading"
    @click="handleClick"
  >
    <template #default>
      <slot />
    </template>
  </ElButton>
</template>
