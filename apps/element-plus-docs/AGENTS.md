# Element Plus Docs Guide (extends root `AGENTS.md`)

本文件仅补充 `apps/element-plus-docs` 的差异约束；其余规则遵循仓库根目录 `AGENTS.md`。

## 目录约定

- 文档页面位于 `zh/`，示例代码位于 `zh/demos/`。
- 站点配置位于 `.vitepress/`，公共静态资源位于 `public/`。
- `.vitepress/cache` 与 `.vitepress/dist` 为构建产物，禁止手动编辑。

## 常用命令

- `pnpm --filter element-plus-docs dev`：本地启动文档站。
- `pnpm --filter element-plus-docs build`：构建静态站点。
- `pnpm --filter element-plus-docs preview`：预览构建产物。
- `pnpm --filter element-plus-docs lint`：执行 ESLint 校验。
- `pnpm --filter element-plus-docs format`：执行 ESLint 自动修复。

## 维护约定

- 组件行为变化需同步更新 `zh/component/*` 与对应 demo。
- 示例优先从 `@silver-formily/element-plus` 导入，不直接耦合内部实现细节。
