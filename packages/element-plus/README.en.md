# @silver-formily/element-plus

[![npm version](https://img.shields.io/npm/v/@silver-formily/element-plus)](https://www.npmjs.com/package/@silver-formily/element-plus)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/element-plus)](https://www.npmjs.com/package/@silver-formily/element-plus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/element-plus/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/element-plus/README.en.md)

`@silver-formily/element-plus` is the Element Plus binding layer and scene-component set for Silver Formily. It aligns field runtime semantics and schema protocols with Element Plus component contracts, and provides higher-level primitives for array fields, form layout, popup-style forms, and preview rendering.

## Installation

```bash
pnpm add \
  @silver-formily/element-plus \
  @silver-formily/core \
  @silver-formily/grid \
  @silver-formily/json-schema \
  @silver-formily/reactive \
  @silver-formily/reactive-vue \
  @silver-formily/shared \
  @silver-formily/vue \
  @vueuse/core \
  'element-plus@^2.11.0' \
  'vue@^3.3.0'
```

The command includes required peer dependencies. Existing projects can keep dependencies that satisfy the declared ranges.

## Features

- base field components: `Input`, `Select`, `Checkbox`, `Radio`, `Switch`, `DatePicker`, `Upload`, and more
- array-field components: `ArrayTable`, `ArrayCards`, `ArrayTabs`, `ArrayCollapse`, `ArrayItems`
- layout and structure components: `FormItem`, `FormLayout`, `FormGrid`, `FormStep`, `FormTab`
- scene components: `FormDialog`, `FormDrawer`, `QueryForm`, `SelectTable`
- preview components: `PreviewText.*`

## Positioning

This package sits at the intersection of the Vue rendering layer and a concrete UI framework:

- it builds on top of `@silver-formily/vue`
- it consumes field semantics from `@silver-formily/core` and `@silver-formily/json-schema`
- it emits business-ready form primitives through the Element Plus component model

## TypeScript Types

Component props use a consistent public type model. `FooProps` represents the props
accepted by a component, including upstream Element Plus props, events, `v-model`
update events, and Silver Formily extensions:

```ts
import type { InputComponent, InputProps, SelectProps } from '@silver-formily/element-plus'
import { Input } from '@silver-formily/element-plus'

const inputComponent: InputComponent = Input
const inputProps: InputProps = { placeholder: 'Enter a value' }
const selectProps: SelectProps = {
  options: [{ label: 'Option one', value: 'one' }],
}
```

Use `FooComponent` when you need the component constructor type. The old `IFooProps`
names remain temporarily as deprecated compatibility aliases. When creating a wrapper
with `connect`, use its second type parameter to declare public props; runtime attrs,
event, and slot forwarding remains unchanged.

## Design Characteristics

- aligns Silver Formily field contracts with Element Plus props and events
- optimized for complex admin-facing forms
- ships reusable primitives for array fields and scenario-level form composition
- acts as the Silver Formily namespace implementation for `@formily/element-plus`

## Selection Object Values

All nine selection components support `optionAsValue` and `optionValueKeys`. The latter strictly projects output properties without modifying the data source; retain the identity property for display. Tree `optionFormatter` has been removed; migrate to `optionValueKeys`. Tree path mode does not apply projection.

## Documentation

- [Guide](https://element-plus.silver-formily.org/en/)
- [Project home](https://silver-formily.org/en/)
- [Source](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/element-plus)
- [Issues](https://github.com/hezhengxu2018/silver-formily/issues)

## License

[MIT](https://opensource.org/licenses/MIT)
