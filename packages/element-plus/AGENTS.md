# Element Plus Package Guide (extends root `AGENTS.md`)

本文件仅补充 `packages/element-plus` 的差异约束；其余规则遵循仓库根目录 `AGENTS.md`。

## 目录约定

- `src/` 为组件源码与公共工具，所有对外导出统一由 `src/index.ts` 汇总。
- `esm/` 为构建产物目录，禁止手动修改。
- 样式与组件就近维护（`style.scss` 与组件目录同级），避免跨目录散落。

## 常用命令

- `pnpm --filter @silver-formily/element-plus build`：执行库构建并输出到 `esm/`。
- `pnpm --filter @silver-formily/element-plus lint`：执行 ESLint 校验。
- `pnpm --filter @silver-formily/element-plus format`：执行 ESLint 自动修复。

## 迁移约定

- 与 monorepo 内部包相关的依赖（`@silver-formily/vue`、`@silver-formily/reactive-vue`）优先使用 workspace 版本进行开发验证。
- 新增对外 API 时，必须同步更新 `README` 与导出入口，保持文档与类型一致。
