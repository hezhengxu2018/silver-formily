# Vue Docs Guide (extends root `AGENTS.md`)

This workspace powers the public Vue documentation site (`vue.silver-formily.org`). Follow the repo-level rules, then apply these docs-specific notes.

## Commands

| Script                        | Description                                                                                                      |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`                    | `vitepress dev .`; preview the site locally. Use `pnpm --filter vue-docs dev` from the repo root.                |
| `pnpm build`                  | `vitepress build .`; emits static HTML into `.vitepress/dist`. Run before publishing or testing deploy previews. |
| `pnpm preview`                | Serves the built output for smoke testing.                                                                       |
| `pnpm lint` / `pnpm lint:fix` | ESLint (Antfu preset) across Markdown, Vue demos, and config files. These tasks are part of `turbo run lint*`.   |

## Content & Structure

- Markdown lives at the repo root of this workspace (`index.md`, `guide/`, `api/`, `questions/`, etc.). Use Chinese (`/`), English (`/en/`), and other locales under `apps/vue-docs/<locale>`.
- Shared demos/components stay in `demos/` and `api/`. When referencing package internals, import from `@silver-formily/vue` instead of relative paths.
- `.vitepress/config.ts` is generated via `@silver-formily/docs-toolkit#createDocsConfig`. Update the toolkit when you need shared theme changes.
- Keep `components.d.ts` and `env.d.ts` current so VitePress IntelliSense works.

## Processes

- After editing Markdown that includes code fences, run `pnpm format` to align with ESLint’s single-quote/no-semi style.
- Update `packages/vue` changelog or docs when features change. Each feature page should cross-link to demos.
- Images/assets go under `public/`; reference them via absolute `/` paths.

## External Hosting

If the Vue docs move into another repository, copy this guide there and adapt the commands (e.g., `npm run dev`). Until then, treat this workspace as the source of truth for the Vue site.
