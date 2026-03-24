---
layout: home
page: true

hero:
  name: Silver Formily Vant
  image:
    src: /logo.svg
    alt: Silver Formily Vant
  tagline: 基于 Vant 4.x 的 formily 封装库
  actions:
    - theme: alt
      text: 组件总览
      link: ./component/quick-start
    - theme: brand
      text: 快速开始
      link: ./component/quick-start

features:
  - title: 📱 移动端表单体验
    details: 围绕 Vant 的移动端交互习惯封装 Form、FormItem、Input、Submit、Reset 和 FormButtonGroup，让表单结构和按钮区更适合手机场景。
  - title: 🧠 保持 Formily 为核心
    details: 校验、提交、字段状态仍由 Formily 负责，避免把两套表单逻辑混在一起，同时继续保留 schema 与实例驱动的能力。
  - title: 🎛️ 统一的布局语义
    details: 表单级配置会继承到 FormItem，支持 labelWidth、labelAlign、inputAlign、showError、showErrorMessage、disabled、readonly 等常见布局与状态控制。
  - title: 📌 面向操作区的按钮封装
    details: 内置 Submit、Reset、FormButtonGroup 和 FormButtonGroup.Sticky，覆盖垂直、水平、紧凑和吸底等移动端常见按钮布局。
  - title: ✅ 可验证的文档示例
    details: 所有核心能力都配有独立 demo，提交结果统一通过 prompts-js 展示，方便直接在移动端预览里验证交互行为。
  - title: 🧩 渐进式补全组件
    details: 当前优先把 Vant 与 Formily 的职责边界梳顺，在最小骨架可用的基础上持续补充移动端常用表单组件。
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
