<script setup lang="ts">
import { Form, FormItem, Input } from '@silver-formily/vant'
</script>

<template>
  <Form disabled>
    <FormItem label="整体禁用" extra="Form 级 disabled 会同步到真实输入框">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>

  <Form readonly>
    <FormItem label="整体只读" extra="Form 级 readonly 会同步到真实输入框">
      <Input model-value="silver-formily" />
    </FormItem>
  </Form>

  <Form readonly>
    <FormItem label="单项覆盖" extra="Form 级 readonly 仍然可以被 FormItem 显式覆盖">
      <Input model-value="这里仍然是只读态" />
    </FormItem>
    <FormItem label="允许编辑" :readonly="false">
      <Input model-value="这项显式关闭 readonly" />
    </FormItem>
  </Form>
</template>
