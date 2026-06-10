# Silver Formily

English | [简体中文](./README.md)

Silver Formily is a Vue 3 form infrastructure monorepo. The core reactive system, path utilities, validation, schema layer, runtime bindings, and UI adapters in this repository have all been migrated from the original Formily dependencies into first-party `@silver-formily/*` implementations. The repository is no longer just a wrapper around Formily; it is now an independently evolving implementation with its own packages, docs, and tooling.

The workspace is organized with `pnpm`, `Turborepo`, `Vite`, and `VitePress`, covering core runtime packages, Vue bindings, Element Plus / Vant integrations, documentation sites, and shared internal tooling.

## What Is Included

- Core foundations: `@silver-formily/reactive`, `@silver-formily/path`, `@silver-formily/shared`, `@silver-formily/validator`
- Form runtime stack: `@silver-formily/core`, `@silver-formily/json-schema`, `@silver-formily/vue`, `@silver-formily/reactive-vue`
- UI adapters: `@silver-formily/element-plus`, `@silver-formily/vant`
- Supporting packages: `@silver-formily/grid`, `@silver-formily/docs-toolkit`, `@silver-formily/typescript-config`

## Documentation Sites

- Reactive: <https://reactive.silver-formily.org>
- Path: <https://path.silver-formily.org>
- Validator: <https://validator.silver-formily.org>
- Core: <https://core.silver-formily.org>
- Vue: <https://vue.silver-formily.org>
- Reactive Vue: <https://reactive-vue.silver-formily.org>
- Element Plus: <https://element-plus.silver-formily.org>
- Vant: <https://vant.silver-formily.org>
- Grid: <https://grid.silver-formily.org>
- JSON Schema: <https://json-schema.silver-formily.org>

## Workspace Packages

| Package                             | Purpose                                           |
| ----------------------------------- | ------------------------------------------------- |
| `@silver-formily/reactive`          | Reactive core implementation                      |
| `@silver-formily/path`              | Path parsing and access utilities                 |
| `@silver-formily/shared`            | Shared cross-package utilities and types          |
| `@silver-formily/validator`         | Form validation primitives                        |
| `@silver-formily/core`              | Form domain model and runtime kernel              |
| `@silver-formily/json-schema`       | JSON Schema conversion and form description layer |
| `@silver-formily/reactive-vue`      | Vue reactive bridge                               |
| `@silver-formily/vue`               | Vue 3 runtime bindings                            |
| `@silver-formily/element-plus`      | Element Plus adapters and scene components        |
| `@silver-formily/vant`              | Vant adapters and mobile-oriented components      |
| `@silver-formily/grid`              | Responsive layout and grid primitives             |
| `@silver-formily/docs-toolkit`      | Shared VitePress theme, plugins, and site config  |
| `@silver-formily/typescript-config` | Shared TypeScript presets for the workspace       |

## Repository Layout

```text
.
|- apps/                         # VitePress documentation sites
|  |- core-docs
|  |- element-plus-docs
|  |- grid-docs
|  |- json-schema-docs
|  |- path-docs
|  |- reactive-docs
|  |- reactive-vue-docs
|  |- validator-docs
|  |- vant-docs
|  `- vue-docs
|- packages/                     # Publishable packages and internal tooling
|  |- core
|  |- docs-toolkit
|  |- element-plus
|  |- grid
|  |- json-schema
|  |- path
|  |- reactive
|  |- reactive-vue
|  |- shared
|  |- typescript-config
|  |- validator
|  |- vant
|  `- vue
`- scripts/                      # Repository-level scripts
```

## Requirements

- Node.js `>= 24`
- `pnpm@11`

## Installation

```bash
pnpm install
```

## Common Commands

| Command                 | Purpose                                                          |
| ----------------------- | ---------------------------------------------------------------- |
| `pnpm dev`              | Open the searchable workspace picker, focused on docs by default |
| `pnpm dev:all`          | Start every workspace that exposes `dev`                         |
| `pnpm build`            | Build every workspace that exposes `build`                       |
| `pnpm docs:build`       | Build every docs app that exposes `docs:build`                   |
| `pnpm lint`             | Lint root-level files first, then run `turbo run lint`           |
| `pnpm format`           | Format root-level files first, then run `turbo run format`       |
| `pnpm check-types`      | Run `turbo run check-types`                                      |
| `pnpm test`             | Open the test picker and run the selected workspace tests        |
| `pnpm test:all`         | Run every test task                                              |
| `pnpm build:changed`    | Build only packages pending release                              |
| `pnpm changeset`        | Create a changeset                                               |
| `pnpm version-packages` | Run `changeset version`                                          |
| `pnpm release`          | Build changed packages and publish with Changesets               |

## Development Examples

```bash
# Open the docs/app picker
pnpm dev

# Start one docs site directly
pnpm dev -- vue-docs

# Watch one package directly
pnpm dev -- @silver-formily/grid

# Run tests for one package
pnpm test -- @silver-formily/element-plus

# Build one runtime package
pnpm --filter @silver-formily/vue build

# Build one docs site
pnpm --filter element-plus-docs docs:build
```

## Docs Workflow Conventions

- Root `pnpm dev` is the default entry point for docs work.
- Docs apps use `docs:build` instead of a regular `build`.
- When a docs app documents one internal package directly, prefer a VitePress `alias` to source.
- When internal dependencies are only needed for demos, prefer `docs:deps` to build artifacts instead of pulling them into `dev/watch`.
- Prebuilt internal dependencies should be declared in `silverFormily.docs.buildDependencies`, then translated into Turbo filters by the shared script.

## Engineering Conventions

- Code style is enforced through `@antfu/eslint-config`: 2 spaces, single quotes, no semicolons.
- Root `pnpm format` handles repository-level files first, then delegates to `turbo run format`.
- Husky `pre-commit` uses `lint-staged` to format only staged files and automatically restage the result.
- Publishable packages are built with `tsdown`, and documentation sites are standardized on VitePress.
- Conventional Commits are enforced, and `pnpm commit` launches `czg` for guided commit messages.

## Suggested Checks Before Opening a PR

```bash
pnpm install
pnpm format
pnpm lint
pnpm check-types
pnpm build
```

If your changes affect package behavior, test baselines, or documentation examples, include manual verification steps in the PR.
