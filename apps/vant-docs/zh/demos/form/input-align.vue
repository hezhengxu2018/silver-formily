<script setup lang="ts">
import { Form, FormItem, Input } from '@silver-formily/vant'
</script>

<template>
  <Form input-align="left">
    <FormItem label="左对齐">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>

  <Form input-align="center">
    <FormItem label="居中对齐">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>

  <Form input-align="right">
    <FormItem label="右对齐">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>
</template>
