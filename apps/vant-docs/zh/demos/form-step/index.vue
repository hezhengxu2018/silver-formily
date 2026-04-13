<script setup lang="ts">
import { NavBar } from 'vant'
</script>

<template>
  <div class="mobile-page">
    <NavBar title="FormStep 预览" />
    <div class="mobile-page__body">
      <MobileDemoSection
        title="Markup Schema"
        description="通过 SchemaVoidField 和 FormStep.StepPane 把移动端信息收集拆成三步，适合地址、预约、开户这类分段填写流程。"
      >
        <DocsDemoRenderer path="@/zh/demos/form-step/markup-schema.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="JSON Schema"
        description="同样的分步能力也可以直接放进 JSON Schema，用于后端返回 Schema 或统一配置驱动场景。"
      >
        <DocsDemoRenderer path="@/zh/demos/form-step/json-schema.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="内部创建实例"
        description="不传 formStep 时，也可以在 FormStep 子树里通过 useFormStep() 获取内部创建的实例来完成步骤切换。"
      >
        <DocsDemoRenderer path="@/zh/demos/form-step/internal-instance.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="隐藏步骤条"
        description="通过 hideSteps 隐藏顶部 Steps，只保留步骤内容区和导航按钮。"
      >
        <DocsDemoRenderer path="@/zh/demos/form-step/hide-steps.vue" />
      </MobileDemoSection>

      <MobileDemoSection
        title="插槽自定义渲染"
        description="演示如何通过 x-content 分别自定义步骤标题和不同状态下的图标内容。"
      >
        <DocsDemoRenderer path="@/zh/demos/form-step/slot.vue" />
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
