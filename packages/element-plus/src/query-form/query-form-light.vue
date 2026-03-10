<script setup lang="ts">
import type { Form } from '@formily/core'
import type { IQueryFormLightProps } from './types'
import { toJS } from '@formily/reactive'
import { reactionWatch } from '@silver-formily/reactive-vue'
import { useFieldSchema, useForm } from '@silver-formily/vue'
import { throttle } from 'lodash-es'
import { computed, onUnmounted, useSlots } from 'vue'
import { stylePrefix, useCleanAttrs } from '../__builtins__'
import { Form as FForm } from '../form'
import { useQueryFormForm, useQueryFormSchemaField } from './hooks'

defineOptions({
  name: 'FQueryFormLight',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<IQueryFormLightProps>(), {
  components: () => ({}),
  throttleWait: 300,
})
const emit = defineEmits<{
  (e: 'autoSubmit', values: Form['values']): void
  (e: 'autoSubmitFailed', error: any): void
}>()

const { props: formProps } = useCleanAttrs(['modelValue', 'onUpdate:modelValue'])
const slots = useSlots()
const formRef = useForm()
const fieldSchemaRef = useFieldSchema()
const prefixCls = `${stylePrefix}-query-form-light`

const { externalForm, activeForm } = useQueryFormForm({
  formProps,
  fallbackForm: formRef,
})
const resolvedSchema = computed(() => props.schema ?? fieldSchemaRef.value)

const innerFormProps = computed(() => ({
  fullness: false,
  ...formProps.value,
  form: externalForm.value,
}))

function submitByChange() {
  const form = activeForm.value
  form
    .submit((values) => {
      emit('autoSubmit', values)
      return formProps.value.onAutoSubmit?.(values)
    })
    .catch((error) => {
      emit('autoSubmitFailed', error)
      formProps.value.onAutoSubmitFailed?.(error)
    })
}

const triggerSubmit = throttle(() => {
  submitByChange()
}, props.throttleWait, {
  leading: false,
  trailing: true,
})

reactionWatch(() => {
  const form = activeForm.value
  if (!form)
    return
  return toJS(form.values)
}, () => {
  triggerSubmit()
})

onUnmounted(() => {
  triggerSubmit.cancel()
})

const { hasDefaultSlot, schemaField } = useQueryFormSchemaField({
  slots,
  schema: resolvedSchema,
  schemaField: computed(() => props.schemaField),
  components: computed(() => props.components),
})
</script>

<template>
  <FForm v-bind="innerFormProps" :class="prefixCls">
    <div :class="`${prefixCls}__content`">
      <slot v-if="hasDefaultSlot" />
      <component
        :is="schemaField"
        v-else-if="schemaField"
        :schema="resolvedSchema"
      />
    </div>
  </FForm>
</template>
