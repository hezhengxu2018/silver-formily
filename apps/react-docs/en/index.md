---
layout: home
page: true

hero:
  name: Silver Formily React
  image:
    src: /logo.svg
    alt: Silver Formily React
  tagline: React 18/19 form runtime for the Silver Formily ecosystem
  actions:
    - theme: alt
      text: Guide
      link: ./guide/
    - theme: brand
      text: Get Started
      link: ./api/components/field

features:
  - title: 💡 React 18/19 runtime for Silver Formily
    details: Migrated from @formily/react and refactored around the @silver-formily/* namespace, working with core, json-schema and reactive from the Silver Formily ecosystem.
  - title: 📝 JSON Schema driven
    details: Supports both Markup Schema and JSON Schema rendering, and with RecursionField you can build arbitrary recursive custom components.
  - title: ✅ StrictMode / ConcurrentMode friendly
    details: Field mounting and effect subscriptions are built on the compatibility layer of @silver-formily/reactive-react, behaving correctly under React 18/19 Strict Mode.
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
