<script setup lang="tsx">
import type { ISchema } from '@formily/json-schema'
import { FormDrawer, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

const drawerSchema: ISchema = {
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

function DrawerForm() {
  return (
    <FormLayout labelCol={6} wrapperCol={10}>
      <SchemaField schema={drawerSchema} />
    </FormLayout>
  )
}

function handleOpen() {
  FormDrawer('抽屉表单', DrawerForm)
    .open({
      initialValues: {
        aaa: '123',
      },
    })
    .then((values) => {
      console.log('values', values)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <ElButton @click="handleOpen">
    点击打开表单
  </ElButton>
</template>
