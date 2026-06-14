<script setup lang="tsx">
import { FormDialog, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { Field } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

function renderParentForm() {
  return (
    <FormLayout labelCol={6} wrapperCol={12} layout="vertical">
      <Field
        name="company"
        title="Company Name"
        decorator={[FormItem]}
        component={[Input, { placeholder: 'Enter company name' }]}
      />
    </FormLayout>
  )
}

function renderChildForm() {
  return (
    <FormLayout labelCol={6} wrapperCol={12} layout="vertical">
      <Field
        name="contact"
        title="Contact"
        decorator={[FormItem]}
        component={[Input, { placeholder: 'Enter contact name' }]}
      />
    </FormLayout>
  )
}

function openChildDialog() {
  FormDialog('Second-level Dialog', renderChildForm)
    .forConfirm((form, next) => {
      console.log('child submit', form.values)
      next()
    })
    .open()
    .catch(console.warn)
}

function handleOpen() {
  FormDialog('First-level Dialog', () => (
    <div>
      {renderParentForm()}
      <ElButton class="mt-2" type="primary" onClick={openChildDialog}>
        Open the second-level dialog
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
    Open a form with a nested dialog
  </ElButton>
</template>



