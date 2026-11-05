# @silver-formily/shared

[![npm version](https://img.shields.io/npm/v/@silver-formily/shared)](https://www.npmjs.com/package/@silver-formily/shared)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/shared)](https://www.npmjs.com/package/@silver-formily/shared)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/shared/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/shared/README.en.md)

`@silver-formily/shared` provides the low-level utility surface shared by Silver Formily runtime packages. It aggregates array and object helpers, defaults/merge primitives, subscribables, middleware helpers, string transforms, emptiness checks, and runtime type guards.

## Installation

```bash
pnpm add @silver-formily/shared
```

The command includes required peer dependencies. Existing projects can keep dependencies that satisfy the declared ranges.

## Features

- array, object, merge, and defaults utilities
- subscribable and middleware primitives
- string and case-conversion helpers
- emptiness checks and runtime guards
- generic utilities such as `uid`

## Positioning

This package does not implement form semantics directly. Instead, it acts as a common dependency for the runtime stack:

- it removes duplicated helper logic from packages such as `@silver-formily/core`, `@silver-formily/reactive`, and `@silver-formily/validator`
- it keeps low-level utility behavior consistent across package boundaries

## Use Cases

- companion packages built around Silver Formily
- reuse of helper semantics aligned with the core runtime
- replacement for `@formily/shared`

## Documentation

- [Project home](https://silver-formily.org/en/)
- [Source](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/shared)
- [Issues](https://github.com/hezhengxu2018/silver-formily/issues)

## License

[MIT](https://opensource.org/licenses/MIT)
