# @silver-formily/element-plus

[简体中文](./README.md)

## Overview

`@silver-formily/element-plus` is the Element Plus binding layer and scene-component set for Silver Formily. It aligns field runtime semantics and schema protocols with Element Plus component contracts, and provides higher-level primitives for array fields, form layout, popup-style forms, and preview rendering.

## Runtime Positioning

This package sits at the intersection of the Vue rendering layer and a concrete UI framework:

- it builds on top of `@silver-formily/vue`
- it consumes field semantics from `@silver-formily/core` and `@silver-formily/json-schema`
- it emits business-ready form primitives through the Element Plus component model

## Public Surface

- base field components: `Input`, `Select`, `Checkbox`, `Radio`, `Switch`, `DatePicker`, `Upload`, and more
- array-field components: `ArrayTable`, `ArrayCards`, `ArrayTabs`, `ArrayCollapse`, `ArrayItems`
- layout and structure components: `FormItem`, `FormLayout`, `FormGrid`, `FormStep`, `FormTab`
- scene components: `FormDialog`, `FormDrawer`, `QueryForm`, `SelectTable`
- preview components: `PreviewText.*`

## Design Characteristics

- aligns Silver Formily field contracts with Element Plus props and events
- optimized for complex admin-facing forms
- ships reusable primitives for array fields and scenario-level form composition
- acts as the Silver Formily namespace implementation for `@formily/element-plus`

## Installation

```bash
pnpm add @silver-formily/element-plus @silver-formily/vue @silver-formily/core @silver-formily/json-schema @silver-formily/reactive @silver-formily/reactive-vue @silver-formily/shared @silver-formily/grid element-plus vue
```

## Documentation

- Docs: <https://element-plus.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
