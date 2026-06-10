# @silver-formily/core

[简体中文](./README.md)

## Overview

`@silver-formily/core` is the canonical form runtime for Silver Formily. It defines form instances, field trees, state transitions, validation scheduling, submission flow, and effect execution semantics, and serves as the semantic foundation for upper rendering layers and UI bindings.

## Runtime Positioning

Within the package graph, `@silver-formily/core` sits:

- above `@silver-formily/reactive`, reusing its reactive model and effect scheduler
- below `@silver-formily/vue` and `@silver-formily/json-schema`, which consume it as their domain runtime
- below UI bindings such as `@silver-formily/element-plus` and `@silver-formily/vant`

## Public Surface

The public API is centered around the following capabilities:

- `createForm` for form construction
- `createEffectHook` and `createEffectContext` for effect orchestration
- `useEffectForm` for accessing the active form inside an effect context
- `FormPath` as the path-system bridge from `@silver-formily/path`
- guards such as `isForm`, `isField`, and `isArrayField`
- registries for validation rules, formats, locales, and message templates

## Use Cases

Direct usage is most appropriate when you are:

- building a custom rendering layer
- orchestrating field state, reactions, and submission flow at runtime
- replacing `@formily/core` during migration

If you only need Vue-facing form primitives, prefer consuming `@silver-formily/vue` or a UI integration package instead of using the runtime directly.

## Installation

```bash
pnpm add @silver-formily/core @silver-formily/path @silver-formily/reactive @silver-formily/shared @silver-formily/validator
```

## Related Packages

- `@silver-formily/reactive`
- `@silver-formily/path`
- `@silver-formily/validator`
- `@silver-formily/json-schema`
- `@silver-formily/vue`

## Documentation

- Docs: <https://core.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
