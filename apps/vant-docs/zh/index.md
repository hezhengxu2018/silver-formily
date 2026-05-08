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
  - title: 🤝 兼容的封装设计
    details: 代码的风格保证和大部分 formily 组件库一致。拆分了FormItem 组件作为 decorator，更符合常规组件库的封装逻辑。
  - title: 🧩 统一的封装模式
    details: 在一些接口设计细节上与 formily 和 element-plus 封装库保存一致，降低了开发时的心智负担。
  - title: ✅ 完善的单测覆盖
    details: 90% 以上的单测覆盖，保证代码质量与重构信心。
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
