# @silver-formily/vue

[简体中文](./README.md)

## Overview

`@silver-formily/vue` is the Vue 3 form rendering layer of Silver Formily. It connects the core runtime, schema protocol, and Vue component system, and exposes field components, schema-rendering components, composables, and adapter helpers.

## Runtime Positioning

This package sits between the runtime kernel and concrete UI libraries:

- it depends on `@silver-formily/core` for form and field semantics
- it depends on `@silver-formily/reactive-vue` for Vue lifecycle integration
- it acts as the upstream rendering layer consumed by `@silver-formily/element-plus` and `@silver-formily/vant`

## Public Surface

- field components: `Field`, `ArrayField`, `ObjectField`, `VoidField`
- form-context components: `FormProvider`, `FormConsumer`
- schema components: `SchemaField`, `RecursionField`, `ReactiveField`, `ExpressionScope`
- composables: `useForm`, `useField`, `useFieldSchema`, `useFormEffects`
- adapter helpers: `connect`, `mapProps`

## Design Characteristics

- pure Vue 3 runtime path
- aligned with `modelValue` / `onUpdate:modelValue`
- intended for schema-driven forms and component-level field modeling
- serves as the Silver Formily namespace replacement for `@formily/vue`

## Installation

```bash
pnpm add @silver-formily/vue @silver-formily/core @silver-formily/json-schema @silver-formily/path @silver-formily/reactive @silver-formily/reactive-vue @silver-formily/shared @silver-formily/validator vue
```

## Related Packages

- `@silver-formily/core`
- `@silver-formily/json-schema`
- `@silver-formily/reactive-vue`
- `@silver-formily/element-plus`
- `@silver-formily/vant`

## Documentation

- Docs: <https://vue.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
