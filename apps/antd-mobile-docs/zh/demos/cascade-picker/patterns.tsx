import { CascadePicker, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { useMemo } from 'react'
import { showDemoResult } from '../shared'
import { options } from './_options'

export default function PatternsDemo() {
  const form = useMemo(() => createForm({ initialValues: {
    disabled: ['zhejiang', 'hangzhou', 'xihu'],
    readOnly: ['zhejiang', 'ningbo', 'haishu'],
    preview: ['jiangsu', 'suzhou', 'gusu'],
  } }), [])
  return (
    <FormProvider form={form}>
      <Field name="disabled" title="禁用" pattern="disabled" dataSource={options} decorator={[FormItem, { clearable: true }]} component={[CascadePicker]} />
      <Field name="readOnly" title="只读" pattern="readOnly" dataSource={options} decorator={[FormItem, { clearable: true }]} component={[CascadePicker]} />
      <Field name="preview" title="自定义预览" pattern="readPretty" dataSource={options} decorator={[FormItem]} component={[CascadePicker, { displayRender: labels => labels.join(' > ') }]} />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
