import type { FormPopupContentProps, IFormStep } from '@silver-formily/antd-mobile'
import { FormItem, FormLayout, FormPopup, FormStep, Input } from '@silver-formily/antd-mobile'
import { createSchemaField, observer } from '@silver-formily/react'
import { Button } from 'antd-mobile'
import { showDemoResult } from '../shared'
import './style.css'

interface StepFormValues {
  name: string
  mobile: string
  address: string
  deliveryTime: string
  remark: string
}

const defaultValues: StepFormValues = {
  name: '张三',
  mobile: '13800000000',
  address: '杭州市西湖区文三路 188 号',
  deliveryTime: '工作日晚上 7 点后',
  remark: '',
}

const SchemaField = createSchemaField({ components: { FormStep, FormItem, Input } })

const StepFooter = observer(({ form, resolve, reject, formStep }: FormPopupContentProps<StepFormValues> & { formStep: IFormStep }) => (
  <div style={{ display: 'grid', gap: 12, width: '100%' }}>
    <Button
      block
      disabled={form.submitting}
      onClick={async () => {
        await form.reset()
        formStep.setCurrent(0)
      }}
    >
      重置表单
    </Button>
    <div className="form-popup-demo-actions">
      <Button disabled={form.submitting} onClick={reject}>取消</Button>
      <Button disabled={form.submitting || !formStep.allowBack} onClick={() => formStep.back()}>上一步</Button>
      {formStep.allowNext
        ? <Button color="primary" onClick={() => formStep.next()}>下一步</Button>
        : <Button color="primary" loading={form.submitting} onClick={() => resolve()}>确认提交</Button>}
    </div>
  </div>
))

export default function FormStepDemo() {
  async function handleOpen() {
    // 每次打开创建独立的步骤控制器，与本次 FormPopup 的 Form 对应。
    const formStep = FormStep.createFormStep()
    const popup = FormPopup<StepFormValues>({ title: '分步填写配送信息' }, {
      default: () => (
        <FormLayout>
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
        </FormLayout>
      ),
      footer: props => <StepFooter {...props} formStep={formStep} />,
    }).forConfirm(async (form) => {
      // 可以读取、修改完整 Form 实例；返回 Promise 让提交 Loading 覆盖整个请求。
      await new Promise(resolve => setTimeout(resolve, 1000))
      form.setValues({ remark: form.values.remark.trim() })
    })

    try {
      const result = await popup.open({ initialValues: { ...defaultValues } })
      showDemoResult(result)
    }
    catch (error) {
      if (!(error instanceof Error && error.message === 'cancel'))
        throw error
    }
  }

  return <Button block color="primary" onClick={handleOpen}>打开 FormPopup 分步表单</Button>
}
