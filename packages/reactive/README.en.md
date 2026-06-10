# @silver-formily/reactive

[简体中文](./README.md)

`@silver-formily/reactive` is the reactive engine that powers Silver Formily. It provides a MobX-like model for observable state, derived computation, reaction tracking, and side effects, and it serves as a core dependency for `@silver-formily/core` and other higher-level packages.

## What This Package Does

If you need a reusable reactive engine rather than a framework-specific state layer, this package is the foundation:

- runtime state management for forms
- rule evaluation and field reactions
- observable updates over nested object trees
- reactive orchestration independent of Vue or React

## Key Capabilities

- `observable` for observable objects and arrays
- `action` for grouped state updates
- `autorun` and `reaction` for dependency tracking and side effects
- `batch` for update batching
- `markRaw`, `raw`, and `toJS` for raw-object handling and serialization
- `contains` and `hasCollected` for dependency and graph helpers

## Good Fit For

- custom form runtimes and DSL engines
- framework-agnostic reactive state control
- migrations from `@formily/reactive` to `@silver-formily/reactive`

## Installation

```bash
pnpm add @silver-formily/reactive
```

## Documentation

- Docs site: <https://reactive.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
