# Vant Docs Guide (extends root `AGENTS.md`)

本文件仅补充 `apps/vant-docs` 的差异约束；其余规则遵循仓库根目录 `AGENTS.md`。

## 目录约定

- 文档页面位于 `zh/`，示例代码位于 `zh/demos/`。
- 站点配置位于 `.vitepress/`，公共静态资源位于 `public/`。
- `.vitepress/cache` 与 `.vitepress/dist` 为构建产物，禁止手动编辑。

## 常用命令

- `pnpm --filter vant-docs dev`：本地启动文档站。
- `pnpm --filter vant-docs docs:build`：构建静态站点。
- `pnpm --filter vant-docs preview`：预览构建产物。
- `pnpm --filter vant-docs lint`：执行 ESLint 校验。
- `pnpm --filter vant-docs format`：执行 ESLint 自动修复。

## 维护约定

- 示例优先从 `@silver-formily/vant` 导入，不直接耦合 `packages/vant` 内部实现细节。
- 如果新增组件页面，请同步补一个最小 demo，优先保持“能跑通主链路”而不是一开始就追求页面齐全。
- 文档站只 alias `@silver-formily/vant` 源码；其余内部依赖继续走 `docs:deps` 预构建策略。
- 移动端预览 demo 里的表单结果展示统一使用 `submit` 按钮触发 `Prompts.alert(...)`，不要再额外渲染 `FormConsumer` / `pre` 这类实时值预览区块，避免不同 demo 的交互风格不一致。
- `prompts-js` 已通过 `.vitepress/config.ts` 的 `head` 以 CDN 方式全局注入；在 `apps/vant-docs` 内可直接使用全局 `Prompts`，如需新增类型能力请同步更新 `env.d.ts`。
