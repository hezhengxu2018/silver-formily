# @silver-formily/reactive

[简体中文](./README.md)

## Overview

`@silver-formily/reactive` is the low-level reactive execution engine of Silver Formily. It provides observable models, dependency collection, reaction scheduling, batching semantics, and raw-object boundary control for the higher runtime layers.

## Runtime Positioning

This package sits near the bottom of the stack:

- it provides state and effect semantics for `@silver-formily/core`
- it acts as the reactive target consumed by `@silver-formily/reactive-vue`
- it can also be used independently for framework-agnostic reactive orchestration

## Public Surface

- `observable` for observable objects, arrays, and refs
- `action` for transactional updates
- `autorun` and `reaction` for dependency-driven effects
- `batch` for explicit batched updates
- `markRaw`, `raw`, and `toJS` for proxy-boundary control and serialization
- `contains` and `hasCollected` for dependency and node-graph helpers

## Use Cases

- form-state runtimes
- execution layers for DSL or low-code systems
- migrations from `@formily/reactive`

## Installation

```bash
pnpm add @silver-formily/reactive
```

## Documentation

- Docs: <https://reactive.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
