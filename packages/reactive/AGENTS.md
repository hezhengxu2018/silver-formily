# Reactive Package Guide (extends root `AGENTS.md`)

This package is the locally maintained fork of `@formily/reactive`. Keep behavioral changes minimal and prefer preserving upstream file layout so future syncs stay mechanical.

## Source Layout

- `src/annotations`, `src/autorun`, `src/reaction`, and related modules mirror upstream runtime boundaries.
- `src/__tests__` contains upstream regression coverage; use it when validating scheduler, dependency tracking, or observable semantics.
- Generated output goes to `esm/` and should not be edited by hand.

## Verification

- Run `pnpm --filter @silver-formily/reactive build` after runtime changes.
- Run targeted tests only when you intentionally wire additional test dependencies into this package.
