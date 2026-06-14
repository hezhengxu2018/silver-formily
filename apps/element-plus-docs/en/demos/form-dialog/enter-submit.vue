<script setup lang="tsx">
import { FormDialog, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { Field } from '@silver-formily/vue'
import { ElButton, ElSpace } from 'element-plus'

function renderForm() {
  return (
    <FormLayout labelCol={6} wrapperCol={12} layout="vertical">
      <Field
        name="user"
        required
        title="Username"
        decorator={[FormItem]}
        component={[Input, { placeholder: 'Press Enter to try' }]}
      />
    </FormLayout>
  )
}

function openDialog({ title, enterSubmit }: { title: string, enterSubmit?: boolean }) {
  FormDialog({ title, enterSubmit }, renderForm)
    .forConfirm((form, next) => {
      console.log('submit', form.values)
      next()
    })
    .open()
    .catch(console.warn)
}

function handleDefault() {
  openDialog({ title: 'Submit on Enter enabled by default' })
}

function handleDisabled() {
  openDialog({ title: 'Disable Enter to submit', enterSubmit: false })
}
</script>

<template>
  <ElSpace>
    <ElButton @click="handleDefault">
      Default Enter Submit
    </ElButton>
    <ElButton @click="handleDisabled">
      Disable Enter to submit
    </ElButton>
  </ElSpace>
</template>



