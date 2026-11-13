import { Cascader, Form, FormItem, Reset, Submit } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Button, Space } from 'antd'

const options = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      { label: '杭州市', value: 'hangzhou' },
      { label: '宁波市', value: 'ningbo' },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
]

const form = createForm({ initialValues: { value: ['zhejiang', 'hangzhou'], multiple: [['zhejiang', 'hangzhou'], ['jiangsu', 'nanjing']] } })

export default function Demo() {
  return (
    <Form form={form} labelCol={6} wrapperCol={16}>
      <Field name="value" title="单选" decorator={[FormItem]} component={[Cascader, { options, style: { width: '100%' } }]} />
      <Field
        name="multiple"
        title="多选"
        decorator={[FormItem]}
        component={[Cascader, {
          options,
          multiple: true,
          showCheckedStrategy: Cascader.SHOW_CHILD,
          placeholder: '请选择多个城市',
          style: { width: '100%' },
        }]}
      />

      <Space wrap>
        <Button onClick={() => form.setPattern(form.pattern === 'readPretty' ? 'editable' : 'readPretty')}>切换阅读态</Button>
        <Reset>重置</Reset>
        <Submit onSubmit={values => console.log(values)}>提交到控制台</Submit>
      </Space>
    </Form>
  )
}
