<script setup lang="tsx">
import { FormDrawer, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { Field } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

function handleOpen() {
  FormDrawer('Drawer Form', ({ form }) => {
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
    .forConfirm(async (form, next) => {
      setTimeout(() => {
        console.log('form', form)
        next()
      }, 1000)
    })
    .open({
      initialValues: {
        aaa: '123',
      },
    })
    .then((values) => {
      console.log('values', values)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <ElButton @click="handleOpen">
    Open Form
  </ElButton>
</template>



