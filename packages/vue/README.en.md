# @silver-formily/vue

[简体中文](./README.md)

`@silver-formily/vue` is the Vue 3 runtime binding layer for Silver Formily. It connects the form model, field state, and effect system from `@silver-formily/core` to the Vue component tree, and it exposes form-rendering primitives such as `Field`, `SchemaField`, `FormProvider`, `connect`, and `mapProps`.

## What This Package Does

If `@silver-formily/core` is the brain of the form system, `@silver-formily/vue` is the rendering and integration layer for Vue 3. It is responsible for:

- providing form context to the component tree
- mapping field models to Vue components
- powering schema-driven rendering at runtime
- standardizing on Vue 3-style `modelValue` / `onUpdate:modelValue` contracts

## Why Use It

- built specifically for Vue 3 without Vue 2 compatibility baggage
- aligned with `@silver-formily/core`, `@silver-formily/json-schema`, and `@silver-formily/reactive-vue`
- a better fit for modern Vue UI libraries such as Element Plus and Vant
- a clear migration target from `@formily/vue` into the `@silver-formily/*` namespace

## Key Capabilities

- Components: `FormProvider`, `FormConsumer`, `Field`, `ArrayField`, `ObjectField`, `VoidField`
- Schema rendering: `SchemaField`, `RecursionField`, `ReactiveField`, `ExpressionScope`
- Composables: `useForm`, `useField`, `useFieldSchema`, `useFormEffects`
- Adapter helpers: `connect`, `mapProps`

## Recommended Pairings

- `@silver-formily/core` for the form runtime
- `@silver-formily/json-schema` for schema-driven descriptions
- `@silver-formily/reactive-vue` for Vue reactivity bridging
- `@silver-formily/element-plus` or `@silver-formily/vant` for ready-made UI integrations

## Installation

```bash
pnpm add @silver-formily/vue @silver-formily/core @silver-formily/json-schema @silver-formily/path @silver-formily/reactive @silver-formily/reactive-vue @silver-formily/shared @silver-formily/validator vue
```

## Documentation

- Docs site: <https://vue.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
