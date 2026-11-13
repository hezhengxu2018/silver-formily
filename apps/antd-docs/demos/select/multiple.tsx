import { FormButtonGroup, FormItem, Select, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'

const SchemaField = createSchemaField({
  components: {
    Select,
    FormItem,
  },
})

const schema = {
  type: 'object',
  properties: {
    skills: {
      'type': 'array',
      'title': '技术栈',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'enum': [
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JavaScript', value: 'javascript' },
      ],
      'x-component-props': {
        mode: 'multiple',
        allowClear: true,
        placeholder: '请选择技术栈（可多选）',
      },
    },
  },
}

const form = createForm({
  initialValues: {
    skills: ['react', 'typescript'],
  },
})

export default function MultipleExample() {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
