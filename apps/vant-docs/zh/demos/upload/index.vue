<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Upload 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="基础使用"
        description="只维护 fileList，并通过 formatValue 生成最终表单值。"
      >
        <DocsDemoRenderer path="@/zh/demos/upload/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自动上传"
        description="配置 action 或 httpRequest 后，字段值会在上传成功后再同步。"
      >
        <DocsDemoRenderer path="@/zh/demos/upload/async-upload.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="阅读态"
        description="readPretty 下会自动切换到 PreviewText.Upload 展示文件列表。"
      >
        <DocsDemoRenderer path="@/zh/demos/upload/read-pretty.vue" />
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
