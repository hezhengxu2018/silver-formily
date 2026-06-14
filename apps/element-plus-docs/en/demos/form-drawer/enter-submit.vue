<script setup lang="tsx">
import { FormDrawer, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { Field } from '@silver-formily/vue'
import { ElButton, ElSpace } from 'element-plus'

function renderForm() {
  return (
    <FormLayout labelCol={6} wrapperCol={12} layout="vertical">
      <Field
        name="email"
        required
        title="Email"
        decorator={[FormItem]}
        component={[Input, { placeholder: 'Press Enter after typing' }]}
      />
    </FormLayout>
  )
}

function openDrawer({ title, enterSubmit }: { title: string, enterSubmit?: boolean }) {
  FormDrawer({ title, enterSubmit }, renderForm)
    .forConfirm((form, next) => {
      console.log('submit', form.values)
      next()
    })
    .open()
    .catch(console.warn)
}

function handleDefault() {
  openDrawer({ title: 'Submit on Enter enabled by default' })
}

function handleDisabled() {
  openDrawer({ title: 'Disable Enter to submit', enterSubmit: false })
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



