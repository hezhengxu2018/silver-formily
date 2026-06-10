# @silver-formily/vant

[简体中文](./README.md)

## Overview

`@silver-formily/vant` is the mobile-oriented Vant binding layer for Silver Formily. It connects field-runtime semantics and schema protocols to the Vant interaction model for H5, mobile, and touch-first form systems.

## Runtime Positioning

This package sits between the Vue rendering layer and a mobile UI framework:

- it uses `@silver-formily/vue` for rendering semantics
- it consumes field and schema semantics from `@silver-formily/core` and `@silver-formily/json-schema`
- it emits mobile-friendly form primitives through Vant components

## Public Surface

- base field components: `Input`, `Checkbox`, `Radio`, `Switch`, `Stepper`, `Slider`, `Signature`
- picker-style components: `Picker`, `PickerGroup`, `DatePicker`, `TimePicker`, `Area`, `TreeSelect`
- structure components: `FormItem`, `Form`, `FormStep`, `FormPopup`, `FormButtonGroup`
- action components: `Submit`, `Reset`
- preview components: `PreviewText.*`

## Design Characteristics

- optimized for mobile data-entry and touch interactions
- suitable for step forms, popup forms, and wheel-picker workflows
- serves as the Silver Formily replacement for the mobile-side `@formily/*` bindings

## Installation

```bash
pnpm add @silver-formily/vant @silver-formily/vue @silver-formily/core @silver-formily/json-schema @silver-formily/path @silver-formily/reactive @silver-formily/reactive-vue @silver-formily/shared vant vue dayjs
```

## Documentation

- Docs: <https://vant.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
