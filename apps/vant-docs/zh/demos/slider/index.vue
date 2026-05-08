<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Slider 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="基础使用"
        description="通过 modelValue 绑定当前值，并通过提交按钮查看表单结果。"
      >
        <DocsDemoRenderer path="@/zh/demos/slider/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="双滑块"
        description="开启 range 后，字段值会切换为 [number, number]。"
      >
        <DocsDemoRenderer path="@/zh/demos/slider/range.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="指定选择范围"
        description="通过 min 和 max 控制滑块的可选区间。"
      >
        <DocsDemoRenderer path="@/zh/demos/slider/custom-range.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="禁用"
        description="禁用状态下会保留当前值展示，但不允许继续调整。"
      >
        <DocsDemoRenderer path="@/zh/demos/slider/disabled.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="指定步长"
        description="通过 step 控制每次拖动时的变化粒度。"
      >
        <DocsDemoRenderer path="@/zh/demos/slider/step.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义样式"
        description="通过 barHeight、activeColor 等属性调整滑块的视觉样式。"
      >
        <DocsDemoRenderer path="@/zh/demos/slider/custom-style.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义按钮"
        description="通过 button 插槽自定义滑块按钮内容。"
      >
        <DocsDemoRenderer path="@/zh/demos/slider/custom-button.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="垂直方向"
        description="设置 vertical 后，滑块会按父容器高度垂直展示。"
      >
        <DocsDemoRenderer path="@/zh/demos/slider/vertical.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="只读状态"
        description="这是 Formily 封装额外补充的只读场景示例，支持 readonly 和 readOnly。"
      >
        <DocsDemoRenderer path="@/zh/demos/slider/readonly.vue" />
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
