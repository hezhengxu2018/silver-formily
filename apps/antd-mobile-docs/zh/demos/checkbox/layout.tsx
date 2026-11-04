import { Checkbox, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const form = createForm()

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function CheckboxLayout() {
  return (
    <FormProvider form={form}>
      <Field
        name="city"
        title="所在城市"
        decorator={[FormItem]}
        component={[Checkbox.Group, {
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
        title="兴趣爱好"
        decorator={[FormItem]}
        component={[Checkbox.Group]}
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
        component={[Checkbox.Group]}
        dataSource={[
          { label: '已阅读并同意用户协议', value: 'yes' },
        ]}
      />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
