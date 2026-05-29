# Path Docs Guide (extends root `AGENTS.md`)

该 workspace 用于 `path` 文档站点，默认遵循根目录 `AGENTS.md`。

## Commands

- `pnpm dev`: `vitepress dev .`
- `pnpm docs:build`: `vitepress build .`
- `pnpm preview`: 本地预览构建产物
- `pnpm lint` / `pnpm format`: 运行并修复 ESLint

## Editing Guidelines

- 文档页面放在根目录、`api/` 和 `en/` 目录，保持中英文结构一致。
- 站点配置通过 `@silver-formily/docs-toolkit` 提供。
- 当文档引用包源码时，优先通过 `.vitepress/config.ts` 中的 alias 指向 `packages/path/src`。
