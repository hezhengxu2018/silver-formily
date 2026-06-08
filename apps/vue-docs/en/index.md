---
layout: home
page: true

hero:
  name: Silver Formily Vue
  image:
    src: /logo.svg
    alt: Silver Formily Vue
  tagline: The Vue 3 form runtime for the Silver Formily stack
  actions:
    - theme: alt
      text: Guide
      link: ./guide/
    - theme: brand
      text: Get Started
      link: ./api/components/field

features:
  - title: 💡 Vue 3 runtime for Silver Formily
    details: Starting with 3.x, package names, dependencies, demos, and docs all move to the `@silver-formily/*` namespace, so this site documents the Silver Formily stack by default.
  - title: 📝 Stronger typings
    details: Companion packages such as core, json-schema, reactive, and reactive-vue now evolve together, keeping the TypeScript surface more consistent.
  - title: ✅ SSR-ready
    details: Fixes the rendering glitches that happen in the upstream repo under SSR and keeps hydration predictable.
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
