<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Submit 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection title="基础提交">
        <DocsDemoRenderer path="@/zh/demos/submit/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="加载态">
        <DocsDemoRenderer path="@/zh/demos/submit/loading.vue" />
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
