<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="PickerGroup 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="基础使用"
        description="像普通 Picker 一样点击字段触发弹层，内部再用 PickerGroup 按步骤切换城市和时段，最后统一写回数组值。"
      >
        <DocsDemoRenderer path="@/zh/demos/picker-group/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义步骤内容"
        description="提供默认插槽后，PickerGroup 会优先渲染你放进去的 DatePicker、TimePicker、Area 或自定义 Picker 派生组件。"
      >
        <DocsDemoRenderer path="@/zh/demos/picker-group/content.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="Area 与 TimePicker 组合"
        description="这个示例演示如何把官方 Area 和 TimePicker 直接作为两个步骤放进 PickerGroup，常见于配送区域和送达时间的组合选择。"
      >
        <DocsDemoRenderer path="@/zh/demos/picker-group/area-time.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="工具栏与选项插槽"
        description="没有提供默认插槽时，仍会回退到内部 VanPicker，并继续支持 title、cancel、confirm、option 等常用插槽。"
      >
        <DocsDemoRenderer path="@/zh/demos/picker-group/slot.vue" />
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
