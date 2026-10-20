import { FormButtonGroup, FormItem, FormLayout, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm()

export default function FormItemTooltip() {
  return (
    <FormProvider form={form}>
      <FormLayout labelWidth={96}>
        <Field
          name="nickname"
          title="图标提示"
          decorator={[FormItem, { tooltip: '点击标签旁的图标查看说明；点击空白处关闭。' }]}
          component={[Input, { placeholder: '请输入昵称' }]}
        />
        <Field
          name="account"
          title="文字提示"
          decorator={[FormItem, { tooltipLayout: 'text', tooltip: '点击带虚线的标签文字，也可以展开提示。' }]}
          component={[Input, { placeholder: '请输入账号' }]}
        />
        <Field
          name="reference"
          title="长说明"
          decorator={[FormItem, {
            tooltipIcon: <span>?</span>,
            tooltip: '提示内容会根据手机屏幕宽度自动换行，较长的连续链接也不会撑出页面。参考链接：https://example.com/help/VeryLongReferenceWithoutSpaces012345678901234567890123456789',
          }]}
          component={[Input, { placeholder: '请输入参考编号' }]}
        />
      </FormLayout>
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
