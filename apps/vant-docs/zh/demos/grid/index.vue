<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Grid 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection title="直接放字段节点">
        <DocsDemoRenderer path="@/zh/demos/grid/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="使用 GridColumn 控制跨列">
        <DocsDemoRenderer path="@/zh/demos/grid/item.vue" />
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
