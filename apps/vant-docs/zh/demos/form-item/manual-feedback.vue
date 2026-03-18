<script setup lang="ts">
import { FormItem, Input } from '@silver-formily/vant'
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <div class="demo-panel">
    <FormItem
      label="用户名"
      asterisk
      feedback-status="error"
      feedback-text="这里只是静态示例，用来观察反馈区和输入区的位置"
    >
      <Input
        v-model="value"
        placeholder="直接插进 FormItem 默认槽"
      />
    </FormItem>

    <FormItem
      label="说明"
      extra="FormItem 默认就把子节点渲染到 Vant Field 的 input 区域"
    >
      <Input
        v-model="value"
        placeholder="继续输入，观察壳层结构"
      />
    </FormItem>
  </div>
</template>

