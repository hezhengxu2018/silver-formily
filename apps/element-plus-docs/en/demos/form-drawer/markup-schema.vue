<script setup lang="tsx">
import { FormDrawer, FormItem, FormLayout, Input } from '@silver-formily/element-plus'
import { createSchemaField } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

// Drawer form component
const DrawerForm = {
  props: ['form'],
  data() {
    const schema = {
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
  FormDrawer('Drawer Form', DrawerForm)
    .forOpen((props, next) => {
      setTimeout(() => {
        next()
      }, 1000)
    })
    .open({
      initialValues: {
        aaa: '123',
      },
    })
    .then(console.log)
}
</script>

<template>
  <ElButton @click="handleOpen">
    Open Form
  </ElButton>
</template>



