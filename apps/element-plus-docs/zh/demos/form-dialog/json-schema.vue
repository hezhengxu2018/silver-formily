<script setup lang="tsx">
import { FormDialog, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

// 弹框表单组件
const DialogForm = {
  data() {
    const schema = {
      type: 'object',
      properties: {
        aaa: {
          'type': 'string',
          'title': '输入框1',
          'required': true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        bbb: {
          'type': 'string',
          'title': '输入框2',
          'required': true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ccc: {
          'type': 'string',
          'title': '输入框3',
          'required': true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        ddd: {
          'type': 'string',
          'title': '输入框4',
          'required': true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    }
    return {
      schema,
    }
  },
  render() {
    return (
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField schema={this.schema} />
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
