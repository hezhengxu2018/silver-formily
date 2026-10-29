<script setup lang="tsx">
import { FormItem, FormPopup, Input } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { Button as VanButton } from 'vant'
import { showDemoResult } from '../shared'

async function handleOpen() {
  try {
    const result = await FormPopup<{ name: string }>({
      title: '编辑联系人',
      loadingText: '正在加载联系人...',
    }, () => (
      <Field name="name" title="联系人" decorator={[FormItem]} component={[Input]} />
    ))
      .forOpen(async (props) => {
        // 模拟请求：等待期间自动显示 Loading，完成后再打开表单。
        await new Promise(resolve => setTimeout(resolve, 1500))
        return { ...props, initialValues: { name: '张三' } }
      })
      .open()
    await showDemoResult(result)
  }
  catch (error) {
    if (!(error instanceof Error && error.message === 'cancel'))
      throw error
  }
}
</script>

<template>
  <VanButton type="primary" block @click="handleOpen">
    异步加载后打开表单
  </VanButton>
</template>
