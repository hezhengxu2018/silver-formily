<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="PickerGroup 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="基础使用"
        description="像普通 Picker 一样点击字段触发弹层，内部通过默认插槽传入两个 PickerPanel，最后统一写回数组值。"
      >
        <DocsDemoRenderer path="@/zh/demos/picker-group/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义步骤内容"
        description="默认插槽可以传入 DatePickerPanel、TimePickerPanel、AreaPanel 或自定义面板，由面板自身承载选择逻辑。"
      >
        <DocsDemoRenderer path="@/zh/demos/picker-group/content.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="Area 与 TimePicker 组合"
        description="这个示例演示如何把 AreaPanel 和 TimePickerPanel 作为两个步骤放进 PickerGroup，常见于配送区域和送达时间的组合选择。"
      >
        <DocsDemoRenderer path="@/zh/demos/picker-group/area-time.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="工具栏与选项插槽"
        description="统一工具栏插槽仍由 PickerGroup 承载，选项内容交给插槽里的 PickerPanel 自己处理。"
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
