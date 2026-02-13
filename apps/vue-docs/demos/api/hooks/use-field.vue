<script setup lang="tsx">
import type { Field as FieldType } from '@formily/core'
import { createForm, setValidateLanguage } from '@formily/core'
import { observer } from '@silver-formily/reactive-vue'
import { Field, FormConsumer, FormProvider, useField } from '@silver-formily/vue'
import { ElButton, ElFormItem, ElInput } from 'element-plus'
import { defineComponent } from 'vue'

setValidateLanguage('en')

const FormItem = observer(
  defineComponent({
    setup(_props, { slots }) {
      const fieldRef = useField<FieldType>()
      return () => (
        <ElFormItem
          label={fieldRef.value?.title}
          required={fieldRef.value?.required}
          help={fieldRef.value?.selfErrors?.length ? fieldRef.value?.selfErrors : undefined}
          extra={fieldRef.value?.description}
          validateStatus={fieldRef.value?.validateStatus}
        >
          {slots?.default?.()}
        </ElFormItem>
      )
    },
  }),
)

const form = createForm({ validateFirst: true })

function log(values: string) {
  console.warn('Form Submitted:', values)
}
</script>

<template>
  <FormProvider :form="form">
    <Form layout="vertical">
      <Field
        name="name"
        title="Name"
        required
        :decorator="[FormItem]"
        :component="[ElInput, { placeholder: 'Please ElInput' }]"
      />
      <FormConsumer>
        <template #default="{ form: _form }">
          <div style="white-space: pre; margin-bottom: 16px">
            {{ JSON.stringify(_form.values, null, 2) }}
          </div>
          <ElButton
            type="primary"
            @click="
              () => {
                form.submit(log)
              }
            "
          >
            Submit
          </ElButton>
        </template>
      </FormConsumer>
    </Form>
  </FormProvider>
</template>
