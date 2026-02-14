# Repository Guidelines

## Project Structure & Module Organization

- `src/components`: Vue 3 Formily field primitives (`SchemaField`, `RecursionField`, etc.); keep them stateless and export via `components/index.ts`.
- `src/hooks`: composables such as `useForm`, `useField`, and `useAttach` that bridge Vue reactivity and Formily contexts; follow the `useX` naming pattern.
- `src/shared`, `src/utils`, `src/types`, and `src/global.d.ts` host shared factories, render helpers, and the public type surface—ensure runtime and type signatures stay in sync.
- Builds land in `esm/`; treat it as read-only output from Vite and declaration generation.

## Build, Test, and Development Commands

- `pnpm install`: install deps after cloning or whenever `pnpm-lock.yaml` changes.
- `pnpm build`: run `vite build` to emit the distributable bundle plus declarations.
- `pnpm lint`: execute the Antfu ESLint preset across TS, Vue, Markdown, and JSON files.
- `pnpm format`: auto-fix lintable issues; always review the resulting diff.
- `pnpm commit`: launch the `czg` prompt to craft Conventional Commits with the repository’s custom type list.
- `pnpm release`: call `release-it` for tagging and publishing once the tree is clean.

## Coding Style & Naming Conventions

- Adopt the Antfu ESLint defaults: 2-space indentation, single quotes, dangling commas where valid, and no semicolons.
- Export every public symbol through `src/index.ts` to keep the `@sliver/formily-element-plus` alias predictable.
- Components are `PascalCase.ts`, composables use `use` prefixes, utility helpers use descriptive verbs (`resolveSchemaProps`).
- Prefer explicit generics and public interfaces in `src/types`; update both runtime and types when APIs change.

## Testing Guidelines

- Automated tests are not yet wired in; document manual verification (Vue + Formily versions, schema used) in every PR.
- When adding a harness, prefer Vitest to stay aligned with Vite, place specs beside the source as `*.spec.ts`, and expose a `pnpm test` script.
- Regression fixes should include minimal reproduction snippets or playground links and demonstrate a passing `pnpm build`.

## Commit & Pull Request Guidelines

- Conventional Commits are enforced via `commitlint`; allowed types mirror the `czg` prompt (`feat`, `fix`, `docs`, `refactor`, etc.).
- Keep scopes meaningful (e.g., `components`, `hooks`), detail breaking changes explicitly, and link issues with the configured `link` / `closed` prefixes in footers.
- PRs must describe the problem, outline the solution, mention testing performed, and attach screenshots or GIFs for behavior changes.
- Run `pnpm format` (the Husky pre-commit hook) locally before requesting review or running `pnpm release`.
