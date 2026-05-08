<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="PasswordInput 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="基础使用"
        description="开启内置 keyboard 配置后，点击密码框会自动展开数字键盘，输入和收起都由组件内部接管。"
      >
        <DocsDemoRenderer path="@/zh/demos/password-input/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="禁用内置键盘"
        description="传入 keyboard: false 后不会自动展开内置键盘，组件会继续透出 focus 事件供业务接管输入流程。"
      >
        <DocsDemoRenderer path="@/zh/demos/password-input/disable-keyboard.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义长度"
        description="通过 length 可以调整密码格子的数量，也会同步限制内置数字键盘的最大输入长度。"
      >
        <DocsDemoRenderer path="@/zh/demos/password-input/custom-length.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="明文展示"
        description="验证码场景可以关闭 mask，直接显示输入内容。"
      >
        <DocsDemoRenderer path="@/zh/demos/password-input/plain-text.vue" />
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
