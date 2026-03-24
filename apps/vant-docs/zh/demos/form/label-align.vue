<script setup lang="ts">
import { Form, FormItem, Input } from '@silver-formily/vant'
</script>

<template>
  <Form label-width="4.5em" label-align="left">
    <FormItem label="左对齐">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>

  <Form label-width="4.5em" label-align="right">
    <FormItem label="右对齐">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>

  <Form label-align="top">
    <FormItem label="顶部对齐">
      <Input.TextArea model-value="标签会被放到输入框上方" rows="2" />
    </FormItem>
  </Form>
</template>
