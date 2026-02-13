<script setup lang="tsx">
import { createForm } from '@formily/core'
import { observer } from '@silver-formily/reactive-vue'
import { Field, FormProvider, useForm } from '@silver-formily/vue'
import { ElInput, ElSpace } from 'element-plus'
import { defineComponent } from 'vue'

const FormPreviewer = observer(
  defineComponent({
    name: 'FormPreviewer',
    setup() {
      const formRef = useForm()
      return () => <div>{JSON.stringify(formRef.value?.values)}</div>
    },
  }),
)

const form = createForm({ validateFirst: true })
</script>

<template>
  <FormProvider :form="form">
    <ElSpace>
      <Field
        name="name"
        title="Name"
        required
        :component="[ElInput, { placeholder: 'Please ElInput' }]"
      />
      <FormPreviewer />
    </ElSpace>
  </FormProvider>
</template>
