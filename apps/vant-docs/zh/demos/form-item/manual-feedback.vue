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
      extra="extra 属性现在会单独显示在 FormItem 下方"
    >
      <Input
        v-model="value"
        placeholder="继续输入，观察壳层结构"
      />
    </FormItem>

    <FormItem label="原生 extra 插槽">
      <template #extra>
        <span class="slot-extra">这段内容仍然走 Vant 原生 extra 布局</span>
      </template>
      <Input
        v-model="value"
        placeholder="观察右侧 extra 插槽位置"
      />
    </FormItem>
  </div>
</template>
