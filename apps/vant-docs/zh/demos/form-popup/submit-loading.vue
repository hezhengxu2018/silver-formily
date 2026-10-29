<script setup lang="tsx">
import { FormItem, FormPopup, Input } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { Button as VanButton } from 'vant'
import { showDemoResult } from '../shared'

async function handleOpen() {
  try {
    const result = await FormPopup<{ name: string }>({
      title: '保存联系人',
      okText: '保存',
    }, () => (
      <Field name="name" title="联系人" required decorator={[FormItem]} component={[Input]} />
    ))
      .forConfirm(async () => {
        // 模拟提交请求：返回 Promise，让 form.submitting 持续到请求完成。
        await new Promise(resolve => setTimeout(resolve, 2000))
        // 未返回自定义结果时，默认使用 form.values。
      })
      .open({ initialValues: { name: '张三' } })
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
    异步提交 Loading
  </VanButton>
</template>
