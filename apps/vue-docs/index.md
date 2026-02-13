---
layout: home
page: true

hero:
  name: Silver Formily Vue
  image:
    src: /logo.svg
    alt: Silver Formily Vue
  tagline: Vue3 的 @formily/vue 封装
  actions:
    - theme: alt
      text: 指南
      link: ./guide/
    - theme: brand
      text: 快速开始
      link: ./api/components/field

features:
  - title: 💡 使用 Vue3 重构的 Formily 封装
    details: 没有历史包袱的重构，精简源码与过时的依赖。同时也带来了更干净的DOM结构。
  - title: 📝 更完善的类型提示
    details: 与 @formily/vue 相比提供了更完善的类型提示，提供更好的开发体验。
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
