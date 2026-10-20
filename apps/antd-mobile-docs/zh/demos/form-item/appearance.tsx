import { FormButtonGroup, FormItem, FormLayout, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm()

export default function FormItemAppearance() {
  return (
    <FormProvider form={form}>
      <FormLayout labelWidth={80}>
        <Field name="default" title="默认分隔" decorator={[FormItem]} component={[Input, { placeholder: '请输入内容' }]} />
        <Field
          name="borderless"
          title="无分隔线"
          decorator={[FormItem, { bordered: false }]}
          component={[Input, { placeholder: '这一行不显示顶部分隔线' }]}
        />
        <Field
          name="amount"
          title="控件靠右"
          decorator={[FormItem, { wrapperWidth: 120, wrapperAlign: 'right', extra: '元' }]}
          component={[Input, { placeholder: '请输入金额', style: { '--text-align': 'right' } }]}
        />
        <Field
          name="search"
          title="搜索内容"
          decorator={[FormItem, { label: null, help: '隐藏标签后，输入区域占据整行。' }]}
          component={[Input, { placeholder: '无标签输入框' }]}
        />
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
