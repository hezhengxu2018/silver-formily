# Antd Package Guide

继承根目录 AGENTS.md。本包提供上游 antd 的基础组件及基于本仓库 Grid 运行时的 FormGrid，范围见 README.md。

- 依赖 Ant Design 6，运行时仅使用本仓库 `@silver-formily/*`；不要引入上游 Formily 或旧 Less/mixin。
- 组件样式使用局部 CSS 与 `theme.useToken()` 注入的变量；v6 控件状态通过 ControlContext 传递。
- `src/__builtins__` 仅保留本次组件需要的工具，不从 antd-mobile 包内部导入。
- `esm/` 是 tsdown 产物，禁止直接修改。新增样式由组件入口引入。
- 保持 React 18/19 与 SSR 安全，不使用函数组件 defaultProps 或顶层 DOM 操作。
- 测试使用 Vitest 浏览器模式，运行 `pnpm --filter @silver-formily/antd test:browser`。
- 新增能力同步更新 `apps/antd-docs` 与 changeset；未迁移组件不要添加占位导出。
