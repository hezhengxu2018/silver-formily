<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Stepper 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="基础使用"
        description="通过 modelValue 绑定数量，并通过提交按钮查看表单结果。"
      >
        <DocsDemoRenderer path="@/zh/demos/stepper/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="指定步长"
        description="通过 step 控制每次点击时的增减粒度。"
      >
        <DocsDemoRenderer path="@/zh/demos/stepper/step.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="限制范围"
        description="通过 min 和 max 约束可选区间，到达边界后按钮会自动禁用。"
      >
        <DocsDemoRenderer path="@/zh/demos/stepper/limit.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="限制输入整数"
        description="通过 integer 将输入内容限制为整数。"
      >
        <DocsDemoRenderer path="@/zh/demos/stepper/integer.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="禁用状态"
        description="通过 disabled 禁用整个步进器。"
      >
        <DocsDemoRenderer path="@/zh/demos/stepper/disabled.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="禁止输入框编辑"
        description="通过 disableInput 仅保留按钮增减能力。"
      >
        <DocsDemoRenderer path="@/zh/demos/stepper/disable-input.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="固定小数位数"
        description="通过 decimalLength 固定展示的小数位数。"
      >
        <DocsDemoRenderer path="@/zh/demos/stepper/decimal-length.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义大小"
        description="通过 inputWidth 和 buttonSize 调整步进器尺寸。"
      >
        <DocsDemoRenderer path="@/zh/demos/stepper/custom-size.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="异步变更"
        description="通过 beforeChange 在变更前做异步拦截，并展示加载反馈。"
      >
        <DocsDemoRenderer path="@/zh/demos/stepper/async-control.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="圆角风格"
        description="通过 theme=round 使用官方的圆角样式。"
      >
        <DocsDemoRenderer path="@/zh/demos/stepper/round-theme.vue" />
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
