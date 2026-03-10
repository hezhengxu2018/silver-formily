# Silver Formily

English | [简体中文](./README.md)

Silver Formily is a Vue 3 / Formily monorepo built with `pnpm workspace` and `Turborepo`. It combines runtime bindings, Element Plus integrations, a grid utility package, shared docs tooling, and multiple documentation sites in one workspace.

## Current Dependency Baseline

- Node.js `>= 18`
- `pnpm@9`
- Vue `^3.3.0`
- Formily `^2`
- Element Plus `^2`
- TypeScript `5.9.2`
- Turbo `^2.8.5`
- Vite `^7.3.1`
- VitePress `2.0.0-alpha.16`
- Vitest `^4.0.16`
- tsdown `^0.18.1`

## Documentation Sites

- Reactive: <https://reactive.silver-formily.org>
- Vue: <https://vue.silver-formily.org>
- Reactive Vue: <https://reactive-vue.silver-formily.org>
- Element Plus: <https://element-plus.silver-formily.org>
- Grid: <https://grid.silver-formily.org>
- Reworked JSON Schema docs: <https://json-schema.silver-formily.org>

## Workspace Packages

| Package                             | Version | Purpose                                              | Baseline                                                                          |
| ----------------------------------- | ------- | ---------------------------------------------------- | --------------------------------------------------------------------------------- |
| `@silver-formily/reactive-vue`      | `1.0.0` | Vue 3 adapter layer around `@formily/reactive`       | `vue ^3.3.0`, `@formily/reactive ^2`                                              |
| `@silver-formily/vue`               | `2.3.1` | Vue 3 Formily runtime binding                        | `@formily/core/json-schema/reactive/shared ^2`, `@silver-formily/reactive-vue ^1` |
| `@silver-formily/element-plus`      | `3.0.1` | Formily + Element Plus bindings and scenario widgets | `element-plus ^2.1.8`, `vue ^3.3.0`, `@vueuse/core`                               |
| `@silver-formily/grid`              | `1.0.1` | Grid runtime package for the Formily ecosystem       | `@formily/reactive ^2`                                                            |
| `@silver-formily/docs-toolkit`      | `0.0.0` | Shared VitePress theme, plugins, and site config     | `vitepress 2.0.0-alpha.16`                                                        |
| `@silver-formily/typescript-config` | `0.0.0` | Shared TypeScript presets for the workspace          | Internal workspace use                                                            |

The six apps under `apps/*` are private VitePress sites. They all use the standard `vitepress dev/build/preview` scripts and share theme configuration through `@silver-formily/docs-toolkit`.

## Repository Layout

```text
.
|- apps/                   # VitePress documentation sites
|  |- reactive-docs
|  |- vue-docs
|  |- reactive-vue-docs
|  |- element-plus-docs
|  |- grid-docs
|  `- json-schema-docs
|- packages/               # Publishable or internal reusable packages
|  |- vue
|  |- reactive-vue
|  |- element-plus
|  |- grid
|  |- docs-toolkit
|  `- typescript-config
`- scripts/                # Repository-level scripts such as changeset-aware builds
```

## Installation

```bash
pnpm install
```

## Root Scripts

| Command                 | What it does                                                         |
| ----------------------- | -------------------------------------------------------------------- |
| `pnpm dev`              | Opens a searchable picker and shows docs/apps `dev` tasks by default |
| `pnpm dev:all`          | Runs `turbo run dev` and starts every workspace that exposes `dev`   |
| `pnpm build`            | Runs `turbo run build` for all packages and docs apps                |
| `pnpm docs:build`       | Runs `turbo run docs:build` for documentation sites only             |
| `pnpm lint`             | Runs `turbo run lint`                                                |
| `pnpm format`           | Runs `turbo run format`                                              |
| `pnpm check-types`      | Runs `turbo run check-types`                                         |
| `pnpm test`             | Opens a searchable picker and runs `test` for the selected package   |
| `pnpm test:all`         | Runs `turbo run test` for every available test task                  |
| `pnpm build:changed`    | Reads Changesets status and builds publishable packages only         |
| `pnpm changeset`        | Creates a changeset                                                  |
| `pnpm version-packages` | Runs `changeset version`                                             |
| `pnpm release`          | Runs `build:changed` and then `changeset publish`                    |
| `pnpm commit`           | Starts `czg` for Conventional Commit messages                        |

## Package-Level Development

```bash
# Open the interactive picker and filter by typing
pnpm dev

# Start one workspace directly (package name / path / folder name)
pnpm dev -- vue-docs

# Start one package-level dev/watch task directly
pnpm dev -- @silver-formily/grid

# Start every dev workspace
pnpm dev:all

# Open the test picker; Turbo still builds required dependency artifacts first
pnpm test

# Run tests for one package directly
pnpm test -- @silver-formily/element-plus

# Run every test task
pnpm test:all

# Start one docs site
pnpm --filter vue-docs dev

# Build one runtime package
pnpm --filter @silver-formily/vue build

# Run coverage for one package
pnpm --filter @silver-formily/element-plus test:coverage

# Build packages that are pending release
pnpm run build:changed
```

## Docs Dev Strategy

- All docs sites go through the root `pnpm dev` picker, and the picker starts only the docs app itself by default. Each docs app is responsible for its own dependency strategy.
- If a docs site documents one internal package directly, prefer a VitePress `alias` to that package source, as in `element-plus-docs`, `vue-docs`, `grid-docs`, and `reactive-vue-docs`.
- If a docs site only uses other internal packages inside demos, do not pull those packages into `dev/watch`; use `dev:deps` to build their artifacts first, as `json-schema-docs` does for `@silver-formily/reactive-vue` and `@silver-formily/vue`.
- If a dependency is neither the subject of the docs nor something that needs source-level hot updates, keep it on built artifacts and do not add an `alias`.
- For new docs apps, apply the same rule: the primary package gets `alias`, supporting internal packages go through `dev:deps`, unrelated packages stay out of the `dev` chain.

## Engineering Conventions

- Code style is enforced through `@antfu/eslint-config`: 2 spaces, single quotes, no semicolons.
- Root `pnpm format` delegates to `turbo run format`; the current Husky `pre-commit` hook runs `pnpm turbo run format`.
- The Turbo `build` task caches `dist/**`, `.vitepress/dist/**`, and `esm/**`.
- `reactive-vue` and `grid` are primarily built with `tsdown`; `vue` and `element-plus` currently use Vite library builds.
- Documentation sites are standardized on VitePress `2.0.0-alpha.16` with shared theme and plugin wiring from `@silver-formily/docs-toolkit`.
- Conventional Commits are used across the repo, and `pnpm commit` invokes `czg`.

## CI and Release

- CI runs on `main` pushes and pull requests, executes `pnpm lint`, and runs coverage for `reactive-vue` and `element-plus`.
- CI also builds `@silver-formily/grid`, `@silver-formily/reactive-vue`, and `@silver-formily/vue` before the `element-plus` browser test flow.
- The release workflow is manually triggered on `main` and includes internal package builds, `pnpm check-types`, `pnpm test:all`, coverage for `grid` / `reactive-vue` / `element-plus`, and Changesets publishing.
- When you change a publishable package, add the matching `.changeset/*` entry.

## Before Opening a PR

```bash
pnpm install
pnpm format
pnpm lint
pnpm check-types
pnpm build
```

If you change package behavior, test baselines, or documentation examples, document the manual verification steps in the PR.
