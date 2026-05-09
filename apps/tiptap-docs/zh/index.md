---
layout: home
page: true

hero:
  name: Silver Formily Tiptap
  tagline: 基于 Tiptap 的富文本字段封装与预览站
  actions:
    - theme: brand
      text: 快速开始
      link: ./component/quick-start
    - theme: alt
      text: 组件预览
      link: ./component/rich-text

features:
  - title: Headless 但不难用
    details: 基于 Tiptap 做了适合 Formily 字段的默认封装，既能开箱即用，也能继续扩展。
  - title: 同时支持 HTML / JSON
    details: 第一版就支持常见的 HTML 输出和结构化 JSON 输出，方便不同业务做持久化。
  - title: 自带只读预览态
    details: 支持 Formily 的 readPretty 模式，编辑态和展示态都能在文档站里直接预览。
  - title: 不绑定特定 UI 库
    details: 包本身不依赖 Element Plus，后续可以更轻松地接不同的设计系统。
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #f97316 20%, #7c3aed 80%);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #fb923c 50%, #8b5cf6 50%);
  --vp-home-hero-image-filter: blur(48px);
}
</style>
