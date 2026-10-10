# React Docs Guide (extends root `AGENTS.md`)

This workspace hosts `react.silver-formily.org`, the documentation site for `@silver-formily/react`. It mirrors the structure of `apps/vue-docs` (same sections: guide / api / types, plus an `en/` mirror), but documents the React binding.

## Commands

| Script                      | Description                                                                      |
| --------------------------- | -------------------------------------------------------------------------------- |
| `pnpm dev`                  | `vitepress dev .`; run via `pnpm --filter react-docs dev`.                       |
| `pnpm docs:build`           | `vitepress build .`; outputs to `.vitepress/dist`.                               |
| `pnpm preview`              | Preview the production build locally.                                            |
| `pnpm lint` / `pnpm format` | ESLint against docs Markdown/demos. Included in the repo-wide `turbo run lint*`. |
| `pnpm check-types`          | `vue-tsc --noEmit`; also type-checks the `.tsx` demos.                           |

## Editing Guidelines

- Demos live in `demos/` and mirror the `api/` tree (`demos/api/components/*.tsx`, `demos/api/hooks/*.tsx`, `demos/api/shared/*.tsx`). Each demo is a `.tsx` file with a **default export** React component.
- The demo container decides Vue vs React by file extension: references ending in `.tsx` render as React. Always reference demos in Markdown with the `.tsx` suffix (e.g. `api/components/field.tsx`).
- File names are case-sensitive on CI but not on macOS: never create two demos that only differ in casing.
- Demos import from `@silver-formily/react`, which is aliased to `packages/react/src` for hot reloads in `.vitepress/config.ts`.
- Demos are statically imported during SSG; keep module top-level code free of `window`/`document` access.
- `vite.esbuild.jsx` is pinned to `automatic` so `.tsx` demos compile without importing React.
- Demos use `antd` components (mirroring how `apps/vue-docs` demos use `element-plus`) and keep their interactions aligned with the Vue counterparts; field components receive `value`/`onChange` from the field model, and core normalizes `event.target.value` automatically.
- When documenting API changes from `packages/react`, update both this site and the package changelog. Keep signatures in sync with `packages/react/src/types.ts` and the `src/components/*` / `src/hooks/*` implementations.

## Workflow Tips

- Run `pnpm format` after editing Markdown to keep code fences aligned with ESLint rules.
- Run `pnpm --filter react-docs docs:build` in CI/pipelines so only this app builds.
- Assets belong under `public/`; use locale-specific subfolders if necessary.

## Split Repos

If these docs ever live in a dedicated repository, replicate this AGENTS guide there and keep `@silver-formily/docs-toolkit` as the single source for shared theme/config logic.
