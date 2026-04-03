<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="FormPopup 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="基础表单弹层"
        description="FormPopup 会自动创建 form、注入 FormProvider，并在确认后默认返回 form.values。"
      >
        <DocsDemoRenderer path="@/zh/demos/form-popup/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="作用域插槽与 middleware"
        description="通过 header / footer 作用域插槽和 resolve(type?)，可以快速封装出接近 FormDialog / FormDrawer 的调用心智。"
      >
        <DocsDemoRenderer path="@/zh/demos/form-popup/middleware.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="Picker 风格头部"
        description="通过 header 插槽把取消和确定都挪到顶部，可以封装出更接近 Vant Picker 工具栏的交互形态。"
      >
        <DocsDemoRenderer path="@/zh/demos/form-popup/picker-like.vue" />
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
