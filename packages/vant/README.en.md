# @silver-formily/vant

[简体中文](./README.md)

`@silver-formily/vant` is the mobile-focused Vant integration layer for Silver Formily. It connects the form runtime, schema descriptions, and Vant component model so you can build touch-friendly forms, step-based flows, popup forms, and other mobile-first experiences.

## What Kind Of Projects Is It For

- mobile or H5 form flows
- business input pages built on Vant
- step forms, popup forms, wheel pickers, and other mobile interaction patterns
- migrations from the `@formily/*` stack to `@silver-formily/*`

## What It Provides

- Basic fields: `Input`, `Checkbox`, `Radio`, `Switch`, `Stepper`, `Slider`, `Signature`
- Picker-style components: `Picker`, `PickerGroup`, `DatePicker`, `TimePicker`, `Area`, `TreeSelect`
- Form structure components: `FormItem`, `Form`, `FormStep`, `FormPopup`, `FormButtonGroup`
- Preview components: `PreviewText.*`
- Action components: `Submit` and `Reset`

## How It Fits Into Silver Formily

- `@silver-formily/core` provides field and form runtime state
- `@silver-formily/vue` provides Vue 3 bindings
- `@silver-formily/json-schema` provides schema descriptions
- this package maps those capabilities to Vant components

## Installation

```bash
pnpm add @silver-formily/vant @silver-formily/vue @silver-formily/core @silver-formily/json-schema @silver-formily/path @silver-formily/reactive @silver-formily/reactive-vue @silver-formily/shared vant vue dayjs
```

## Documentation

- Docs site: <https://vant.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
