<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="移动端预览" left-text="返回" />

    <div class="mobile-page__body">
      <MobileDemoSection title="示例代码">
        <DocsDemoRenderer path="@/zh/demos/quick-start/basic.vue" />
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
