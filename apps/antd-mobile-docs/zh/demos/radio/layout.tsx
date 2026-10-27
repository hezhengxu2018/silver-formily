import { FormButtonGroup, FormItem, Radio, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { showDemoResult } from '../shared'

const form = createForm()

export default function RadioLayout() {
  return (
    <FormProvider form={form}>
      <Field
        name="city"
        title="所在城市"
        decorator={[FormItem]}
        component={[Radio.Group, {
          options: [
            { label: '杭州', value: 'hangzhou' },
            { label: '上海', value: 'shanghai' },
            { label: '北京', value: 'beijing' },
          ],
          layout: 'horizontal',
          layoutBlock: true,
        }]}
      />
      <Field
        name="hobbies"
        title="休闲活动"
        decorator={[FormItem]}
        component={[Radio.Group]}
        dataSource={[
          { label: '吃饭', value: 'eat' },
          { label: '睡觉', value: 'sleep' },
          { label: '打豆豆', value: 'play' },
        ]}
      />
      <Field
        name="agree"
        title="协议"
        decorator={[FormItem]}
        component={[Radio.Group]}
        dataSource={[
          { label: '已阅读并同意用户协议', value: 'yes' },
        ]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
