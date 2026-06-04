---
layout: home

hero:
  name: Silver Formily Core
  tagline: 独立维护的 @formily/core
  image:
    src: /logo.svg
    alt: Silver Formily Element Plus
  actions:
    - theme: brand
      text: 指南
      link: /guide/
    - theme: alt
      text: API文档
      link: /api/entry/createForm

features:
  - title: 🚀 超高的性能
    details: 依赖追踪，高效更新，按需渲染。基于 @silver-formily/reactive 的响应式系统，自动收集依赖并在状态变更时精准通知。
  - title: ♻️ 极佳的复用性
    details: 副作用独立，逻辑可拔插。生命周期 Hook 与组件解耦，同一段联动逻辑可在不同 UI 框架间复用。
  - title: 🔗 优雅的联动写法
    details: 灵活、完备、优雅。支持主动联动和被动联动两种模式，覆盖一对一、一对多、多对一等各种联动场景。
  - title: 🧩 完备的领域模型
    details: 跨终端，跨框架，UI 无关。提供 Field、ArrayField、ObjectField、VoidField 四种字段模型，覆盖所有表单场景。
  - title: 🔍 友好的调试体验
    details: 天然对接 Formily DevTools，可视化表单结构和状态变化，大幅降低调试成本。
  - title: ✨ 完美的智能提示
    details: 拥抱 TypeScript，为所有 API 提供精确的类型定义和泛型支持。
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
