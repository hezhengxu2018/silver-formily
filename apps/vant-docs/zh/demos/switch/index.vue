<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Switch 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="基础使用"
        description="通过 modelValue 绑定布尔开关值，并通过提交按钮查看表单结果。"
      >
        <DocsDemoRenderer path="@/zh/demos/switch/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义开关值"
        description="通过 activeValue 和 inactiveValue 将字段值映射为任意业务语义。"
      >
        <DocsDemoRenderer path="@/zh/demos/switch/custom-value.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="禁用状态"
        description="禁用后仍会保留当前状态展示，但不会继续响应点击。"
      >
        <DocsDemoRenderer path="@/zh/demos/switch/disabled.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="加载状态"
        description="通过 loading 展示加载态，适合等待异步结果时占位展示。"
      >
        <DocsDemoRenderer path="@/zh/demos/switch/loading.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义大小"
        description="通过 size 调整开关尺寸，适合更紧凑的列表场景。"
      >
        <DocsDemoRenderer path="@/zh/demos/switch/custom-size.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义颜色"
        description="通过 activeColor 和 inactiveColor 调整开关的主题色。"
      >
        <DocsDemoRenderer path="@/zh/demos/switch/custom-color.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义按钮"
        description="通过 node 插槽在按钮内渲染图标或自定义内容。"
      >
        <DocsDemoRenderer path="@/zh/demos/switch/custom-node.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="异步控制"
        description="在确认通过后再手动写回字段值，适合关键状态切换。"
      >
        <DocsDemoRenderer path="@/zh/demos/switch/async-control.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="搭配单元格使用"
        description="可以将开关放到 Cell 的右侧区域，形成更贴近移动端设置页的布局。"
      >
        <DocsDemoRenderer path="@/zh/demos/switch/cell.vue" />
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
