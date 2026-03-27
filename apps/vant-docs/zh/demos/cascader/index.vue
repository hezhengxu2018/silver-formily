<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Cascader 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection title="基础使用">
        <DocsDemoRenderer path="@/zh/demos/cascader/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义标题与选项"
        description="通过 title / option 插槽可以把级联面板做得更像移动端业务选择器，而不是单纯的树路径列表。"
      >
        <DocsDemoRenderer path="@/zh/demos/cascader/slot.vue" />
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
