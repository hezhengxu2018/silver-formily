import { FormItem, FormLayout, FormPopup, Input } from '@silver-formily/antd-mobile'
import { Field } from '@silver-formily/react'
import { Button } from 'antd-mobile'

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

function onSubmit(values: unknown) {
  return Prompts.alert(JSON.stringify(values, null, 2))
}

export default function BasicDemo() {
  async function handleOpen() {
    try {
      const result = await FormPopup<ContactValues>({ title: '编辑联系人', okText: '保存' }, BasicContent).open({
        values: { name: '张三', phone: '13800000000' },
      })
      await onSubmit(result)
    }
    catch (error) {
      if (!(error instanceof Error && error.message === 'cancel'))
        throw error
    }
  }

  return <Button block color="primary" onClick={handleOpen}>打开基础表单弹层</Button>
}
