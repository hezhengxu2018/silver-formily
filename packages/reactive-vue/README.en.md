# @silver-formily/reactive-vue

[![npm version](https://img.shields.io/npm/v/@silver-formily/reactive-vue)](https://www.npmjs.com/package/@silver-formily/reactive-vue)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/reactive-vue)](https://www.npmjs.com/package/@silver-formily/reactive-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/reactive-vue/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/reactive-vue/README.en.md)

`@silver-formily/reactive-vue` implements the bridge between the Silver Formily reactive engine and Vue 3 lifecycle semantics. It binds observer behavior, dependency tracking, and reaction execution to component rendering and effect scopes.

## Installation

```bash
pnpm add @silver-formily/reactive-vue @silver-formily/reactive 'vue@^3.3.0'
```

The command includes required peer dependencies. Existing projects can keep dependencies that satisfy the declared ranges.

## Features

- `observer`
- `useObserver`
- `reactiveComputed`
- `formilyComputed` (deprecated, use `reactiveComputed`)
- `autorunEffect`
- `reactionWatch`

## Positioning

This package sits between the reactive engine and the Vue rendering layer:

- it uses `@silver-formily/reactive` as its state and dependency model
- it is typically consumed by `@silver-formily/vue`
- it can also be used directly in custom Vue components or renderers

## Use Cases

- consuming Silver Formily observables in Vue 3
- binding reaction lifetime to component scopes
- implementing fine-grained subscriptions in custom renderers

## Documentation

- [Guide](https://reactive-vue.silver-formily.org/en/)
- [Project home](https://silver-formily.org/en/)
- [Source](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/reactive-vue)
- [Issues](https://github.com/hezhengxu2018/silver-formily/issues)

## License

[MIT](https://opensource.org/licenses/MIT)
