# @silver-formily/vant

[![npm version](https://img.shields.io/npm/v/@silver-formily/vant)](https://www.npmjs.com/package/@silver-formily/vant)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/vant)](https://www.npmjs.com/package/@silver-formily/vant)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/vant/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/vant/README.en.md)

`@silver-formily/vant` is the mobile-oriented Vant binding layer for Silver Formily. It connects field-runtime semantics and schema protocols to the Vant interaction model for H5, mobile, and touch-first form systems.

## Installation

```bash
pnpm add \
  @silver-formily/vant \
  @silver-formily/core \
  @silver-formily/json-schema \
  @silver-formily/path \
  @silver-formily/reactive \
  @silver-formily/reactive-vue \
  @silver-formily/shared \
  @silver-formily/vue \
  'dayjs@^1' \
  'vant@^4.9.22' \
  'vue@^3.3.0'
```

The command includes required peer dependencies. Existing projects can keep dependencies that satisfy the declared ranges.

## Features

- base field components: `Input`, `Checkbox`, `Radio`, `Switch`, `Stepper`, `Slider`, `Signature`
- picker-style components: `Picker`, `PickerGroup`, `DatePicker`, `TimePicker`, `Area`, `TreeSelect`
- structure components: `FormItem`, `Form`, `FormStep`, `FormPopup`, `FormButtonGroup`
- action components: `Submit`, `Reset`
- preview components: `PreviewText.*`

## Positioning

This package sits between the Vue rendering layer and a mobile UI framework:

- it uses `@silver-formily/vue` for rendering semantics
- it consumes field and schema semantics from `@silver-formily/core` and `@silver-formily/json-schema`
- it emits mobile-friendly form primitives through Vant components

## TypeScript Types

Component props use a consistent public interface model. `FooProps` represents props,
events, and `v-model` update events accepted by consumers. Use the corresponding
`FooComponent` when you need a component constructor type:

```ts
import type { InputComponent, InputProps } from '@silver-formily/vant'
import { Input } from '@silver-formily/vant'

const inputComponent: InputComponent = Input
const inputProps: InputProps = {
  type: 'text',
  formatter: value => value.trim(),
}
```

When creating a custom wrapper with `connect`, use its second type parameter to declare
public props. This only changes TypeScript inference; runtime attrs, event, and slot
forwarding remains unchanged.

## Design Characteristics

- optimized for mobile data-entry and touch interactions
- suitable for step forms, popup forms, and wheel-picker workflows
- serves as the Silver Formily replacement for the mobile-side `@formily/*` bindings

## Usage Notes

`FormPopup` shows loading when asynchronous `forOpen` middleware takes more than 100ms. Use `loadingText` to customize the message. Loading is cleaned up on completion, failure, or closure.

## Documentation

- [Guide](https://vant.silver-formily.org/en/)
- [Project home](https://silver-formily.org/en/)
- [Source](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/vant)
- [Issues](https://github.com/hezhengxu2018/silver-formily/issues)

## License

[MIT](https://opensource.org/licenses/MIT)
