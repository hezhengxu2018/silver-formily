<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Reset 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection title="基础重置">
        <DocsDemoRenderer path="@/zh/demos/reset/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="重置后校验">
        <DocsDemoRenderer path="@/zh/demos/reset/validate.vue" />
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
