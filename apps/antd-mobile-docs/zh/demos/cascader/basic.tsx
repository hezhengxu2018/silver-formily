import { Cascader, FormButtonGroup, FormItem, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

const form = createForm({ initialValues: { region: ['zhejiang', 'hangzhou'] } })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Field
        name="region"
        title="所在地区"
        decorator={[FormItem]}
        dataSource={[{ label: '浙江省', value: 'zhejiang', children: [{ label: '杭州市', value: 'hangzhou' }, { label: '宁波市', value: 'ningbo' }] }, { label: '江苏省', value: 'jiangsu', children: [{ label: '南京市', value: 'nanjing' }] }]}
        component={[Cascader, { title: '选择省市', placeholder: '请选择地区' }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>查看结果</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </FormProvider>
  )
}
