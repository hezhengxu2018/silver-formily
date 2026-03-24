<script setup lang="ts">
import { Form, FormItem, Input } from '@silver-formily/vant'
</script>

<template>
  <Form>
    <FormItem label="默认文案" feedback-status="error" feedback-text="这里会展示错误文案">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>

  <Form :show-error-message="false">
    <FormItem label="关闭文案" feedback-status="error" feedback-text="这段文案会被统一隐藏">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>
</template>
