# @silver-formily/path

[简体中文](./README.md)

## Overview

`@silver-formily/path` implements the shared path abstraction used across Silver Formily. It covers path parsing, pattern matching, relative-path evaluation, and deep object access, and it serves as infrastructure for field trees, schema trees, and reaction addressing.

## Runtime Positioning

It provides common addressing semantics to multiple runtime layers:

- `@silver-formily/core` uses it for field and state addressing
- `@silver-formily/json-schema` uses it for schema-level traversal
- `@silver-formily/validator` and UI bindings share the same path model

## Public Surface

- `Path` as the path value object and parsing entry point
- path-pattern matching and relative-path resolution
- deep read, write, delete, and existence checks
- support for array indices, wildcards, and complex segment expressions

## Use Cases

- deep object access toolchains
- field-tree and schema-tree traversal
- replacement for `@formily/path`

## Installation

```bash
pnpm add @silver-formily/path
```

## Documentation

- Docs: <https://path.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
