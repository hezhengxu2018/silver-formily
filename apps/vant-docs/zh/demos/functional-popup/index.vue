<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="FunctionalPopup 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="最小自定义组件"
        description="传入任意会触发 confirm(payload) 的组件后，FunctionalPopup 会把 payload 直接作为 Promise 结果返回。"
      >
        <DocsDemoRenderer path="@/zh/demos/functional-popup/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="包装官方 Picker"
        description="包装官方 VanPicker 时，不需要手动维护 Popup，也不需要把内部 update:modelValue 再往外同步。"
      >
        <DocsDemoRenderer path="@/zh/demos/functional-popup/picker.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="包装官方 DatePicker"
        description="对于带 confirm 的日期滚轮组件，同样可以直接拿到官方 confirm 事件的原始 payload。"
      >
        <DocsDemoRenderer path="@/zh/demos/functional-popup/date-picker.vue" />
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
