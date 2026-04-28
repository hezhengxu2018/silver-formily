<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="TimePickerPanel 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="基础使用"
        description="直接展示时间滚轮，滚轮变化会暂存选择，点击确认后才写回字段值。"
      >
        <DocsDemoRenderer path="@/zh/demos/time-picker-panel/basic.vue" />
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
