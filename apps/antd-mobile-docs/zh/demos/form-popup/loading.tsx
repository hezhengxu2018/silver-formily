import { FormItem, FormLayout, FormPopup, Input } from '@silver-formily/antd-mobile'
import { Field } from '@silver-formily/react'
import { Button } from 'antd-mobile'
import { showDemoResult } from '../shared'

export default function LoadingDemo() {
  async function handleOpen() {
    try {
      const result = await FormPopup<{ name: string }>({
        title: '编辑联系人',
        loadingText: '正在加载联系人...',
      }, () => (
        <FormLayout>
          <Field name="name" title="联系人" decorator={[FormItem]} component={[Input]} />
        </FormLayout>
      ))
        .forOpen(async (props) => {
          // 模拟请求：等待期间自动显示 Loading，完成后再打开表单。
          await new Promise(resolve => setTimeout(resolve, 1500))
          return { ...props, initialValues: { name: '张三' } }
        })
        .open()
      showDemoResult(result)
    }
    catch (error) {
      if (!(error instanceof Error && error.message === 'cancel'))
        throw error
    }
  }

  return <Button block color="primary" onClick={handleOpen}>异步加载后打开表单</Button>
}
