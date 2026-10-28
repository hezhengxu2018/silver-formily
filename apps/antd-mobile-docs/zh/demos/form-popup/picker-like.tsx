import type { FormPopupContentProps } from '@silver-formily/antd-mobile'
import { FormItem, FormLayout, FormPopup, Input } from '@silver-formily/antd-mobile'
import { Field, observer } from '@silver-formily/react'
import { Button } from 'antd-mobile'
import { showDemoResult } from '../shared'
import './style.css'

interface AddressValues {
  receiver: string
  phone: string
}

const PickerHeader = observer(({ form, reject, resolve }: FormPopupContentProps<AddressValues>) => (
  <div className="form-popup-demo-toolbar">
    <Button fill="none" disabled={form.submitting} onClick={reject}>取消</Button>
    <div className="form-popup-demo-toolbar-title">编辑收货人</div>
    <Button fill="none" color="primary" disabled={form.submitting} onClick={() => resolve()}>确定</Button>
  </div>
))

export default function PickerLikeDemo() {
  async function handleOpen() {
    try {
      const result = await FormPopup<AddressValues>({ className: 'form-popup-demo-picker-like', closeOnMaskClick: false }, {
        header: props => <PickerHeader {...props} />,
        default: () => (
          <FormLayout>
            <Field
              name="receiver"
              title="收货人"
              validator={[{ required: true, message: '请输入收货人姓名' }]}
              decorator={[FormItem]}
              component={[Input, { placeholder: '例如：张三' }]}
            />
            <Field
              name="phone"
              title="联系电话"
              validator={[{ required: true, message: '请输入联系电话' }]}
              decorator={[FormItem]}
              component={[Input, { type: 'tel', placeholder: '例如：13800000000' }]}
            />
          </FormLayout>
        ),
        footer: () => null,
      }).open({ values: { receiver: '张三', phone: '13800000000' } })
      showDemoResult(result)
    }
    catch (error) {
      if (!(error instanceof Error && error.message === 'cancel'))
        throw error
    }
  }

  return <Button block color="primary" onClick={handleOpen}>打开 Picker 风格 FormPopup</Button>
}
