<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="TreeSelect 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection title="基础使用">
        <DocsDemoRenderer path="@/zh/demos/tree-select/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="多选"
        description="字段值传入数组时，右侧选项会进入多选模式，可配合 max 限制最多可选数量。"
      >
        <DocsDemoRenderer path="@/zh/demos/tree-select/multiple.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="只读与禁用">
        <DocsDemoRenderer path="@/zh/demos/tree-select/status.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="阅读态">
        <DocsDemoRenderer path="@/zh/demos/tree-select/read-pretty.vue" />
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
