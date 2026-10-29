import type { PopupContentCallbacks } from '@silver-formily/antd-mobile'
import { createPopup, Form, FormButtonGroup, FormItem, FormStep, Input, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { createSchemaField, FormConsumer } from '@silver-formily/react'
import { Button } from 'antd-mobile'
import { useState } from 'react'
import { showDemoResult } from '../shared'

interface StepFormValues {
  name: string
  mobile: string
  address: string
  deliveryTime: string
  remark: string
}

interface StepFormContentProps extends PopupContentCallbacks<StepFormValues> {
  defaultValues: StepFormValues
}

const defaultValues: StepFormValues = {
  name: '张三',
  mobile: '13800000000',
  address: '杭州市西湖区文三路 188 号',
  deliveryTime: '工作日晚上 7 点后',
  remark: '',
}

const SchemaField = createSchemaField({ components: { FormStep, FormItem, Input } })

function StepFormContent({ defaultValues, onConfirm, onCancel }: StepFormContentProps) {
  const [form] = useState(() => createForm<StepFormValues>({ initialValues: { ...defaultValues } }))
  const [formStep] = useState(() => FormStep.createFormStep())

  return (
    <Form form={form}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '72vh' }}>
        <div style={{ padding: '16px 12px 0' }}>
          <div style={{ padding: 12, borderRadius: 12, background: 'var(--adm-color-box)' }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>弹出式分步表单</div>
            <div style={{ marginTop: 6, color: 'var(--adm-color-text-secondary)', fontSize: 12, lineHeight: 1.6 }}>
              createPopup 管理弹层开关，FormStep 管理步骤切换，最后通过 Submit 校验并提交。
            </div>
          </div>
        </div>
        <div style={{ flex: 1, paddingTop: 12 }}>
          <SchemaField>
            <SchemaField.Void name="steps" x-component="FormStep" x-component-props={{ formStep }}>
              <SchemaField.Void name="contact" title="联系信息" x-component="FormStep.StepPane">
                <SchemaField.String name="name" title="姓名" required x-decorator="FormItem" x-component="Input" x-component-props={{ placeholder: '请输入联系人姓名' }} />
                <SchemaField.String name="mobile" title="手机号" required x-decorator="FormItem" x-component="Input" x-component-props={{ type: 'tel', placeholder: '请输入手机号' }} />
              </SchemaField.Void>
              <SchemaField.Void name="delivery" title="配送信息" x-component="FormStep.StepPane">
                <SchemaField.String name="address" title="收货地址" required x-decorator="FormItem" x-component="Input.TextArea" x-component-props={{ rows: 3, placeholder: '请输入街道、楼栋、门牌号' }} />
                <SchemaField.String name="deliveryTime" title="送达时间" x-decorator="FormItem" x-component="Input" x-component-props={{ placeholder: '例如工作日晚上 7 点后' }} />
              </SchemaField.Void>
              <SchemaField.Void name="confirm" title="确认提交" x-component="FormStep.StepPane">
                <SchemaField.String name="remark" title="备注" x-decorator="FormItem" x-component="Input.TextArea" x-component-props={{ rows: 2, placeholder: '可选，补充门禁、楼层或电话备注' }} />
              </SchemaField.Void>
            </SchemaField.Void>
          </SchemaField>
        </div>
        <FormConsumer>
          {() => (
            <FormButtonGroup layout="horizontal">
              {formStep.allowBack
                ? <Button onClick={() => formStep.back()}>上一步</Button>
                : <Button onClick={onCancel}>取消</Button>}
              {formStep.allowNext
                ? <Button color="primary" onClick={() => formStep.next()}>下一步</Button>
                : <Submit onSubmit={onConfirm}>确认提交</Submit>}
            </FormButtonGroup>
          )}
        </FormConsumer>
      </div>
    </Form>
  )
}

const stepFormPopup = createPopup(StepFormContent, {
  closeOnMaskClick: false,
  bodyStyle: { maxHeight: '90vh', overflowY: 'auto' },
})

export default function FormStepDemo() {
  async function handleOpen() {
    const result = await stepFormPopup.prompt({ defaultValues })
    if (result !== null)
      showDemoResult(result)
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ color: 'var(--adm-color-text-secondary)', fontSize: 13, lineHeight: 1.6 }}>
        将联系信息、配送信息和确认提交拆成三个步骤，适合资料补录、地址编辑等弹层流程。
      </div>
      <Button block color="primary" onClick={handleOpen}>打开弹出式分步表单</Button>
    </div>
  )
}
