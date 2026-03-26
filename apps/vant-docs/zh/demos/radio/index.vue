<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Radio 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection title="基础使用">
        <DocsDemoRenderer path="@/zh/demos/radio/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="排列与形状">
        <DocsDemoRenderer path="@/zh/demos/radio/direction.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="搭配单元格使用"
        description="点击整行单元格即可切换选项，这一段专门保留官方单选框搭配 Cell 的写法，避免说明文案混进表单内容里。"
      >
        <DocsDemoRenderer path="@/zh/demos/radio/cell.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义选项内容">
        <DocsDemoRenderer path="@/zh/demos/radio/slot.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="禁用与只读">
        <DocsDemoRenderer path="@/zh/demos/radio/status.vue" />
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
