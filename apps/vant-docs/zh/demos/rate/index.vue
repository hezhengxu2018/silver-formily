<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Rate 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="基础使用"
        description="通过 modelValue 绑定当前评分值，并通过提交按钮弹窗查看字段结果。"
      >
        <DocsDemoRenderer path="@/zh/demos/rate/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义图标"
        description="通过 icon 和 voidIcon 自定义选中与未选中的图标。"
      >
        <DocsDemoRenderer path="@/zh/demos/rate/custom-icon.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义样式"
        description="通过 size、color、voidColor 等属性调整评分组件的视觉样式。"
      >
        <DocsDemoRenderer path="@/zh/demos/rate/custom-style.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="半星"
        description="开启 allowHalf 后可以录入半星评分。"
      >
        <DocsDemoRenderer path="@/zh/demos/rate/allow-half.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义数量"
        description="通过 count 自定义评分图标总数。"
      >
        <DocsDemoRenderer path="@/zh/demos/rate/custom-count.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="可清空"
        description="开启 clearable 后，再次点击当前值可以重置为 0。"
      >
        <DocsDemoRenderer path="@/zh/demos/rate/clearable.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="禁用状态"
        description="通过 disabled 禁用评分交互。"
      >
        <DocsDemoRenderer path="@/zh/demos/rate/disabled.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="只读状态"
        description="通过 readonly 将评分设置为只读状态。"
      >
        <DocsDemoRenderer path="@/zh/demos/rate/readonly.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="只读状态显示小数"
        description="搭配 readonly 和 allowHalf，可以展示任意小数结果。"
      >
        <DocsDemoRenderer path="@/zh/demos/rate/readonly-decimal.vue" />
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
