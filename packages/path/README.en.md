# @silver-formily/path

[![npm version](https://img.shields.io/npm/v/@silver-formily/path)](https://www.npmjs.com/package/@silver-formily/path)
[![npm downloads](https://img.shields.io/npm/dm/@silver-formily/path)](https://www.npmjs.com/package/@silver-formily/path)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[简体中文](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/path/README.md) | [English](https://github.com/hezhengxu2018/silver-formily/blob/main/packages/path/README.en.md)

`@silver-formily/path` implements the shared path abstraction used across Silver Formily. It covers path parsing, pattern matching, relative-path evaluation, and deep object access, and it serves as infrastructure for field trees, schema trees, and reaction addressing.

## Installation

```bash
pnpm add @silver-formily/path
```

The command includes required peer dependencies. Existing projects can keep dependencies that satisfy the declared ranges.

## Features

- `Path` as the path value object and parsing entry point
- path-pattern matching and relative-path resolution
- deep read, write, delete, and existence checks
- support for array indices, wildcards, and complex segment expressions

## Positioning

It provides common addressing semantics to multiple runtime layers:

- `@silver-formily/core` uses it for field and state addressing
- `@silver-formily/json-schema` uses it for schema-level traversal
- `@silver-formily/validator` and UI bindings share the same path model

## Use Cases

- deep object access toolchains
- field-tree and schema-tree traversal
- replacement for `@formily/path`

## Documentation

- [Guide](https://path.silver-formily.org/en/)
- [Project home](https://silver-formily.org/en/)
- [Source](https://github.com/hezhengxu2018/silver-formily/tree/main/packages/path)
- [Issues](https://github.com/hezhengxu2018/silver-formily/issues)

## License

[MIT](https://opensource.org/licenses/MIT)
