# @silver-formily/json-schema

[简体中文](./README.md)

## Overview

`@silver-formily/json-schema` provides the schema description layer of Silver Formily. It maps JSON Schema-style structures into field semantics, decorators, components, display state, and reaction metadata, and serves as the core input protocol for schema-driven forms.

## Runtime Positioning

Within the package stack, this package acts as the description layer:

- above `@silver-formily/core`, mapping static schema into runtime semantics
- below `@silver-formily/vue` and UI bindings, acting as their rendering input contract
- as a stable abstraction for low-code and config-driven form systems

## Public Surface

- the `Schema` class and schema-related type definitions
- extension protocols such as `x-component`, `x-decorator`, and `x-reactions`
- schema compiler, patch, polyfill, and default-type mapping facilities

## Use Cases

- dynamic form generation
- low-code and configuration-driven form systems
- replacement for `@formily/json-schema`

## Installation

```bash
pnpm add @silver-formily/json-schema @silver-formily/core @silver-formily/path @silver-formily/reactive @silver-formily/shared
```

## Related Packages

- `@silver-formily/core`
- `@silver-formily/vue`
- `@silver-formily/element-plus`
- `@silver-formily/vant`

## Documentation

- Docs: <https://json-schema.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
