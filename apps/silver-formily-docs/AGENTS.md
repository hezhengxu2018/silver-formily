# Silver Formily Docs Guide (extends root `AGENTS.md`)

该 workspace 用于 Silver Formily 教学型总站，默认遵循根目录 `AGENTS.md`。

## Commands

- `pnpm dev`: `vitepress dev .`
- `pnpm docs:build`: `vitepress build .`
- `pnpm preview`: 本地预览构建产物
- `pnpm lint` / `pnpm format`: 运行并修复 ESLint

## Editing Guidelines

- 这是教学门户，不复制各子站的完整 API/组件文档。
- 页面内容放在根目录与 `en/` 目录，保持中英文结构一致。
- 共享站点配置通过 `@silver-formily/docs-toolkit` 提供。
- 总站专属的站点矩阵数据放在 `.vitepress/site-data.ts`。
- 静态资源放在 `public/`，构建产物位于 `.vitepress/dist`（勿手动修改）。
