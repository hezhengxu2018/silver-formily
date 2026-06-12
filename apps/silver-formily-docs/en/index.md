---
layout: home
pageClass: portal-home

hero:
  name: Silver Formily Docs
  text: A teaching portal for the whole ecosystem
  tagline: Learn the ecosystem through a guided path, from runtime models and schema semantics to Vue bindings and UI integrations.
  image:
    src: /logo.svg
    alt: Silver Formily Docs
  actions:
    - theme: brand
      text: Vue Docs
      link: https://vue.silver-formily.org/en/
    - theme: alt
      text: Core Docs
      link: https://core.silver-formily.org/en/
    - theme: alt
      text: GitHub
      link: https://github.com/hezhengxu2018/silver-formily

features:
  - title: Teaching First
    details: This site explains why the ecosystem is structured this way, what to learn first, and where each child site fits.
  - title: Clear Layering
    details: The portal highlights the Foundation, Framework, and UI Binding layers so the architecture feels predictable instead of scattered.
  - title: Cross-site Navigation
    details: Use one entry point to move from conceptual pages into the right child docs, without guessing which site owns the detail.
  - title: Source-aware
    details: The learning path stays close to real package boundaries, making it easier to jump back to source and tests.
---

## Recommended Reading Order

If you are new to Silver Formily, this sequence keeps the mental model clean without relying on extra portal pages:

1. Start with the [Vue docs site](https://vue.silver-formily.org/en/) for Vue-side adoption, SchemaField, and commonly used hooks.
2. Continue with the [Core docs site](https://core.silver-formily.org/en/) to understand Form, Field, Query, and effect orchestration.
3. Move to the [JSON Schema docs site](https://json-schema.silver-formily.org/en/) when you need the exact schema contracts and protocol details.
4. Finish with Element Plus or Vant docs when you need concrete UI bindings for your stack.

## Ecosystem Matrix

<SiteMatrix />

## Reading Tips

### If you are adopting Silver Formily for the first time

- If your project is built on Vue 3, the [Vue docs site](https://vue.silver-formily.org/en/) is the best first child site to read in depth.
- If you care more about the runtime model first, begin with [Core](https://core.silver-formily.org/en/) and [Reactive](https://reactive.silver-formily.org/en/).

### If you are mapping architecture

- Use the ecosystem matrix below to identify whether your project depends on the Foundation, Framework, or UI Binding layer.
- Then jump straight to the matching child docs instead of maintaining duplicate portal pages.
