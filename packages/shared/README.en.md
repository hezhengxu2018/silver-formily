# @silver-formily/shared

[简体中文](./README.md)

`@silver-formily/shared` is the shared utility layer used across Silver Formily runtime packages. It bundles low-level helpers for arrays, strings, object merging, subscriptions, middleware, unique IDs, emptiness checks, and runtime type guards so the rest of the monorepo can stay consistent and avoid duplicated implementations.

## Who This Package Is For

This is mostly a low-level package and is most useful when you are:

- building companion packages for Silver Formily
- reusing the same utility behavior as the core packages
- migrating from `@formily/shared` to `@silver-formily/shared`

If you are a normal application-level form user, you typically consume it transitively through packages like `@silver-formily/core` or `@silver-formily/reactive`.

## What It Includes

- array and object helpers
- defaults and deep merge utilities
- subscribable and middleware primitives
- string and naming helpers
- runtime checkers and guard utilities
- generic helpers such as `uid`

## Installation

```bash
pnpm add @silver-formily/shared
```

## Repository

- Repository: <https://github.com/hezhengxu2018/silver-formily>

## License

MIT
