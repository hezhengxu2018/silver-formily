<script setup lang="ts">
import { Form, FormItem, Input } from '@silver-formily/vant'
</script>

<template>
  <Form :show-error="true" error-message-align="left">
    <FormItem label="左对齐" feedback-status="error" feedback-text="错误文案跟随 Form 配置左对齐">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>

  <Form :show-error="true" error-message-align="center">
    <FormItem label="居中对齐" feedback-status="error" feedback-text="错误文案跟随 Form 配置居中对齐">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>

  <Form :show-error="true" error-message-align="right">
    <FormItem label="右对齐" feedback-status="error" feedback-text="错误文案跟随 Form 配置右对齐">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>
</template>
