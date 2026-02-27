<script setup lang="tsx">
import { FormDrawer, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { Field } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

function handleOpen() {
  FormDrawer('抽屉表单', ({ form }) => {
    console.log('form', form)
    return (
      <FormLayout labelCol={6} wrapperCol={10}>
        <Field
          name="aaa"
          required
          title="输入框1"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="bbb"
          required
          title="输入框2"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="ccc"
          required
          title="输入框3"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="ddd"
          required
          title="输入框4"
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
    点击打开表单
  </ElButton>
</template>
