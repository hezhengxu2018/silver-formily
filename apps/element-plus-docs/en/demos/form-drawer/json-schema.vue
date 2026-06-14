<script setup lang="tsx">
import type { ISchema } from '@silver-formily/json-schema'
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

function DrawerForm() {
  return (
    <FormLayout labelCol={6} wrapperCol={10}>
      <SchemaField schema={drawerSchema} />
    </FormLayout>
  )
}

function handleOpen() {
  FormDrawer('Drawer Form', DrawerForm)
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
    Open Form
  </ElButton>
</template>



