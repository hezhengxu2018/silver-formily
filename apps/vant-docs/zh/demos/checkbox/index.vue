<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Checkbox 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="单个复选框"
        description="单个 Checkbox 更适合协议确认、订阅开关这类布尔值字段。"
      >
        <DocsDemoRenderer path="@/zh/demos/checkbox/single.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="基础多选">
        <DocsDemoRenderer path="@/zh/demos/checkbox/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="最多选择两项">
        <DocsDemoRenderer path="@/zh/demos/checkbox/max.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="搭配单元格使用"
        description="点击整行即可勾选，比单纯堆叠复选框更接近移动端设置页和服务选择页的交互。"
      >
        <DocsDemoRenderer path="@/zh/demos/checkbox/cell.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义选项内容">
        <DocsDemoRenderer path="@/zh/demos/checkbox/slot.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="禁用状态">
        <DocsDemoRenderer path="@/zh/demos/checkbox/status.vue" />
      </MobileDemoSection>
    </div>
  </div>
</template>

<style scoped>
.mobile-page {
  min-height: 100vh;
  background: var(--van-background);
}

.mobile-page__body {
  display: grid;
  padding-bottom: 24px;
}
</style>
