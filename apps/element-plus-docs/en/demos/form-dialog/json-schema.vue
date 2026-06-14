<script setup lang="tsx">
import type { ISchema } from '@silver-formily/json-schema'
import { FormDialog, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const dialogSchema: ISchema = {
  type: 'object',
  properties: {
    aaa: {
      'type': 'string',
      'title': 'Input 1',
      'required': true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    bbb: {
      'type': 'string',
      'title': 'Input 2',
      'required': true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    ccc: {
      'type': 'string',
      'title': 'Input 3',
      'required': true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    ddd: {
      'type': 'string',
      'title': 'Input 4',
      'required': true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
}

function DialogForm() {
  return (
    <FormLayout labelCol={6} wrapperCol={10}>
      <SchemaField schema={dialogSchema} />
    </FormLayout>
  )
}

function handleOpen() {
  FormDialog('Dialog Form', DialogForm)
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



