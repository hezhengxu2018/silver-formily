---
layout: home
page: true

hero:
  name: Silver Formily Vue
  image:
    src: /logo.svg
    alt: Silver Formily Vue
  tagline: Silver Formily 体系下的 Vue 3 表单运行时
  actions:
    - theme: alt
      text: 指南
      link: ./guide/
    - theme: brand
      text: 快速开始
      link: ./api/components/field

features:
  - title: 💡 面向 Silver Formily 的 Vue 3 运行时
    details: 从 3.x 开始，包名、依赖、示例和文档已经全面迁移到 @silver-formily/* 命名空间，默认围绕 Silver Formily 生态协作。
  - title: 📝 更完善的类型提示
    details: 基于仓库内配套的 core、json-schema、reactive 与 reactive-vue 提供更一致的类型体验与更清晰的维护边界。
  - title: ✅ 完善的SSR支持
    details: 修复官方仓库在SSR下的渲染错误，添加对SSR的支持。
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
