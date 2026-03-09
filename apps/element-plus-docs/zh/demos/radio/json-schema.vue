<script lang="ts" setup>
import { createForm } from '@formily/core'
import { createSchemaField } from '@silver-formily/vue'
import { Form, FormItem, Radio, Submit } from '@sliver/formily-element-plus'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Radio,
  },
})

const schema = {
  type: 'object',
  properties: {
    radio: {
      'type': 'boolean',
      'title': '单选',
      'enum': [
        {
          label: '选项1',
          value: 1,
        },
        {
          label: '选项2',
          value: 2,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        optionType: 'button',
      },
    },
  },
}

const form = createForm()

async function onSubmit(value: Record<string, any>) {
  console.log(value)
}
</script>

<template>
  <Form :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">
      提交
    </Submit>
  </Form>
</template>
