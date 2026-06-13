---
layout: home
page: true

hero:
  name: Silver Formily Element Plus
  image:
    src: /logo.svg
    alt: Silver Formily Element Plus
  tagline: A refined form component library built on top of `@formily/element-plus`
  actions:
    - theme: alt
      text: Guide
      link: ./guide/introduction
    - theme: brand
      text: Quick Start
      link: ./component/quick-start

features:
  - title: Integrated Component Design
    details: Visual behavior stays close to Element Plus, while configuration stays close to Formily. When the two pull in different directions, the library aims for practical trade-offs that preserve both flexibility and visual consistency.
  - title: Flexible Dependency Strategy
    details: Formily and Element Plus are both treated as peer dependencies, so you can choose the Element Plus version that best fits your project.
  - title: Broader Form Coverage
    details: The library fills in gaps in the Element Plus form component set and adds extra scenario-oriented components for real-world business cases.
  - title: Improved Accessibility
    details: Accessibility has been improved through friendlier interactions and clearer visual feedback.
  - title: Comprehensive Component Tests
    details: Code coverage is close to 100%, helping keep component quality high and refactors safe.
  - title: Rebuilt with Vue Templates
    details: Every component has been rebuilt with Vue template syntax for better readability, easier maintenance, more predictable runtime behavior, and better performance.
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
