<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="FormItem 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection title="基础使用">
        <DocsDemoRenderer path="@/zh/demos/form-item/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="直接使用">
        <DocsDemoRenderer path="@/zh/demos/form-item/manual-feedback.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="边框与说明">
        <DocsDemoRenderer path="@/zh/demos/form-item/border-extra.vue" />
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
