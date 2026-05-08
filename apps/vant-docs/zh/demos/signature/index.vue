<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Signature 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="基础使用"
        description="签名后点击确认即可把 dataURL 写回字段值。"
      >
        <DocsDemoRenderer path="@/zh/demos/signature/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义样式"
        description="可以直接透传笔迹颜色、线宽、背景色和按钮文案。"
      >
        <DocsDemoRenderer path="@/zh/demos/signature/custom-style.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="禁用回显"
        description="禁用态下如果字段已有签名，会直接显示图片预览。"
      >
        <DocsDemoRenderer path="@/zh/demos/signature/disabled-preview.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="禁用态"
        description="对比禁用空白态与禁用回显态，统一确认禁用时不再出现遮罩。"
      >
        <DocsDemoRenderer path="@/zh/demos/signature/disabled-state.vue" />
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
