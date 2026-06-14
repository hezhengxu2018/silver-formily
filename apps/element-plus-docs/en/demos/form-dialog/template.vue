<script setup lang="tsx">
import { FormDialog, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { Field } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

function handleOpen() {
  FormDialog('Dialog Form', ({ form }) => {
    console.log('form', form)
    return (
      <FormLayout labelCol={6} wrapperCol={10}>
        <Field
          name="aaa"
          required
          title="Input 1"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="bbb"
          required
          title="Input 2"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="ccc"
          required
          title="Input 3"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="ddd"
          required
          title="Input 4"
          decorator={[FormItem]}
          component={[Input]}
        />
      </FormLayout>
    )
  })
    .forOpen((payload, next) => {
      setTimeout(() => {
        next({
          initialValues: {
            aaa: '123',
          },
        })
      }, 1000)
    })
    .forConfirm((payload, next) => {
      setTimeout(() => {
        console.log(payload)
        next(payload)
      }, 1000)
    })
    .forCancel((payload, next) => {
      setTimeout(() => {
        console.log(payload)
        next(payload)
      }, 1000)
    })
    .open()
    .then(console.log)
    .catch(console.error)
}
</script>

<template>
  <ElButton @click="handleOpen">
    Open Form
  </ElButton>
</template>



