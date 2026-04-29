<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="PickerGroupPanel 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="基础使用"
        description="直接渲染分步选择面板，通过默认插槽传入多个 PickerPanel，最后一步确认后统一写回数组值。"
      >
        <DocsDemoRenderer path="@/zh/demos/picker-group-panel/basic.vue" />
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
