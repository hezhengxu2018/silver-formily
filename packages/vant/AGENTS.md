# Vant Package Guide (extends root `AGENTS.md`)

本文件仅补充 `packages/vant` 的差异约束；其余规则遵循仓库根目录 `AGENTS.md`。

## 目录约定

- `src/` 为 Vant 组件封装源码与公共工具，所有对外导出统一由 `src/index.ts` 汇总。
- `esm/` 为构建产物目录，禁止手动修改。
- 预览态、表单容器、适配工具优先沉淀到 `src/preview-text`、`src/form-item`、`src/__builtins__`，避免组件之间互相复制逻辑。

## 常用命令

- `pnpm --filter @silver-formily/vant build`：执行库构建并输出到 `esm/`。
- `pnpm --filter @silver-formily/vant lint`：执行 ESLint 校验。
- `pnpm --filter @silver-formily/vant format`：执行 ESLint 自动修复。
- `pnpm --filter @silver-formily/vant check-types`：执行 `vue-tsc --noEmit`。

## 维护约定

- 当前阶段允许保持“可扩展空壳”，但新增组件时要优先复用已有适配模式：`connect + mapProps + mapReadPretty`。
- 对外 API、README 与 `apps/vant-docs` 中的示例/页面应尽量同步更新，避免只改实现不补文档。
- 与 `@silver-formily/vue`、`@silver-formily/reactive-vue` 的联调优先使用 workspace 版本验证。
