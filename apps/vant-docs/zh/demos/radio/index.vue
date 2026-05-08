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

      <MobileDemoSection
        title="宫格卡片布局"
        description="使用 Radio.Group 默认插槽配合 Grid，可以把单选项做成更适合移动端入口选择的卡片宫格。"
      >
        <DocsDemoRenderer path="@/zh/demos/radio/grid.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义选项内容">
        <DocsDemoRenderer path="@/zh/demos/radio/slot.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="允许再次点击取消"
        description="给 Radio.Group 开启 cancelable 后，当前已选项可以再次点击清空，适合“可选可不选”的单值场景。"
      >
        <DocsDemoRenderer path="@/zh/demos/radio/cancelable.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="禁用状态">
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
