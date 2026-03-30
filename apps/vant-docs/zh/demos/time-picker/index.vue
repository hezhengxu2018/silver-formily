<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="TimePicker 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="基础用法"
        description="和官方示例一致，默认显示时分两列。"
      >
        <DocsDemoRenderer path="@/zh/demos/time-picker/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="选项类型"
        description="通过 `columnsType` 组合时、分、秒三列。"
      >
        <DocsDemoRenderer path="@/zh/demos/time-picker/columns-type.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="时间范围"
        description="分别限制小时和分钟的可选区间。"
      >
        <DocsDemoRenderer path="@/zh/demos/time-picker/time-range.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="整体时间范围"
        description="通过 `minTime` 和 `maxTime` 约束完整时间段。"
      >
        <DocsDemoRenderer path="@/zh/demos/time-picker/overall-range.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="格式化选项"
        description="使用 `formatter` 自定义时间项文案。"
      >
        <DocsDemoRenderer path="@/zh/demos/time-picker/formatter.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="过滤选项"
        description="使用 `filter` 自定义时间步进。"
      >
        <DocsDemoRenderer path="@/zh/demos/time-picker/filter.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="高级用法"
        description="结合当前选中值做联动过滤。"
      >
        <DocsDemoRenderer path="@/zh/demos/time-picker/advanced.vue" />
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
