---
layout: home

hero:
  name: Silver Formily Core
  tagline: Framework-agnostic form state management engine
  image:
    src: /logo.svg
    alt: Silver Formily Element Plus
  actions:
    - theme: brand
      text: Main Docs
      link: https://vue.silver-formily.org/
    - theme: alt
      text: Core Docs
      link: /en/guide/

features:
  - title: 🚀 High Performance
    details: Dependency tracking, efficient updates, render-on-demand. Built on @silver-formily/reactive — auto-collects dependencies and delivers precise notifications.
  - title: ♻️ Excellent Reusability
    details: Side effects are isolated, logic is pluggable. Lifecycle hooks are decoupled from components — the same linkage logic works across UI frameworks.
  - title: 🔗 Elegant Linkage Syntax
    details: Flexible, comprehensive, elegant. Supports both active and passive linkage patterns, covering one-to-one, one-to-many, and many-to-one scenarios.
  - title: 🧩 Complete Domain Model
    details: Cross-platform, cross-framework, UI-agnostic. Four field models — Field, ArrayField, ObjectField, VoidField — cover every form scenario.
  - title: 🔍 Friendly Debugging
    details: Native Formily DevTools integration for visualizing form structure and state changes, dramatically reducing debugging effort.
  - title: ✨ Perfect TypeScript Support
    details: Fully embraces TypeScript with precise type definitions and generic support for every API.
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
