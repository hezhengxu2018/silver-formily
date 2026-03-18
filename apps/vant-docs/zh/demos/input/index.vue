<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Input 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection title="基础输入">
        <DocsDemoRenderer path="@/zh/demos/input/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="预览态">
        <DocsDemoRenderer path="@/zh/demos/input/read-pretty.vue" />
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
