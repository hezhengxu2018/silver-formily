# @silver-formily/json-schema

[![npm version](https://img.shields.io/npm/v/@silver-formily/json-schema)](https://www.npmjs.com/package/@silver-formily/json-schema)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/json-schema)](https://www.npmjs.com/package/@silver-formily/json-schema)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/json-schema/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/json-schema/README.en.md)

`@silver-formily/json-schema` provides the schema description layer of Silver Formily. It maps JSON Schema-style structures into field semantics, decorators, components, display state, and reaction metadata, and serves as the core input protocol for schema-driven forms.

## Installation

```bash
pnpm add @silver-formily/json-schema
```

The command includes required peer dependencies. Existing projects can keep dependencies that satisfy the declared ranges.

## Features

- the `Schema` class and schema-related type definitions
- extension protocols such as `x-component`, `x-decorator`, and `x-reactions`
- schema compiler, patch, polyfill, and default-type mapping facilities

## Positioning

Within the package stack, this package acts as the description layer:

- above `@silver-formily/core`, mapping static schema into runtime semantics
- below `@silver-formily/vue` and UI bindings, acting as their rendering input contract
- as a stable abstraction for low-code and config-driven form systems

## Use Cases

- dynamic form generation
- low-code and configuration-driven form systems
- replacement for `@formily/json-schema`

## Related Packages

- `@silver-formily/core`
- `@silver-formily/vue`
- `@silver-formily/react`
- `@silver-formily/element-plus`
- `@silver-formily/vant`

## Documentation

- [Guide](https://json-schema.silver-formily.org/en/)
- [Project home](https://silver-formily.org/en/)
- [Source](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/json-schema)
- [Issues](https://github.com/hezhengxu2018/silver-formily/issues)

## License

[MIT](https://opensource.org/licenses/MIT)
