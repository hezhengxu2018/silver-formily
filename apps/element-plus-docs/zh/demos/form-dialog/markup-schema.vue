<script setup lang="tsx">
import { FormDialog, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

const { SchemaField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

// 弹框表单组件
const DialogForm = {
  props: ['form'],
  render() {
    return (
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField>
          <SchemaStringField
            name="aaa"
            required
            title="输入框1"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaStringField
            name="bbb"
            required
            title="输入框2"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaStringField
            name="ccc"
            required
            title="输入框3"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaStringField
            name="ddd"
            required
            title="输入框4"
            x-decorator="FormItem"
            x-component="Input"
          />
        </SchemaField>
      </FormLayout>
    )
  },
}

function handleOpen() {
  FormDialog('弹框表单', DialogForm)
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
    点击打开表单
  </ElButton>
</template>
