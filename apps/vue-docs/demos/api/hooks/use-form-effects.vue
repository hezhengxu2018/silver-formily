<script setup lang="tsx">
import { createForm, isField, onFieldReact } from '@formily/core'
import { Field, FormConsumer, FormProvider, useFormEffects } from '@silver-formily/vue'
import { ElFormItem, ElInput } from 'element-plus'
import { defineComponent } from 'vue'

const Custom = defineComponent({
  name: 'Custom',
  setup() {
    useFormEffects(() => {
      onFieldReact('custom.bb', (field) => {
        if (!isField(field))
          return
        field.value = field.query('.aa').get('value')
      })
    })

    return () => (
      <>
        <Field
          name="aa"
          decorator={[ElFormItem]}
          component={[ElInput, { placeholder: 'aa' }]}
        />
        <Field
          name="bb"
          decorator={[ElFormItem]}
          component={[ElInput, { placeholder: 'bb' }]}
        />
      </>
    )
  },
})

const form = createForm({
  effects() {
    onFieldReact('custom.aa', (field) => {
      if (!isField(field))
        return
      field.value = field.query('input').get('value')
    })
  },
})
</script>

<template>
  <FormProvider :form="form">
    <Field
      name="input"
      :decorator="[ElFormItem]"
      :component="[ElInput, { placeholder: 'input' }]"
    />
    <Field name="custom" :component="[Custom]" />
    <FormConsumer>
      <template #default="{ form: _form }">
        {{ _form.values }}
      </template>
    </FormConsumer>
  </FormProvider>
</template>
