# Core Package Guide (extends root `AGENTS.md`)

This package is the locally maintained fork of `@formily/core`. Preserve upstream runtime semantics unless there is an intentional Silver Formily fix.

## Source Layout

- `src/models`, `src/shared`, and `src/effects` mirror the upstream package structure; keep migrations close to upstream so future syncs stay mechanical.
- `src/__tests__` contains upstream regression coverage. Prefer updating or extending these tests when behavior changes.
- Build output goes to `esm/` via tsdown and should be treated as generated artifacts.

## Package Rules

- Public exports flow through `src/index.ts`. Add new runtime surface there instead of relying on deep imports.
- Runtime dependencies on `@formily/reactive`, `@formily/shared`, and `@formily/validator` stay externalized; do not bundle them.
- If a fix diverges from upstream, keep the diff focused and document the reason in the PR description or changelog.

## Verification

- Run `pnpm --filter @silver-formily/core build` after source changes.
- Run `pnpm --filter @silver-formily/core test` when changing models, effects, or graph behavior.
- Run `pnpm --filter @silver-formily/core check-types` when touching public types or TS config.
