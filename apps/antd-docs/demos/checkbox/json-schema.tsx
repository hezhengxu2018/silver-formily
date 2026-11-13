import { Checkbox, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'

const SchemaField = createSchemaField({
  components: {
    Checkbox,
    FormItem,
  },
})

const schema = {
  type: 'object',
  properties: {
    single: {
      'type': 'boolean',
      'title': '是否确认',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox',
    },
    multiple: {
      'type': 'array',
      'title': '复选',
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
      'x-component': 'Checkbox.Group',
    },
  },
}

const form = createForm()

export default function Demo() {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
