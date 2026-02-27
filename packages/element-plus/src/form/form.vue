<script lang="ts" setup>
import type { Form as FormType, IFormFeedback } from '@formily/core'
import type { PropType } from 'vue'
import { FormProvider, useForm } from '@silver-formily/vue'
import { FormLayout } from '../form-layout'
import { PreviewText } from '../preview-text'

defineOptions({
  name: 'FForm',
  inheritAttrs: false,
})

const props = defineProps({
  form: {
    type: Object as PropType<FormType>,
  },
  previewTextPlaceholder: {
    type: String,
  },
  onAutoSubmit: {
    type: Function as PropType<(values: FormType['values']) => Promise<any>>,
  },
  onAutoSubmitFailed: {
    type: Function as PropType<(error: IFormFeedback[]) => void>,
  },
})

const top = useForm()

function handleSubmit(e: Event, form: FormType) {
  form
    .submit(values => props.onAutoSubmit?.(values))
    .catch(error => props.onAutoSubmitFailed?.(error))
}
</script>

<template>
  <FormProvider v-if="props.form" :form="props.form">
    <PreviewText :placeholder="props.previewTextPlaceholder">
      <FormLayout v-bind="$attrs" @submit="(e) => handleSubmit(e, form)">
        <slot />
      </FormLayout>
    </PreviewText>
  </FormProvider>
  <template v-else-if="top">
    <PreviewText :placeholder="props.previewTextPlaceholder">
      <FormLayout
        v-bind="$attrs"
        @submit.prevent.stop="(e) => handleSubmit(e, top)"
      >
        <slot />
      </FormLayout>
    </PreviewText>
  </template>
</template>
