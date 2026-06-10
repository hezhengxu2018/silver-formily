# @silver-formily/reactive-vue

[简体中文](./README.md)

## Overview

`@silver-formily/reactive-vue` implements the bridge between the Silver Formily reactive engine and Vue 3 lifecycle semantics. It binds observer behavior, dependency tracking, and reaction execution to component rendering and effect scopes.

## Runtime Positioning

This package sits between the reactive engine and the Vue rendering layer:

- it uses `@silver-formily/reactive` as its state and dependency model
- it is typically consumed by `@silver-formily/vue`
- it can also be used directly in custom Vue components or renderers

## Public Surface

- `observer`
- `useObserver`
- `formilyComputed`
- `autorunEffect`
- `reactionWatch`

## Use Cases

- consuming Silver Formily observables in Vue 3
- binding reaction lifetime to component scopes
- implementing fine-grained subscriptions in custom renderers

## Installation

```bash
pnpm add @silver-formily/reactive-vue @silver-formily/reactive vue
```

## Documentation

- Docs: <https://reactive-vue.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
