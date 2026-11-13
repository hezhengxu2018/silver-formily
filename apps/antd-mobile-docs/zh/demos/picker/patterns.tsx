import { FormButtonGroup, FormItem, Picker, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const dataSource = [[{ label: '普通配送', value: 'standard' }, { label: '加急配送', value: 'express' }]]

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

const form = createForm({ initialValues: { self: ['standard'], disabled: ['standard'], readOnly: ['express'], preview: ['express'] } })

export default function PatternsDemo() {
  return (
    <FormProvider form={form}>
      <Field name="self" title="整行点击 / 清除" decorator={[FormItem, { clearable: true }]} dataSource={dataSource} component={[Picker]} />
      <Field name="disabled" title="禁用" disabled={true} decorator={[FormItem]} dataSource={dataSource} component={[Picker]} />
      <Field name="readOnly" title="只读" readOnly={true} decorator={[FormItem]} dataSource={dataSource} component={[Picker]} />
      <Field
        name="preview"
        title="预览"
        readPretty={true}
        dataSource={dataSource}
        decorator={[FormItem]}
        component={[Picker]}
      />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
