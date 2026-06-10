# @silver-formily/shared

[简体中文](./README.md)

## Overview

`@silver-formily/shared` provides the low-level utility surface shared by Silver Formily runtime packages. It aggregates array and object helpers, defaults/merge primitives, subscribables, middleware helpers, string transforms, emptiness checks, and runtime type guards.

## Runtime Positioning

This package does not implement form semantics directly. Instead, it acts as a common dependency for the runtime stack:

- it removes duplicated helper logic from packages such as `@silver-formily/core`, `@silver-formily/reactive`, and `@silver-formily/validator`
- it keeps low-level utility behavior consistent across package boundaries

## Public Surface

- array, object, merge, and defaults utilities
- subscribable and middleware primitives
- string and case-conversion helpers
- emptiness checks and runtime guards
- generic utilities such as `uid`

## Use Cases

- companion packages built around Silver Formily
- reuse of helper semantics aligned with the core runtime
- replacement for `@formily/shared`

## Installation

```bash
pnpm add @silver-formily/shared
```

## Documentation

- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
