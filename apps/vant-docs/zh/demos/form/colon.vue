<script setup lang="ts">
import { Form, FormItem, Input } from '@silver-formily/vant'
</script>

<template>
  <Form label-width="4.5em" colon>
    <FormItem label="用户名">
      <Input model-value="silver-formily" />
    </FormItem>
    <FormItem label="简介" label-align="top">
      <Input.TextArea model-value="给所有标签统一加上冒号" rows="2" />
    </FormItem>
  </Form>
</template>
