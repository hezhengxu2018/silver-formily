# Silver Formily • Agent Guide

This document defines repository-wide expectations for anyone automating tasks (formatting, linting, docs edits, releases, etc.). Individual packages only need extra `AGENTS.md` files when they have **additional** rules that differ from or extend what is written here.

## Monorepo Layout

- `apps/` — Documentation sites and playgrounds (VitePress). These consume local packages via `workspace:*`.
- `packages/` — Publishable libraries (`@silver-formily/vue`, `@silver-formily/reactive-vue`, docs tooling, tsconfig presets).
- Tooling lives at the repo root (`pnpm-lock.yaml`, `turbo.json`, `prettier.config.mjs`, Husky hooks). Make changes here rather than reconfiguring each package separately.

## Required Tooling

- Node ≥ 18 and `pnpm@9`.
- Run `pnpm install` after pulling changes that touch `pnpm-lock.yaml` or `package.json`.
- Husky runs `pnpm format` on commit; `pnpm format` itself delegates to `turbo run format`, so every package must expose a `format` script if it wants to participate.

## Standard Workflows

| Task              | Command            | Notes                                                                  |
| ----------------- | ------------------ | ---------------------------------------------------------------------- |
| Format everything | `pnpm format`      | Uses ESLint (Antfu preset) everywhere. Required before pushing.        |
| Lint only         | `pnpm lint`        | Runs `turbo run lint`, so each workspace must provide a `lint` script. |
| Type-check        | `pnpm check-types` | Executes `turbo run check-types`. Add package scripts if missing.      |
| Build             | `pnpm build`       | Caches through Turborepo; declare outputs for file-generating steps.   |
| Dev servers       | `pnpm dev`         | Fan-out via `turbo run dev`; use `--filter` for specific apps.         |
| Releases          | `pnpm release`     | Runs `pnpm build` first, then `changeset publish`. Repo must be clean. |

## Code Style & Quality Gates

- Antfu ESLint preset (flat config) controls TS/Vue/Markdown/JSON style. Prefer single quotes, no semicolons, 2 spaces.
- Prettier is not run directly in hooks; any formatting should go through ESLint or `pnpm format`.
- Conventional Commits enforced via `czg` + `commitlint`. Typical types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`.
- Always document manual testing in PR descriptions until automated tests exist.

## AGENTS.md Best Practices

- **One global guide (this file)** defines the default rules. Keep it up to date whenever tooling changes.
- **Package-level guides** (e.g., `packages/vue/AGENTS.md`) only describe deviations: specialized directory structure, extra scripts, release nuances.
- If a package-specific rule overrides a global one, state it explicitly (“Overrides root AGENTS.md: `pnpm format` also runs Storybook lint...”).
- Avoid copy-pasting the root content into sub-guides—link to this file instead. This keeps instructions authoritative in a single place.

## Communication

- 所有基于 AGENTS 的协作请优先使用中文描述需求、规划与结果，确保语境一致，避免多语言往返导致的信息偏差。

## Before Sending a PR

1. `pnpm install`
2. `pnpm format && pnpm lint && pnpm check-types`
3. `pnpm build` (when touching packages or release artifacts)
4. Document manual testing steps inside the PR template.

If anything feels ambiguous, clarify the rule in this guide so future agents don’t have to rediscover it.
