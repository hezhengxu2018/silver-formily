import { Cascader, FormButtonGroup, FormItem, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { useMemo } from 'react'
import { showDemoResult } from '../shared'

const dataSource = [{ label: '浙江省', value: 'zhejiang', children: [{ label: '杭州市', value: 'hangzhou' }, { label: '宁波市', value: 'ningbo' }] }, { label: '江苏省', value: 'jiangsu', children: [{ label: '南京市', value: 'nanjing' }] }]

export default function Demo() {
  const form = useMemo(() => createForm({ initialValues: {
    disabled: ['zhejiang', 'hangzhou'],
    readOnly: ['zhejiang', 'ningbo'],
    preview: ['jiangsu', 'nanjing'],
  } }), [])
  return (
    <FormProvider form={form}>
      <Field name="disabled" title="禁用" disabled dataSource={dataSource} decorator={[FormItem]} component={[Cascader]} />
      <Field name="readOnly" title="只读" readOnly dataSource={dataSource} decorator={[FormItem]} component={[Cascader]} />
      <Field name="preview" title="阅读态" readPretty dataSource={dataSource} decorator={[FormItem]} component={[Cascader]} />
      <Field name="empty" title="未选择" dataSource={dataSource} decorator={[FormItem, { clearable: true }]} component={[Cascader, { placeholder: '请选择地区' }]} />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
