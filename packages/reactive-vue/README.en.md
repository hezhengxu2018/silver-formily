# @silver-formily/reactive-vue

[简体中文](./README.md)

`@silver-formily/reactive-vue` is the bridge between Silver Formily's reactive engine and Vue 3. It lets dependency tracking, effects, and derived computations from `@silver-formily/reactive` run naturally inside Vue components and effect scopes.

## What This Package Is For

If you already use `@silver-formily/reactive` and want to wire it cleanly into Vue 3, this package provides the missing glue. It is useful for:

- consuming Silver Formily observable state inside Vue components
- binding `autorun` and `reaction` to Vue lifecycle
- enabling fine-grained updates in renderers and business components

## Key Capabilities

- `observer` for dependency-aware component updates
- `useObserver` for setup-level observation wiring
- `formilyComputed` for wrapping Formily expressions as Vue `computed`
- `autorunEffect` for lifecycle-managed `autorun`
- `reactionWatch` for lifecycle-managed `reaction`

## Common Pairings

- `@silver-formily/vue` as the Vue form rendering layer
- business components that read observable state directly
- custom renderers that need fine-grained subscriptions

## Installation

```bash
pnpm add @silver-formily/reactive-vue @silver-formily/reactive vue
```

## Documentation

- Docs site: <https://reactive-vue.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
