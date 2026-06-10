# @silver-formily/path

[简体中文](./README.md)

`@silver-formily/path` provides the path system used across Silver Formily. It handles field-path parsing, deep object access, path matching, and wildcard lookups, making it a core building block for field trees and schema addressing.

## What This Package Solves

In form systems, fields are frequently created, read, written, and matched by paths such as `user.addresses.0.city`. This package standardizes that logic into a stable API for:

- deep `get`, `set`, and `delete` operations
- path parsing with caching
- wildcard, matcher, and relative-path expressions
- addressing inside field trees, schemas, and reactions

## Key Capabilities

- `Path` as the primary path abstraction
- matcher patterns and relative-path resolution
- deep access helpers for read, write, delete, and existence checks
- support for array indices and complex path segments

## Good Fit For

- applications that work heavily with nested paths
- extensions around Silver Formily field trees or schemas
- migrations from `@formily/path` to `@silver-formily/path`

## Installation

```bash
pnpm add @silver-formily/path
```

## Documentation

- Docs site: <https://path.silver-formily.org>
- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
