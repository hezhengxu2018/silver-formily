# @silver-formily/reactive

[![npm version](https://img.shields.io/npm/v/@silver-formily/reactive)](https://www.npmjs.com/package/@silver-formily/reactive)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/reactive)](https://www.npmjs.com/package/@silver-formily/reactive)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/reactive/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/reactive/README.en.md)

`@silver-formily/reactive` is the low-level reactive execution engine of Silver Formily. It provides observable models, dependency collection, reaction scheduling, batching semantics, and raw-object boundary control for the higher runtime layers.

## Installation

```bash
pnpm add @silver-formily/reactive
```

The command includes required peer dependencies. Existing projects can keep dependencies that satisfy the declared ranges.

## Features

- `observable` for observable objects, arrays, and refs
- `action` for transactional updates
- `autorun` and `reaction` for dependency-driven effects
- `batch` for explicit batched updates
- `markRaw`, `raw`, and `toJS` for proxy-boundary control and serialization
- `contains` and `hasCollected` for dependency and node-graph helpers

## Positioning

This package sits near the bottom of the stack:

- it provides state and effect semantics for `@silver-formily/core`
- it acts as the reactive target consumed by `@silver-formily/reactive-vue`
- it can also be used independently for framework-agnostic reactive orchestration

## Use Cases

- form-state runtimes
- execution layers for DSL or low-code systems
- migrations from `@formily/reactive`

## Documentation

- [Guide](https://reactive.silver-formily.org/en/)
- [Project home](https://silver-formily.org/en/)
- [Source](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/reactive)
- [Issues](https://github.com/hezhengxu2018/silver-formily/issues)

## License

[MIT](https://opensource.org/licenses/MIT)
