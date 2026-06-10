# @silver-formily/element-plus

[简体中文](./README.md)

`@silver-formily/element-plus` is the official Element Plus integration layer for Silver Formily. It connects form field models and schema-driven descriptions to Element Plus components, and it ships ready-made building blocks ranging from basic inputs to array-field widgets, layout components, and preview components.

## When To Use This Package

If your project already uses Vue 3 + Element Plus and you want to organize complex forms with schema or field models, this is the most direct UI solution. It is a strong fit for:

- admin panels and internal tools
- config-driven or low-code form builders
- workflows with array fields, multi-step forms, drawer forms, or dialog forms
- migrations from `@formily/element-plus` to `@silver-formily/element-plus`

## What You Get

- Basic field components: `Input`, `Select`, `Checkbox`, `Radio`, `Switch`, `DatePicker`, `Upload`, and more
- Array-oriented components: `ArrayTable`, `ArrayCards`, `ArrayTabs`, `ArrayCollapse`, `ArrayItems`, and more
- Form structure components: `FormItem`, `FormLayout`, `FormGrid`, `FormStep`, `FormTab`
- Scenario components: `FormDialog`, `FormDrawer`, `QueryForm`, `SelectTable`
- Preview components: `PreviewText.*`

## Typical Dependencies

This package is usually used together with:

- `vue`
- `element-plus`
- `@silver-formily/vue`
- `@silver-formily/core`
- `@silver-formily/json-schema`
- `@silver-formily/reactive-vue`

## Installation

```bash
pnpm add @silver-formily/element-plus @silver-formily/vue @silver-formily/core @silver-formily/json-schema @silver-formily/reactive @silver-formily/reactive-vue @silver-formily/shared @silver-formily/grid element-plus vue
```

## Why This README Matters On npm

This package is not just a thin wrapper around Element Plus. It wires Silver Formily's field model, validation state, decorators, and schema runtime into Element Plus conventions so application teams can reuse advanced form patterns without writing their own integration layer from scratch.

## Documentation

- Docs site: <https://element-plus.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
