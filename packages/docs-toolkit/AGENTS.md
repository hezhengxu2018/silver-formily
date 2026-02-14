# Docs Toolkit Guide (extends root `AGENTS.md`)

This workspace provides the shared VitePress configuration + CLI wrapper consumed by every docs app. Anything you add here immediately affects `apps/vue-docs`, `apps/reactive-vue-docs`, and any external site that depends on `@silver-formily/docs-toolkit`.

## Structure

- `index.js` / `index.d.ts`: exports `createDocsConfig` and related helpers. Keep the TypeScript declarations updated whenever you change runtime signatures.
- `theme/`: overrides and components layered on top of `vitepress-theme-element-plus`. Each component must be Vue 3-compatible and ship CSS that works in SSR.
- `bin/vitepress.js`: thin wrapper for VitePress CLI to make sure sites inherit the right dependencies. Avoid heavy logic here—prefer exporting utilities instead.

## Commands

| Script                             | Description                                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| `pnpm lint`                        | Runs the Antfu ESLint preset across JS/TS/Vue files in this package only.                  |
| `pnpm lint:fix`                    | Same as above with `--fix`.                                                                |
| `pnpm typecheck`                   | Executes `tsc --noEmit` using the local tsconfig—run this after editing type declarations. |
| `pnpm format` / `pnpm lint` (root) | Still required—this package participates in the repo-wide Turborepo tasks.                 |

## Development Notes

- VitePress is pinned to `2.0.0-alpha.16`. Update it in `package.json` and downstream apps together to avoid version skew.
- Theme overrides should be tree-shakable; don’t import heavy client-only libraries unless wrapped in `ClientOnly`.
- When adding Markdown-it plugins or Vite plugins, ensure they are SSR-safe and documented in the README so apps know to add required peer dependencies.

## Testing & Verification

- After changing shared components, run both docs apps locally (`pnpm --filter vue-docs dev`, `pnpm --filter reactive-vue-docs dev`) to verify.
- Keep screenshots or GIFs of major UI changes in PRs. Accessibility regressions should be checked with browser devtools (landmark/contrast).

## When Docs Move to Another Repo

If a docs site is split into its own repository, it should still depend on this toolkit package (via npm or a git submodule). That external repo needs its own `AGENTS.md` referencing whichever conventions apply there. This package remains the source of truth for shared theme/config behavior regardless of where individual sites live.
