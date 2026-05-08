<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="PreviewText 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="阅读态"
        description="Form 或 Field 进入 readPretty 后，已接入的组件会自动切换到对应的 PreviewText 展示。"
      >
        <DocsDemoRenderer path="@/zh/demos/preview-text/read-pretty.vue" />
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
