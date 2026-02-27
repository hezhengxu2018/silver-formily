---
layout: home
page: true

hero:
  name: Silver Formily Element Plus
  image:
    src: /logo.svg
    alt: Silver Formily Element Plus
  tagline: 另一个 @formily/element-plus 组件库
  actions:
    - theme: alt
      text: 指南
      link: ./guide/introduction
    - theme: brand
      text: 快速开始
      link: ./component/quick-start

features:
  - title: 💡 融合的组件风格
    details: 在组件风格上更倾向于Element Plus, 组件配置项更倾向于Formily，对两者冲突的配置项采取均衡的取舍，保证灵活性和风格的统一。
  - title: 🔌 自由的依赖版本
    details: formily及element-plus的版本都作为peerDependencies，可以根据项目需要选择自己需要的element-plus版本。
  - title: 🔑 完善的表单组件
    details: 补全element-plus的表单组件。同时添加额外的场景组件，满足各种业务场景。
  - title: ♿️  更好的A11y
    details: 提升组件的可访问性。提供更友好的组件访问支持及视觉反馈。
  - title: ✅ 补全的组件测试
    details: 接近100%的代码测试覆盖，保证组件质量及重构的信心。
  - title: 📝 基于Vue模板语法
    details: 所有组件完全基于Vue模板语法重构，提供更好的可读性及运行时的优化，使得代码更易维护，性能更好。
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
