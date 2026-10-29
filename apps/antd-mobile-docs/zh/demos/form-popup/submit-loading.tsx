import { FormItem, FormLayout, FormPopup, Input } from '@silver-formily/antd-mobile'
import { Field } from '@silver-formily/react'
import { Button } from 'antd-mobile'
import { showDemoResult } from '../shared'

export default function SubmitLoadingDemo() {
  async function handleOpen() {
    try {
      const result = await FormPopup<{ name: string }>({
        title: '保存联系人',
        okText: '保存',
      }, () => (
        <FormLayout>
          <Field name="name" title="联系人" required decorator={[FormItem]} component={[Input]} />
        </FormLayout>
      ))
        .forConfirm(async () => {
          // 模拟提交请求：返回 Promise，让 form.submitting 持续到请求完成。
          await new Promise(resolve => setTimeout(resolve, 2000))
          // 未返回自定义结果时，默认使用 form.values。
        })
        .open({ initialValues: { name: '张三' } })
      showDemoResult(result)
    }
    catch (error) {
      if (!(error instanceof Error && error.message === 'cancel'))
        throw error
    }
  }

  return <Button block color="primary" onClick={handleOpen}>异步提交 Loading</Button>
}
