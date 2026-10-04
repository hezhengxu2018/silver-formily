# Reactive React Docs Guide (extends root `AGENTS.md`)

This workspace hosts `reactive-react.silver-formily.org`. It shares most conventions with `apps/reactive-vue-docs`, but documents the React binding of the reactive layer.

## Commands

| Script                      | Description                                                                      |
| --------------------------- | -------------------------------------------------------------------------------- |
| `pnpm dev`                  | `vitepress dev .`; run via `pnpm --filter reactive-react-docs dev`.              |
| `pnpm docs:build`           | `vitepress build .`; outputs to `.vitepress/dist`.                               |
| `pnpm preview`              | Preview the production build locally.                                            |
| `pnpm lint` / `pnpm format` | ESLint against docs Markdown/demos. Included in the repo-wide `turbo run lint*`. |
| `pnpm check-types`          | `vue-tsc --noEmit`; also type-checks the `.tsx` demos.                           |

## Editing Guidelines

- Demos live in `demos/` and are `.tsx` files with a **default export** React component. The demo container renders React demos natively (file name must end with `.tsx`).
- File names are case-sensitive on CI but not on macOS: never create two demos that only differ in casing (e.g. `observer.tsx` vs `Observer.tsx`).
- Every demo imports from `@silver-formily/reactive-react`, which is aliased to `packages/reactive-react/src` for hot reloads in `.vitepress/config.ts`.
- Demos are statically imported during SSG; keep module top-level code free of `window`/`document` access.
- `vite.esbuild.jsx` is pinned to `automatic` so `.tsx` demos compile without importing React.
- When documenting API changes from `packages/reactive-react`, update both this site and the package changelog.
- Keep hook signatures in `api.md` in sync with `packages/reactive-react/src/types.ts` and the `src/hooks/*` implementations.

## Workflow Tips

- Run `pnpm format` after editing Markdown to keep code fences aligned with ESLint rules.
- Run `pnpm --filter reactive-react-docs docs:build` in CI/pipelines so only this app builds.
- Assets belong under `public/`; use locale-specific subfolders if necessary.

## Split Repos

If these docs ever live in a dedicated repository, replicate this AGENTS guide there and keep `@silver-formily/docs-toolkit` as the single source for shared theme/config logic.
