import { FormButtonGroup, FormItem, FormLayout, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm({
  initialValues: {
    instructions: '第一行：请核对收件信息。\n第二行：配送前会通过电话联系。\nOrderReferenceWithoutSpaces012345678901234567890123456789',
  },
})

export default function FormItemLongText() {
  return (
    <FormProvider form={form}>
      <FormLayout labelWidth={96}>
        <Field
          name="ellipsis"
          title="这是一个超出标签列宽度的完整收件地址标题"
          decorator={[FormItem, { help: '标签默认单行省略，点击带虚线的标签查看全文。' }]}
          component={[Input, { placeholder: '请输入收件地址' }]}
        />
        <Field
          name="wrapped"
          title="这是一个超出标签列宽度的完整收件地址标题"
          decorator={[FormItem, { labelWrap: true, help: '同样的标签，开启 labelWrap 后完整换行。' }]}
          component={[Input, { placeholder: '请输入详细地址' }]}
        />
        <Field
          name="instructions"
          title="内容换行"
          pattern="readPretty"
          decorator={[FormItem, { wrapperWrap: true }]}
          component={[Input, { placeholder: '配送说明' }]}
        />
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
