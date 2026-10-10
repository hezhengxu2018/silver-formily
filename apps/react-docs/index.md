---
layout: home
page: true

hero:
  name: Silver Formily React
  image:
    src: /logo.svg
    alt: Silver Formily React
  tagline: Silver Formily 体系下的 React 18/19 表单运行时
  actions:
    - theme: alt
      text: 指南
      link: ./guide/
    - theme: brand
      text: 快速开始
      link: ./api/components/field

features:
  - title: 💡 面向 Silver Formily 的 React 18/19 运行时
    details: 迁移自 @formily/react 并围绕 @silver-formily/* 命名空间重构，与 Silver Formily 生态的 core、json-schema、reactive 协作。
  - title: 📝 JSON Schema 驱动
    details: 支持 Markup Schema 与 JSON Schema 两种渲染方式，配合 RecursionField 可以构建任意递归的自定义组件。
  - title: ✅ StrictMode / ConcurrentMode 友好
    details: 字段挂载与副作用订阅基于 @silver-formily/reactive-react 的兼容层实现，在 React 18/19 严格模式下行为正确。
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
