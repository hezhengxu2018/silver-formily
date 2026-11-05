# @silver-formily/core

[![npm version](https://img.shields.io/npm/v/@silver-formily/core)](https://www.npmjs.com/package/@silver-formily/core)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/core)](https://www.npmjs.com/package/@silver-formily/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/core/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/core/README.en.md)

`@silver-formily/core` is the canonical form runtime for Silver Formily. It defines form instances, field trees, state transitions, validation scheduling, submission flow, and effect execution semantics, and serves as the semantic foundation for upper rendering layers and UI bindings.

## Installation

```bash
pnpm add @silver-formily/core
```

The command includes required peer dependencies. Existing projects can keep dependencies that satisfy the declared ranges.

## Features

The public API is centered around the following capabilities:

- `createForm` for form construction
- `createEffectHook` and `createEffectContext` for effect orchestration
- `useEffectForm` for accessing the active form inside an effect context
- `FormPath` as the path-system bridge from `@silver-formily/path`
- guards such as `isForm`, `isField`, and `isArrayField`
- registries for validation rules, formats, locales, and message templates

## Positioning

Within the package graph, `@silver-formily/core` sits:

- above `@silver-formily/reactive`, reusing its reactive model and effect scheduler
- below `@silver-formily/vue`, `@silver-formily/react`, and `@silver-formily/json-schema`, which consume it as their domain runtime
- below UI bindings such as `@silver-formily/element-plus` and `@silver-formily/vant`

## Use Cases

Direct usage is most appropriate when you are:

- building a custom rendering layer
- orchestrating field state, reactions, and submission flow at runtime
- replacing `@formily/core` during migration

If you only need Vue or React form primitives, prefer consuming `@silver-formily/vue`, `@silver-formily/react`, or a UI integration package instead of using the runtime directly.

## Related Packages

- `@silver-formily/reactive`
- `@silver-formily/path`
- `@silver-formily/validator`
- `@silver-formily/json-schema`
- `@silver-formily/vue`
- `@silver-formily/react`

## Documentation

- [Guide](https://core.silver-formily.org/en/)
- [Project home](https://silver-formily.org/en/)
- [Source](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/core)
- [Issues](https://github.com/hezhengxu2018/silver-formily/issues)

## License

[MIT](https://opensource.org/licenses/MIT)
