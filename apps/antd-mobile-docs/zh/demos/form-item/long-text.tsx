import { FormButtonGroup, FormItem, FormLayout, Input, Picker, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const addressOptions = [[{ label: '上海市浦东新区张江高科技园区祖冲之路 123 号研发中心 A 栋 1208 室', value: 'office' }]]

const form = createForm({
  initialValues: {
    scrollingAddress: ['office'],
    wrappedAddress: ['office'],
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
          decorator={[FormItem, { help: '标签默认单行省略，长按带虚线的标签查看全文。' }]}
          component={[Input, { placeholder: '请输入收件地址' }]}
        />
        <Field
          name="wrapped"
          title="这是一个超出标签列宽度的完整收件地址标题"
          decorator={[FormItem, { labelWrap: true, help: '同样的标签，开启 labelWrap 后完整换行。' }]}
          component={[Input, { placeholder: '请输入详细地址' }]}
        />
        <Field
          name="scrollingAddress"
          title="内容滚动"
          dataSource={addressOptions}
          decorator={[FormItem, { wrapperWrap: false, help: '关闭 wrapperWrap：已选地址保持单行，可左右滑动查看全文，点击可重新选择。' }]}
          component={[Picker]}
        />
        <Field
          name="wrappedAddress"
          title="已选换行"
          dataSource={addressOptions}
          decorator={[FormItem, { wrapperWrap: true, help: '相同的已选地址，开启 wrapperWrap 后完整换行。' }]}
          component={[Picker]}
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
