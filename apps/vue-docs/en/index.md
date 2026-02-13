---
layout: home
page: true

hero:
  name: Silver Formily Vue
  image:
    src: /logo.svg
    alt: Silver Formily Vue
  tagline: A Vue 3-focused wrapper around @formily/vue
  actions:
    - theme: alt
      text: Guide
      link: ./guide/
    - theme: brand
      text: Get Started
      link: ./api/components/field

features:
  - title: 💡 Vue 3-first Formily binding
    details: A lean rewrite that drops the legacy Vue 2 adapters and extra DOM wrappers, resulting in cleaner markup and fewer dependencies.
  - title: 📝 Stronger typings
    details: Compared to @formily/vue you get richer TypeScript hints, so composing complex schemas stays ergonomic.
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
