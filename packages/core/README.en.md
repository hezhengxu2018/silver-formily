# @silver-formily/core

[简体中文](./README.md)

`@silver-formily/core` is the runtime kernel of Silver Formily. It manages form instances, field state, side effects, validation scheduling, submission flow, and shared form context. Packages such as `@silver-formily/vue`, `@silver-formily/json-schema`, and the UI adapter layers are all built on top of it.

## What This Package Is For

When you need a UI-agnostic form domain model, `@silver-formily/core` provides the actual "brain" of the form system:

- create and manage form instances
- maintain field trees and field lifecycle
- coordinate validation, submission, reset, and reactions
- expose effect hooks, runtime guards, and shared utilities

If you only want to render forms in Vue, you will usually consume this through `@silver-formily/vue`. If you are building a custom renderer, integrating with another view layer, or working at the runtime level, this is the package you want.

## Key Capabilities

- `createForm` for creating form instances
- `createEffectHook` and `createEffectContext` for reaction orchestration
- `useEffectForm` for accessing the active form inside effects
- `FormPath` re-exported around `@silver-formily/path`
- guards such as `isForm`, `isField`, and `isArrayField`
- registries for validation rules, formats, and i18n messages

## Who Should Use It

- library authors building on top of Silver Formily
- teams that want runtime-level form state control
- applications with complex reaction, submission, and validation flows
- projects migrating from `@formily/core` to `@silver-formily/core`

## Installation

```bash
pnpm add @silver-formily/core @silver-formily/path @silver-formily/reactive @silver-formily/shared @silver-formily/validator
```

## Works Well With

- `@silver-formily/vue` for Vue rendering
- `@silver-formily/json-schema` for schema-driven forms
- `@silver-formily/element-plus` and `@silver-formily/vant` for ready-made UI bindings

## Documentation

- Docs site: <https://core.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
