<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Calendar 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection title="选择切换模式">
        <DocsDemoRenderer path="@/zh/demos/calendar/switch-mode.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="选择单个日期 / 多个日期 / 日期区间">
        <DocsDemoRenderer path="@/zh/demos/calendar/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="快捷选择">
        <DocsDemoRenderer path="@/zh/demos/calendar/quick-select.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义颜色">
        <DocsDemoRenderer path="@/zh/demos/calendar/custom-color.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义日期范围">
        <DocsDemoRenderer path="@/zh/demos/calendar/custom-range.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义按钮文字">
        <DocsDemoRenderer path="@/zh/demos/calendar/button-text.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义日期文案">
        <DocsDemoRenderer path="@/zh/demos/calendar/formatter.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义弹出位置">
        <DocsDemoRenderer path="@/zh/demos/calendar/popup-position.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="日期区间最大范围">
        <DocsDemoRenderer path="@/zh/demos/calendar/max-range.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义周起始日">
        <DocsDemoRenderer path="@/zh/demos/calendar/first-day.vue" />
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
