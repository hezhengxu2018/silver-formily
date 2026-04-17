# Silver Formily • Agent Guide

This document defines repository-wide expectations for anyone automating tasks (formatting, linting, docs edits, releases, etc.). Individual packages only need extra `AGENTS.md` files when they have **additional** rules that differ from or extend what is written here.

## Monorepo Layout

- `apps/` — Documentation sites and playgrounds (VitePress). These consume local packages via `workspace:*`.
- `packages/` — Publishable libraries (`@silver-formily/vue`, `@silver-formily/reactive-vue`, docs tooling, tsconfig presets).
- Tooling lives at the repo root (`pnpm-lock.yaml`, `turbo.json`, `prettier.config.mjs`, Husky hooks). Make changes here rather than reconfiguring each package separately.

## Required Tooling

- Node ≥ 24 and `pnpm@10`.
- Run `pnpm install` after pulling changes that touch `pnpm-lock.yaml` or `package.json`.
- Husky runs `lint-staged` on commit so only staged files are formatted and re-staged automatically. The root `pnpm format` command first formats repository-level files, then delegates to `turbo run format`, so every package must expose a `format` script if it wants to participate in full-repo formatting.

## Standard Workflows

| Task              | Command            | Notes                                                                                                           |
| ----------------- | ------------------ | --------------------------------------------------------------------------------------------------------------- |
| Format everything | `pnpm format`      | Uses ESLint (Antfu preset) everywhere. Required before pushing.                                                 |
| Lint only         | `pnpm lint`        | Lints repository-level files first, then runs `turbo run lint`, so each workspace must provide a `lint` script. |
| Type-check        | `pnpm check-types` | Executes `turbo run check-types`. Add package scripts if missing.                                               |
| Build             | `pnpm build`       | Builds workspaces that expose `build`; declare outputs for file-generating steps.                               |
| Dev servers       | `pnpm dev`         | Opens a searchable picker for apps/docs by default; use `pnpm dev:all` for fan-out.                             |
| Test              | `pnpm test`        | Opens a searchable workspace picker; use `pnpm test:all` for full run.                                          |
| Releases          | `pnpm release`     | Runs `pnpm build:changed` first, then `changeset publish`. Repo must be clean.                                  |

## Docs Apps

- Root `pnpm dev` is the default entry for docs work. The picker only shows apps/docs by default and starts the selected docs app itself.
- A docs app that documents one internal package directly should usually alias that package to source in VitePress.
- Internal packages that only appear in demos should not be started in `dev/watch`; build them first via a package-local `docs:deps` script instead.
- Docs apps should expose `docs:build` instead of a regular `build`. If a docs app has `docs:deps`, both `dev` and `docs:build` should reuse that same dependency preparation so direct docs builds stay reproducible.
- Docs dependency build targets belong in `silverFormily.docs.buildDependencies`; keep `docs:deps` itself as a shared script entry instead of repeating Turbo filter commands in every docs app.
- If an internal dependency does not need source-level hot updates, prefer built artifacts and skip VitePress `alias`.
- Package-level `dev` tasks still exist for explicit use (`pnpm dev -- <workspace-name>`), but they are not the default docs workflow.

## Code Style & Quality Gates

- Antfu ESLint preset (flat config) controls TS/Vue/Markdown/JSON style. Prefer single quotes, no semicolons, 2 spaces.
- Prettier is not run directly in hooks; any formatting should go through ESLint or `pnpm format`.
- Conventional Commits are enforced by Husky `commit-msg` via `commitlint`, and `pnpm commit` still uses `czg` as the guided prompt. Typical types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`.
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

<!-- code-review-graph MCP tools -->

## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool                        | Use when                                               |
| --------------------------- | ------------------------------------------------------ |
| `detect_changes`            | Reviewing code changes — gives risk-scored analysis    |
| `get_review_context`        | Need source snippets for review — token-efficient      |
| `get_impact_radius`         | Understanding blast radius of a change                 |
| `get_affected_flows`        | Finding which execution paths are impacted             |
| `query_graph`               | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes`     | Finding functions/classes by name or keyword           |
| `get_architecture_overview` | Understanding high-level codebase structure            |
| `refactor_tool`             | Planning renames, finding dead code                    |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
