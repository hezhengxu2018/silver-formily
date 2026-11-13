import { CascadePicker, FormButtonGroup, FormItem, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'
import { options } from './_options'

const SchemaField = createSchemaField({ components: { CascadePicker, FormItem } })
const schema = {
  type: 'object',
  properties: {
    address: {
      'type': 'array',
      'title': '所在地区',
      'required': true,
      'enum': options,
      'x-decorator': 'FormItem',
      'x-decorator-props': { clearable: true },
      'x-component': 'CascadePicker',
      'x-component-props': { placeholder: '请选择省市区' },
    },
  },
}

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

const form = createForm({ initialValues: { address: ['zhejiang', 'hangzhou', 'xihu'] } })

export default function BasicDemo() {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
