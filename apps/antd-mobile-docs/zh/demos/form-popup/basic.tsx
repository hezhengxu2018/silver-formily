import { FormItem, FormLayout, FormPopup, Input } from '@silver-formily/antd-mobile'
import { Field } from '@silver-formily/react'
import { Button } from 'antd-mobile'
import { showDemoResult } from '../shared'

interface ContactValues {
  name: string
  phone: string
}

function BasicContent() {
  return (
    <FormLayout>
      <Field name="name" title="联系人" decorator={[FormItem]} component={[Input, { placeholder: '请输入联系人姓名' }]} />
      <Field name="phone" title="联系电话" decorator={[FormItem]} component={[Input, { type: 'tel', placeholder: '请输入联系电话' }]} />
    </FormLayout>
  )
}

export default function BasicDemo() {
  async function handleOpen() {
    try {
      const result = await FormPopup<ContactValues>({ title: '编辑联系人', okText: '保存' }, BasicContent).open({
        values: { name: '张三', phone: '13800000000' },
      })
      showDemoResult(result)
    }
    catch (error) {
      if (!(error instanceof Error && error.message === 'cancel'))
        throw error
    }
  }

  return <Button block color="primary" onClick={handleOpen}>打开基础表单弹层</Button>
}
