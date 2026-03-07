# Reactive Docs Guide (extends root `AGENTS.md`)

该 workspace 用于 `reactive` 文档站点，默认遵循根目录 `AGENTS.md`。

## Commands

- `pnpm dev`: `vitepress dev .`
- `pnpm build`: `vitepress build .`
- `pnpm preview`: 本地预览构建产物
- `pnpm lint` / `pnpm format`: 运行并修复 ESLint

## Editing Guidelines

- 文档页面放在根目录与 `en/` 目录，保持中英文结构一致。
- 共享站点配置通过 `@silver-formily/docs-toolkit` 提供。
- 静态资源放在 `public/`，构建产物位于 `.vitepress/dist`（勿手动修改）。
