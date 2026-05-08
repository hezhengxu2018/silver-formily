<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="FormButtonGroup 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection title="垂直布局">
        <DocsDemoRenderer path="@/zh/demos/form-button-group/vertical.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="水平布局">
        <DocsDemoRenderer path="@/zh/demos/form-button-group/horizontal.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="紧凑布局">
        <DocsDemoRenderer path="@/zh/demos/form-button-group/compact.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="粘性布局">
        <DocsDemoRenderer path="@/zh/demos/form-button-group/sticky.vue" />
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
