import { FormButtonGroup, FormItem, FormLayout, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm()

export default function FormItemVertical() {
  return (
    <FormProvider form={form}>
      <FormLayout layout="vertical">
        <Field
          name="name"
          title="联系人"
          required
          decorator={[FormItem, { help: '标签位于输入框上方，提交时检查必填。' }]}
          component={[Input, { placeholder: '请输入联系人姓名' }]}
        />
        <Field
          name="notes"
          title="请填写本次配送需要注意的事项以及方便联系的时间段"
          decorator={[FormItem, { labelWrap: true, tooltip: '例如：工作日晚上六点后联系。' }]}
          component={[Input.TextArea, { placeholder: '请输入配送备注', rows: 3 }]}
        />
        <Field
          name="phone"
          title="联系电话"
          decorator={[FormItem, { layout: 'horizontal', labelWidth: 80, help: '这一项单独覆盖为横向布局。' }]}
          component={[Input, { placeholder: '请输入联系电话' }]}
        />
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
