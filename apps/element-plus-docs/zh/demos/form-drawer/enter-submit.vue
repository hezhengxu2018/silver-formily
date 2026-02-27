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
        title="邮箱"
        decorator={[FormItem]}
        component={[Input, { placeholder: '输入后按回车' }]}
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
  openDrawer({ title: '默认允许回车提交' })
}

function handleDisabled() {
  openDrawer({ title: '禁用回车提交', enterSubmit: false })
}
</script>

<template>
  <ElSpace>
    <ElButton @click="handleDefault">
      默认回车提交
    </ElButton>
    <ElButton @click="handleDisabled">
      禁用回车提交
    </ElButton>
  </ElSpace>
</template>
