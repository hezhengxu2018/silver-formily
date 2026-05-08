<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Form 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection title="基础使用">
        <DocsDemoRenderer path="@/zh/demos/form/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="统一标签冒号">
        <DocsDemoRenderer path="@/zh/demos/form/colon.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="标签对齐">
        <DocsDemoRenderer path="@/zh/demos/form/label-align.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="输入对齐">
        <DocsDemoRenderer path="@/zh/demos/form/input-align.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="错误样式开关">
        <DocsDemoRenderer path="@/zh/demos/form/show-error.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="错误文案开关">
        <DocsDemoRenderer path="@/zh/demos/form/show-error-message.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="错误文案对齐">
        <DocsDemoRenderer path="@/zh/demos/form/error-message-align.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="禁用与只读">
        <DocsDemoRenderer path="@/zh/demos/form/disabled-readonly.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="Formily 实例切换状态">
        <DocsDemoRenderer path="@/zh/demos/form/formily-instance.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自动滚动到错误项">
        <DocsDemoRenderer path="@/zh/demos/form/scroll-to-error.vue" />
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
