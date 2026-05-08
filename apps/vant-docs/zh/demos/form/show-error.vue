<script setup lang="ts">
import { Form, FormItem, Input } from '@silver-formily/vant'
</script>

<template>
  <Form :show-error="true">
    <FormItem label="显式开启" feedback-status="error" feedback-text="这里会显示红色错误样式">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>

  <Form :show-error="false">
    <FormItem label="显式关闭" feedback-status="error" feedback-text="错误文案还在，但不再渲染红色错误态">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>

  <Form>
    <FormItem label="默认值" feedback-status="error" feedback-text="默认也不会渲染红色错误态">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>
</template>
