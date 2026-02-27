<script setup lang="tsx">
import { FormDialog, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { Field } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

function renderParentForm() {
  return (
    <FormLayout labelCol={6} wrapperCol={12} layout="vertical">
      <Field
        name="company"
        title="公司名称"
        decorator={[FormItem]}
        component={[Input, { placeholder: '输入公司' }]}
      />
    </FormLayout>
  )
}

function renderChildForm() {
  return (
    <FormLayout labelCol={6} wrapperCol={12} layout="vertical">
      <Field
        name="contact"
        title="联系人"
        decorator={[FormItem]}
        component={[Input, { placeholder: '输入联系人' }]}
      />
    </FormLayout>
  )
}

function openChildDialog() {
  FormDialog('二级弹窗', renderChildForm)
    .forConfirm((form, next) => {
      console.log('child submit', form.values)
      next()
    })
    .open()
    .catch(console.warn)
}

function handleOpen() {
  FormDialog('一级弹窗', () => (
    <div>
      {renderParentForm()}
      <ElButton class="mt-2" type="primary" onClick={openChildDialog}>
        打开二级弹窗
      </ElButton>
    </div>
  ))
    .forConfirm((form, next) => {
      console.log('parent submit', form.values)
      next()
    })
    .open()
    .catch(console.warn)
}
</script>

<template>
  <ElButton @click="handleOpen">
    打开包含子弹窗的表单
  </ElButton>
</template>
