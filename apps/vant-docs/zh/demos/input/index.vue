<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Input 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection title="基础输入">
        <DocsDemoRenderer path="@/zh/demos/input/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="常见类型">
        <DocsDemoRenderer path="@/zh/demos/input/types.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="只读与禁用">
        <DocsDemoRenderer path="@/zh/demos/input/status.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="图标与清空">
        <DocsDemoRenderer path="@/zh/demos/input/icons.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="字数统计">
        <DocsDemoRenderer path="@/zh/demos/input/word-limit.vue" />
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
