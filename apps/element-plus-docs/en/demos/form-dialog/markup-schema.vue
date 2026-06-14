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

// Dialog form component
const DialogForm = {
  props: ['form'],
  render() {
    return (
      <FormLayout labelCol={6} wrapperCol={10}>
        <SchemaField>
          <SchemaStringField
            name="aaa"
            required
            title="Input 1"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaStringField
            name="bbb"
            required
            title="Input 2"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaStringField
            name="ccc"
            required
            title="Input 3"
            x-decorator="FormItem"
            x-component="Input"
          />
          <SchemaStringField
            name="ddd"
            required
            title="Input 4"
            x-decorator="FormItem"
            x-component="Input"
          />
        </SchemaField>
      </FormLayout>
    )
  },
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



