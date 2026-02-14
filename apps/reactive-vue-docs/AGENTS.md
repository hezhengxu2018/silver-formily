# Reactive Vue Docs Guide (extends root `AGENTS.md`)

This workspace hosts `reactive-vue.silver-formily.org`. It shares most conventions with `apps/vue-docs`, but focuses on the reactive layer.

## Commands

| Script                        | Description                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------- |
| `pnpm dev`                    | `vitepress dev .`; run via `pnpm --filter reactive-vue-docs dev`.                |
| `pnpm build`                  | `vitepress build .`; outputs to `.vitepress/dist`.                               |
| `pnpm preview`                | Preview the production build locally.                                            |
| `pnpm lint` / `pnpm lint:fix` | ESLint against docs Markdown/demos. Included in the repo-wide `turbo run lint*`. |

## Editing Guidelines

- Use `demos/` for embedded playgrounds and ensure each demo imports from `@silver-formily/reactive-vue`.
- `.vitepress/config.ts` (and locale configs) are generated via `@silver-formily/docs-toolkit`. Keep that package up to date for shared theme fixes.
- When documenting API changes from `packages/reactive-vue`, update both this site and the package changelog.
- Prefer Composition API examples; highlight differences from the Vue component bindings.

## Workflow Tips

- Run `pnpm format` after editing Markdown to keep code fences aligned with ESLint rules.
- Use `pnpm --filter reactive-vue-docs build` in CI/pipelines so only this app builds.
- Assets belong under `public/`; use locale-specific subfolders if necessary.

## Split Repos

If these docs ever live in a dedicated repository, replicate this AGENTS guide there and keep `@silver-formily/docs-toolkit` as the single source for shared theme/config logic.
