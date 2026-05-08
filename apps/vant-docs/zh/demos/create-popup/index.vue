<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="createPopup 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="最小自定义组件"
        description="传入任意会触发 confirm(payload) 的组件后，createPopup 会把 payload 直接作为 Promise 结果返回。"
      >
        <DocsDemoRenderer path="@/zh/demos/create-popup/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="包装官方 Picker"
        description="包装官方 VanPicker 时，不需要手动维护 Popup，也不需要把内部 update:modelValue 再往外同步。"
      >
        <DocsDemoRenderer path="@/zh/demos/create-popup/picker.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="包装官方 DatePicker"
        description="对于带 confirm 的日期滚轮组件，同样可以直接拿到官方 confirm 事件的原始 payload。"
      >
        <DocsDemoRenderer path="@/zh/demos/create-popup/date-picker.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="弹出式分步表单"
        description="createPopup 负责弹层外壳，FormStep 负责步骤切换和最终提交，适合做分段填写的移动端弹窗。"
      >
        <DocsDemoRenderer path="@/zh/demos/create-popup/form-step.vue" />
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
