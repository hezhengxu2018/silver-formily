import { Cascader, FormButtonGroup, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { Button } from 'antd-mobile'
import { showDemoResult } from '../shared'

const form = createForm({ initialValues: { region: ['zhejiang', 'hangzhou'] } })

export default function Demo() {
  return (
    <FormProvider form={form}>
      <Button
        block
        onClick={() => form.query('region').take((field) => {
          field.setComponentProps({ visible: true })
        })}
      >
        选择省市
      </Button>
      <Field
        name="region"
        dataSource={[{ label: '浙江省', value: 'zhejiang', children: [{ label: '杭州市', value: 'hangzhou' }, { label: '宁波市', value: 'ningbo' }] }, { label: '江苏省', value: 'jiangsu', children: [{ label: '南京市', value: 'nanjing' }] }]}
        component={[Cascader, {
          title: '选择省市',
          visible: false,
          onClose: () => form.query('region').take((field) => {
            field.setComponentProps({ visible: false })
          }),
          onConfirm: (value: (string | number)[]) => {
            form.setValuesIn('region', value)
          },
        }]}
      />
      <FormButtonGroup>
        <Submit onSubmit={showDemoResult}>查看结果</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
