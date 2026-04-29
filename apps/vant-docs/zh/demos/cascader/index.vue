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
        title="中国省市区数据"
        description="直接使用 @vant/area-data 提供的 useCascaderAreaData，与官方文档的省市区示例保持一致。"
      >
        <DocsDemoRenderer path="@/zh/demos/cascader/area-data.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义颜色">
        <DocsDemoRenderer path="@/zh/demos/cascader/custom-color.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="异步加载选项"
        description="保持和官方示例一致的交互结构：选择第一层后再异步补齐下一层数据。"
      >
        <DocsDemoRenderer path="@/zh/demos/cascader/async-options.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义字段名">
        <DocsDemoRenderer path="@/zh/demos/cascader/field-names.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义选项上方内容">
        <DocsDemoRenderer path="@/zh/demos/cascader/options-top.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义标题与选项"
        description="这个示例是基于官方 slot 能力再往前走一步，演示 title / option 这类更业务化的自定义方式。"
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
