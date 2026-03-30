<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="Picker 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection title="基础使用">
        <DocsDemoRenderer path="@/zh/demos/picker/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="多列选择"
        description="当 dataSource 是二维数组时，会自动切换成多列 Picker，并把字段值保存成数组。"
      >
        <DocsDemoRenderer path="@/zh/demos/picker/multiple.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="级联选择"
        description="根列选项带 children 时，会沿当前路径继续展开后续列，但交互仍然保持官方 Picker 的滚轮形式。"
      >
        <DocsDemoRenderer path="@/zh/demos/picker/cascade.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义字段名">
        <DocsDemoRenderer path="@/zh/demos/picker/field-names.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义展示文案">
        <DocsDemoRenderer path="@/zh/demos/picker/display-format.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义插槽"
        description="这个示例会同时用到 title、cancel、confirm、option、columns-top、columns-bottom 插槽，方便确认封装后的 slot 已全部透传。"
      >
        <DocsDemoRenderer path="@/zh/demos/picker/slot.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义弹出位置">
        <DocsDemoRenderer path="@/zh/demos/picker/popup-position.vue" />
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
