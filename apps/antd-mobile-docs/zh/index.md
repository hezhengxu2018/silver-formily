---
layout: home
page: true

hero:
  name: Silver Formily Antd Mobile
  image:
    src: /logo.svg
    alt: Silver Formily Antd Mobile
  tagline: 基于 antd-mobile v5 的 formily 封装库
  actions:
    - theme: alt
      text: 组件总览
      link: ./component/quick-start
    - theme: brand
      text: 快速开始
      link: ./component/quick-start

features:
  - title: 🤝 统一的封装设计
    details: 代码的风格保证和大部分 formily 组件库一致。
  - title: ⭐ 现代化的封装
    details: 基于 antd-mobile v5 与 React 18/19 封装，没有历史包袱。
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
