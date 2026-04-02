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
        title="只读回显"
        description="字段已有签名时，会自动把签名内容同步回画布用于展示。"
      >
        <DocsDemoRenderer path="@/zh/demos/signature/readonly.vue" />
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
