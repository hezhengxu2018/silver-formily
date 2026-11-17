import { FormButtonGroup, FormItem, Submit, Switch } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/react'

const SchemaField = createSchemaField({
  components: {
    Switch,
    FormItem,
  },
})

const schema = {
  type: 'object',
  properties: {
    switch: {
      'type': 'boolean',
      'title': '开关',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}

const form = createForm({ initialValues: { switch: false } })

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

function onSubmitFailed(feedbacks: unknown) {
  return Prompts.alert(JSON.stringify(feedbacks, null, 2))
}

export default function Demo() {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmitFailed={onSubmitFailed} onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
