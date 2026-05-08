<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="DatePicker 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="基础使用"
        description="点击字段后弹出 Vant DatePicker，只有点击确认才会真正写回字段值。"
      >
        <DocsDemoRenderer path="@/zh/demos/date-picker/basic.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="自定义列类型"
        description="可以像官方组件一样切到年-月、月-日等列组合，字段值仍然保持字符串。"
      >
        <DocsDemoRenderer path="@/zh/demos/date-picker/columns-type.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="format 与 value-format"
        description="`format` 控制字段展示文本，`value-format` 控制真正写回表单的字符串格式；滚轮变更后仍然需要点击弹层里的确认按钮才会写回。"
      >
        <DocsDemoRenderer path="@/zh/demos/date-picker/display-format.vue" />
      </MobileDemoSection>

      <MobileDemoSection title="自定义弹出位置">
        <DocsDemoRenderer path="@/zh/demos/date-picker/popup-position.vue" />
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
